namespace AdGunuDekor.Api.DTOs;

/// <summary>API-dan frontend-ə qaytarılan video məlumatı.</summary>
public class VideoDto
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public string? PosterUrl { get; set; }
    public required string Title { get; set; }
    public int SortOrder { get; set; }
}
