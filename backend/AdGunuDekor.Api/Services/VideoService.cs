using AdGunuDekor.Api.Data;
using AdGunuDekor.Api.DTOs;
using AdGunuDekor.Api.Models;
using Microsoft.EntityFrameworkCore;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing;

namespace AdGunuDekor.Api.Services;

public class VideoService : IVideoService
{
    private static readonly string[] AllowedVideoExtensions = { ".mp4", ".webm", ".mov", ".m4v" };

    private readonly AppDbContext _db;
    private readonly string _videosFolder;

    public VideoService(AppDbContext db, IWebHostEnvironment env)
    {
        _db = db;
        var webRoot = env.WebRootPath ?? Path.Combine(env.ContentRootPath, "wwwroot");
        _videosFolder = Path.Combine(webRoot, "uploads", "videos");
        if (!Directory.Exists(_videosFolder))
        {
            Directory.CreateDirectory(_videosFolder);
        }
    }

    public async Task<List<VideoDto>> GetVideosAsync()
    {
        var videos = await _db.Videos
            .OrderBy(v => v.SortOrder)
            .ThenByDescending(v => v.CreatedAtUtc)
            .ToListAsync();

        return videos.Select(ToDto).ToList();
    }

    public async Task<VideoDto> CreateAsync(
        Stream videoStream,
        string videoFileName,
        Stream? posterStream,
        string? posterFileName,
        string title)
    {
        var ext = Path.GetExtension(videoFileName).ToLowerInvariant();
        if (!AllowedVideoExtensions.Contains(ext))
        {
            throw new ArgumentException("Yalnız MP4, WEBM, MOV formatları qəbul olunur.");
        }

        // Videonu olduğu kimi saxla (server tərəfdə sıxılma yoxdur — video yalnız klikləyəndə yüklənir)
        var savedVideoName = $"{Guid.NewGuid():N}{ext}";
        var videoPath = Path.Combine(_videosFolder, savedVideoName);
        await using (var fs = new FileStream(videoPath, FileMode.Create))
        {
            await videoStream.CopyToAsync(fs);
        }

        // Poster varsa — ImageSharp ilə kiçildib saxla
        string? savedPosterName = null;
        if (posterStream is not null)
        {
            try
            {
                savedPosterName = $"{Guid.NewGuid():N}.jpg";
                var posterPath = Path.Combine(_videosFolder, savedPosterName);
                using var image = await Image.LoadAsync(posterStream);
                if (image.Width > 1000)
                {
                    var h = (int)(image.Height * (1000.0 / image.Width));
                    image.Mutate(x => x.Resize(1000, h));
                }
                await image.SaveAsJpegAsync(posterPath, new JpegEncoder { Quality = 80 });
            }
            catch
            {
                savedPosterName = null; // poster alınmadısa video yenə də əlavə olunur
            }
        }

        var entity = new Video
        {
            FileName = savedVideoName,
            PosterFileName = savedPosterName,
            Title = title.Trim(),
            SortOrder = 0
        };

        _db.Videos.Add(entity);
        await _db.SaveChangesAsync();

        return ToDto(entity);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var entity = await _db.Videos.FindAsync(id);
        if (entity is null)
        {
            return false;
        }

        DeleteFile(entity.FileName);
        if (entity.PosterFileName is not null)
        {
            DeleteFile(entity.PosterFileName);
        }

        _db.Videos.Remove(entity);
        await _db.SaveChangesAsync();
        return true;
    }

    private void DeleteFile(string fileName)
    {
        var path = Path.Combine(_videosFolder, fileName);
        if (File.Exists(path))
        {
            File.Delete(path);
        }
    }

    private static VideoDto ToDto(Video v) => new()
    {
        Id = v.Id,
        Url = $"/uploads/videos/{v.FileName}",
        PosterUrl = v.PosterFileName is null ? null : $"/uploads/videos/{v.PosterFileName}",
        Title = v.Title,
        SortOrder = v.SortOrder
    };
}
