using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AdGunuDekor.Api.Data;
using AdGunuDekor.Api.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace AdGunuDekor.Api.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;

    public AuthService(AppDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    public async Task<LoginResponse?> LoginAsync(string username, string password)
    {
        var user = await _db.AdminUsers.FirstOrDefaultAsync(u => u.Username == username);
        if (user is null)
        {
            return null;
        }

        bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
        if (!isPasswordValid)
        {
            return null;
        }

        return GenerateToken(user.Username);
    }

    private LoginResponse GenerateToken(string username)
    {
        var jwtSection = _config.GetSection("Jwt");
        var secret = jwtSection["Secret"]
            ?? throw new InvalidOperationException("Jwt:Secret konfiqurasiyada təyin olunmayıb.");
        var issuer = jwtSection["Issuer"] ?? "AdGunuDekor.Api";
        var expiryMinutes = int.TryParse(jwtSection["ExpiryMinutes"], out var m) ? m : 480;

        var expires = DateTime.UtcNow.AddMinutes(expiryMinutes);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, username),
            new Claim(ClaimTypes.Name, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: issuer,
            claims: claims,
            expires: expires,
            signingCredentials: creds
        );

        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

        return new LoginResponse
        {
            Token = tokenString,
            Username = username,
            ExpiresAtUtc = expires
        };
    }
}
