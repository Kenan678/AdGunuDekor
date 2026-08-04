using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace AdGunuDekor.Api.Data;

/// <summary>
/// `dotnet ef migrations add` / `dotnet ef database update` komandaları üçün.
/// Bu sinif yalnız design-time-da (migration yaradanda) işə düşür, runtime-a təsiri yoxdur.
/// Lazımdır, çünki bəzən EF Core tooling, Program.cs-dəki bütün DI konfiqurasiyasını
/// (JWT secret yoxlaması və s.) düzgün işlədə bilmir.
/// </summary>
public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false)
            .AddJsonFile("appsettings.Development.json", optional: true)
            .Build();

        var connectionString = config.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("DefaultConnection appsettings-də tapılmadı.");

        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
        optionsBuilder.UseNpgsql(connectionString);

        return new AppDbContext(optionsBuilder.Options);
    }
}
