namespace AdGunuDekor.Api.DTOs;

/// <summary>API-dan frontend-ə qaytarılan şəkil məlumatı.</summary>
public class GalleryImageDto
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public required string Category { get; set; }
    public string? AltText { get; set; }
    public int SortOrder { get; set; }
    public bool IsCover { get; set; }
}

/// <summary>Yeni şəkil yükləmə sorğusunun əlavə (fayldan başqa) sahələri.</summary>
public class CreateGalleryImageRequest
{
    public required string Category { get; set; }
    public string? AltText { get; set; }
}

/// <summary>Mövcud şəkilin metadata-sını yeniləmək üçün.</summary>
public class UpdateGalleryImageRequest
{
    public string? Category { get; set; }
    public string? AltText { get; set; }
    public int? SortOrder { get; set; }
    public bool? IsCover { get; set; }
}
