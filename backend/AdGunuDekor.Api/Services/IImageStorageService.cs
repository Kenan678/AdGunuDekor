namespace AdGunuDekor.Api.Services;

/// <summary>
/// Şəkil fayllarının diskdə saxlanması, sıxılması və silinməsi ilə məşğul olur.
/// GalleryService bu servisi çağırır; beləliklə fayl sistemi detalları
/// (harada saxlanılır, hansı format, hansı ölçü) yalnız bu sinifdə cəmlənir.
/// </summary>
public interface IImageStorageService
{
    /// <summary>
    /// Şəkli sıxaraq (max 1100px en, JPEG keyfiyyət 78) wwwroot/uploads-a yazır.
    /// Unikal fayl adı qaytarır (məs. "3f9a2b1c.jpg").
    /// </summary>
    Task<string> SaveAsync(Stream fileStream, string originalFileName);

    /// <summary>Verilmiş fayl adına uyğun şəkli diskdən silir. Fayl yoxdursa səssizcə keçir.</summary>
    void Delete(string fileName);

    /// <summary>Fayl adından, frontend-in istifadə edəcəyi nisbi URL-i qurur (məs. "/uploads/xxx.jpg").</summary>
    string GetPublicUrl(string fileName);
}
