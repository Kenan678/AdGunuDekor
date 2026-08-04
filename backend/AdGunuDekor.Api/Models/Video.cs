namespace AdGunuDekor.Api.Models;

/// <summary>
/// "Video" bölməsində göstərilən tədbir videosu.
/// Fayl fiziki olaraq wwwroot/uploads/videos-da saxlanılır;
/// bu cədvəl yalnız metadata saxlayır.
/// </summary>
public class Video
{
    public int Id { get; set; }

    /// <summary>Diskdə saxlanılan video fayl adı (məs. "abc.mp4").</summary>
    public required string FileName { get; set; }

    /// <summary>Poster (kadr) şəklinin fayl adı — yoxdursa null.</summary>
    public string? PosterFileName { get; set; }

    /// <summary>Video başlığı.</summary>
    public required string Title { get; set; }

    /// <summary>Göstərilmə sırası (kiçik = əvvəl).</summary>
    public int SortOrder { get; set; } = 0;

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}
