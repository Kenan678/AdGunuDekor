using AdGunuDekor.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace AdGunuDekor.Api.Data;

/// <summary>
/// Tətbiq başlayanda verilənlər bazasını hazırlayır:
/// migration-ları tətbiq edir və ilk admin istifadəçisini yaradır (yoxdursa).
/// </summary>
public static class DbInitializer
{
    public static async Task InitializeAsync(IServiceProvider services, IConfiguration config)
    {
        using var scope = services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        await db.Database.MigrateAsync();

        if (!await db.AdminUsers.AnyAsync())
        {
            var seedUsername = config["SeedAdmin:Username"] ?? "admin";
            var seedPassword = config["SeedAdmin:Password"] ?? "ChangeMe123!";

            db.AdminUsers.Add(new AdminUser
            {
                Username = seedUsername,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(seedPassword)
            });

            await db.SaveChangesAsync();
        }

        // İlk qiymət paketləri — yalnız cədvəl tamamilə boş olduqda əlavə olunur.
        // Sonrakı bütün dəyişikliklər admin paneldən edilir.
        if (!await db.PricingPackages.AnyAsync())
        {
            db.PricingPackages.AddRange(
                new PricingPackage
                {
                    Name = "Mini Dekor",
                    Tag = "Başlanğıc",
                    PriceFrom = 90,
                    Features = new List<string>
                    {
                        "Balon qrupu (1 künc)",
                        "Rəng palitrası seçimi",
                        "2 saata qədər quraşdırma"
                    },
                    SortOrder = 1
                },
                new PricingPackage
                {
                    Name = "Tam Set",
                    Tag = "Ən çox seçilən",
                    PriceFrom = 220,
                    IsFeatured = true,
                    Features = new List<string>
                    {
                        "Foto zəng + balon kompozisiyası",
                        "Şəxsi ad/yaş yazısı",
                        "İşıqlı rəqəm dekoru",
                        "Tam quraşdırma və yığışdırma"
                    },
                    SortOrder = 2
                },
                new PricingPackage
                {
                    Name = "Tədbir Dekoru",
                    Tag = "Premium",
                    PriceFrom = 400,
                    Features = new List<string>
                    {
                        "Foto zəng + masa dekoru",
                        "Tematik fiqurlar",
                        "Neon yazı seçimi",
                        "Tam dizayn konsultasiyası"
                    },
                    SortOrder = 3
                }
            );

            await db.SaveChangesAsync();
        }

        // Qalereya seed şəkilləri — wwwroot/uploads-da hazır qoyulmuş şəkillər.
        // İdempotentdir: yalnız həmin fayl adı DB-də yoxdursa əlavə olunur,
        // ona görə təkrar başlatmada dublikat yaranmır. Admin paneldən silinə/dəyişdirilə bilər.
        var seedImages = new (string File, GalleryCategory Category, string Alt)[]
        {
            ("seed-01.jpg", GalleryCategory.Toy,       "Tuncay — kiçik toy və ad günü dekoru (qızılı-ağ balon)"),
            ("seed-02.jpg", GalleryCategory.Qiz,       "Qız ad günü dekoru — 10 yaş, mərcan-nanə balonlar"),
            ("seed-03.jpg", GalleryCategory.Oglan,     "Raul — 5 yaş oğlan ad günü, mavi-gümüşü balon"),
            ("seed-04.jpg", GalleryCategory.Futbol,    "Ayaz — futbol (Barselona) temalı 7 yaş dekoru"),
            ("seed-05.jpg", GalleryCategory.Boyukler,  "Samira — 45 yaş böyüklər ad günü, qırmızı-qızılı"),
            ("seed-06.jpg", GalleryCategory.Oglan,     "Casur — 10 yaş oğlan ad günü, mavi balon dekoru"),
            ("seed-07.jpg", GalleryCategory.CizgiFilm, "Ayla — 6 yaş cizgi film qəhrəmanı temalı dekor"),
            ("seed-08.jpg", GalleryCategory.BirYas,    "Camal — 1 yaş, mavi-qara ayı temalı dekor"),
            ("seed-09.jpg", GalleryCategory.BirYas,    "Ayaz — 1 yaş, qırmızı-qızılı ayı temalı dekor"),
            ("seed-10.jpg", GalleryCategory.Qiz,       "Sofiya — 10 yaş qız ad günü, Tiffany mavi dekor"),
            ("seed-11.jpg", GalleryCategory.Boyukler,  "Sams — 12 yaş, qara-qızılı musiqi temalı dekor"),
            ("seed-12.jpg", GalleryCategory.CizgiFilm, "Maharram — Harry Potter temalı 10 yaş dekoru"),
            ("seed-13.jpg", GalleryCategory.Toy,       "Yusif — kiçik toy dekoru, yaşıl-ağ balon"),
            ("seed-14.jpg", GalleryCategory.Oglan,     "10 yaş oğlan ad günü — tünd mavi-gümüşü, ulduzlar"),
            ("seed-15.jpg", GalleryCategory.BirYas,    "Jasmin — 1 yaş qız, çəhrayı pəri temalı dekor"),
        };

        var order = 0;
        foreach (var img in seedImages)
        {
            order++;
            if (await db.GalleryImages.AnyAsync(g => g.FileName == img.File))
            {
                continue; // artıq var — keç
            }

            db.GalleryImages.Add(new GalleryImage
            {
                FileName = img.File,
                Category = img.Category,
                AltText = img.Alt,
                SortOrder = order
            });
        }

        await db.SaveChangesAsync();

        // Video seed — wwwroot/uploads/videos-da hazır qoyulmuş fayllar. İdempotent.
        var seedVideos = new (string File, string Poster, string Title)[]
        {
            ("seedvid-1.mp4", "seedvid-1.jpg", "Ad günü quruluşu — səhnə arxası"),
            ("seedvid-2.mp4", "seedvid-2.jpg", "Tədbir günü — tam dekor"),
        };

        var vOrder = 0;
        foreach (var v in seedVideos)
        {
            vOrder++;
            if (await db.Videos.AnyAsync(x => x.FileName == v.File))
            {
                continue;
            }

            db.Videos.Add(new Video
            {
                FileName = v.File,
                PosterFileName = v.Poster,
                Title = v.Title,
                SortOrder = vOrder
            });
        }

        await db.SaveChangesAsync();
    }
}
