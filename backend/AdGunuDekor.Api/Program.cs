using System.Text;
using AdGunuDekor.Api.Data;
using AdGunuDekor.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// ---------- Services (Dependency Injection) ----------

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// EF Core + PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Application services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IGalleryService, GalleryService>();
builder.Services.AddScoped<IPricingService, PricingService>();
builder.Services.AddScoped<IVideoService, VideoService>();

// Video yükləmələri böyük ola bilər — request limitini artır (200 MB)
builder.Services.Configure<Microsoft.AspNetCore.Http.Features.FormOptions>(o =>
{
    o.MultipartBodyLengthLimit = 200L * 1024 * 1024;
});
builder.WebHost.ConfigureKestrel(o =>
{
    o.Limits.MaxRequestBodySize = 200L * 1024 * 1024;
});
builder.Services.AddSingleton<IImageStorageService, ImageStorageService>();

// JWT Authentication
var jwtSection = builder.Configuration.GetSection("Jwt");
var jwtSecret = jwtSection["Secret"]
    ?? throw new InvalidOperationException("Jwt:Secret appsettings.json-da təyin olunmayıb.");
var jwtIssuer = jwtSection["Issuer"] ?? "AdGunuDekor.Api";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = jwtIssuer,
        ValidateAudience = true,
        ValidAudience = jwtIssuer,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
        ValidateLifetime = true,
        ClockSkew = TimeSpan.FromMinutes(1)
    };
});

builder.Services.AddAuthorization();

// CORS — frontend ayrıca origin-dən (məs. statik hosting, ya da Live Server) çağırır
var frontendOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? Array.Empty<string>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        if (frontendOrigins.Length > 0)
        {
            policy.WithOrigins(frontendOrigins)
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        }
        else
        {
            // Development fallback: hər yerdən icazə (yalnız Development-də istifadə edilməlidir)
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        }
    });
});

var app = builder.Build();

// ---------- Middleware Pipeline ----------

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles(); // wwwroot/uploads daxilindəki şəkilləri serve etmək üçün

app.UseCors("FrontendPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Tətbiq başlayanda: migration-ları tətbiq et + ilk admin istifadəçisini yarat (yoxdursa)
await DbInitializer.InitializeAsync(app.Services, app.Configuration);

app.Run();
