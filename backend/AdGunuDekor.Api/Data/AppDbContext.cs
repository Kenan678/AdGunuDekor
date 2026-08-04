using AdGunuDekor.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace AdGunuDekor.Api.Data;

/// <summary>
/// Tətbiqin əsas verilənlər bazası konteksti.
/// Connection string appsettings.json-dan (və ya environment variable-dan) gəlir.
/// </summary>
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<GalleryImage> GalleryImages => Set<GalleryImage>();
    public DbSet<AdminUser> AdminUsers => Set<AdminUser>();
    public DbSet<PricingPackage> PricingPackages => Set<PricingPackage>();
    public DbSet<Video> Videos => Set<Video>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<GalleryImage>(entity =>
        {
            entity.Property(e => e.Category)
                  .HasConversion<string>() // enum -> readable string in DB ("Balon", "Foto", "Masa")
                  .HasMaxLength(20);

            entity.Property(e => e.FileName).HasMaxLength(255).IsRequired();
            entity.HasIndex(e => e.Category);
        });

        modelBuilder.Entity<AdminUser>(entity =>
        {
            entity.HasIndex(e => e.Username).IsUnique();
            entity.Property(e => e.Username).HasMaxLength(50).IsRequired();
            entity.Property(e => e.PasswordHash).IsRequired();
        });

        modelBuilder.Entity<PricingPackage>(entity =>
        {
            entity.Property(e => e.Name).HasMaxLength(100).IsRequired();
            entity.Property(e => e.Tag).HasMaxLength(50);
            entity.Property(e => e.PriceFrom).HasPrecision(10, 2);
            // List<string> Features PostgreSQL-də text[] sütunu kimi saxlanılır (Npgsql native dəstəyi)
        });

        modelBuilder.Entity<Video>(entity =>
        {
            entity.Property(e => e.FileName).HasMaxLength(255).IsRequired();
            entity.Property(e => e.PosterFileName).HasMaxLength(255);
            entity.Property(e => e.Title).HasMaxLength(150).IsRequired();
        });
    }
}
