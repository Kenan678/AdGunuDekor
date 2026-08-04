namespace AdGunuDekor.Api.Models;

/// <summary>
/// Dekor xidmət kateqoriyaları. Yeni xidmət növü əlavə etmək üçün
/// bura yeni dəyər əlavə edin (məs. Tort = 4) — frontend-də də uyğun
/// seçim əlavə olunmalıdır.
/// </summary>
public enum GalleryCategory
{
    // Köhnə kateqoriyalar — yalnız əvvəl yüklənmiş şəkillərin oxunması üçün saxlanılır.
    Balon = 1,
    Foto = 2,
    Masa = 3,

    // Aktual kateqoriyalar (frontend bunları göstərir)
    BirYas = 10,      // 1 Yaş Ad Günü Dekoru
    Qiz = 11,         // Qız Ad Günü Dekoru
    Oglan = 12,       // Oğlan Ad Günü Dekoru
    Boyukler = 13,    // Böyüklər üçün Ad Günü Dekoru
    Mezuniyyet = 14,  // Məktəb Məzuniyyət Dekoru
    QirxGun = 15,     // 40 Günlük Dekoru
    CizgiFilm = 16,   // Cizgi Film Qəhrəmanı Dekoru
    Futbol = 17,      // Futbol Temalı Dekor
    Toy = 18          // Kiçik Toy Dekoru
}
