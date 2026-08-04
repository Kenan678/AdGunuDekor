namespace AdGunuDekor.Api.Models;

/// <summary>
/// Qalereyada göstərilən bir dekor şəklini təmsil edir.
/// FileName fiziki olaraq wwwroot/uploads qovluğunda saxlanılır;
/// bu cədvəl yalnız metadata (kateqoriya, sıra, tarix) saxlayır.
/// </summary>
public class GalleryImage
{
    public int Id { get; set; }

    /// <summary>Diskdə saxlanılan fayl adı (məs. "a1b2c3.jpg"). URL bundan qurulur.</summary>
    public required string FileName { get; set; }

    /// <summary>Dekor kateqoriyası.</summary>
    public required GalleryCategory Category { get; set; }

    /// <summary>Şəkil üçün alternativ mətn (əlçatanlıq və SEO üçün).</summary>
    public string? AltText { get; set; }

    /// <summary>Qalereyada göstərilmə sırası (kiçik rəqəm = əvvəl göstərilir).</summary>
    public int SortOrder { get; set; } = 0;

    /// <summary>Bu şəkil öz kateqoriyasının "kart şəkli"dir? (ana səhifə Xidmətlər bölməsində göstərilir)</summary>
    public bool IsCover { get; set; } = false;

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}
