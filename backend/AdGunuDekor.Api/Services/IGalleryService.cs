using AdGunuDekor.Api.DTOs;

namespace AdGunuDekor.Api.Services;

public interface IGalleryService
{
    /// <summary>Bütün şəkilləri (və ya bir kateqoriyaya görə filtrlənmiş) qaytarır.</summary>
    Task<List<GalleryImageDto>> GetImagesAsync(string? category = null);

    /// <summary>
    /// Yüklənmiş şəkli diskə yazır, sıxır və verilənlər bazasına metadata əlavə edir.
    /// </summary>
    Task<GalleryImageDto> UploadImageAsync(Stream fileStream, string originalFileName, string category, string? altText);

    /// <summary>Şəkli həm diskdən, həm verilənlər bazasından silir.</summary>
    Task<bool> DeleteImageAsync(int id);

    /// <summary>Şəkilin metadata-sını (kateqoriya, sıra, alt mətn) yeniləyir.</summary>
    Task<GalleryImageDto?> UpdateImageAsync(int id, UpdateGalleryImageRequest request);
}
