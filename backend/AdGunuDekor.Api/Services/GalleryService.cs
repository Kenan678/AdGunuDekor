using AdGunuDekor.Api.Data;
using AdGunuDekor.Api.DTOs;
using AdGunuDekor.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace AdGunuDekor.Api.Services;

public class GalleryService : IGalleryService
{
    private readonly AppDbContext _db;
    private readonly IImageStorageService _imageStorage;

    public GalleryService(AppDbContext db, IImageStorageService imageStorage)
    {
        _db = db;
        _imageStorage = imageStorage;
    }

    public async Task<List<GalleryImageDto>> GetImagesAsync(string? category = null)
    {
        var query = _db.GalleryImages.AsQueryable();

        if (!string.IsNullOrWhiteSpace(category) && category != "all")
        {
            if (!Enum.TryParse<GalleryCategory>(category, true, out var parsedCategory))
            {
                throw new ArgumentException($"Naməlum kateqoriya: {category}");
            }
            query = query.Where(img => img.Category == parsedCategory);
        }

        var images = await query
            .OrderBy(img => img.SortOrder)
            .ThenByDescending(img => img.CreatedAtUtc)
            .ToListAsync();

        return images.Select(ToDto).ToList();
    }

    public async Task<GalleryImageDto> UploadImageAsync(Stream fileStream, string originalFileName, string category, string? altText)
    {
        if (!Enum.TryParse<GalleryCategory>(category, true, out var parsedCategory))
        {
            throw new ArgumentException($"Naməlum kateqoriya: {category}");
        }

        var savedFileName = await _imageStorage.SaveAsync(fileStream, originalFileName);

        // Yeni şəkil siyahının SONUNA əlavə olunsun (mövcud sıra pozulmasın)
        var maxSort = await _db.GalleryImages.AnyAsync()
            ? await _db.GalleryImages.MaxAsync(g => g.SortOrder)
            : 0;

        var entity = new GalleryImage
        {
            FileName = savedFileName,
            Category = parsedCategory,
            AltText = altText,
            SortOrder = maxSort + 1
        };

        _db.GalleryImages.Add(entity);
        await _db.SaveChangesAsync();

        return ToDto(entity);
    }

    public async Task<bool> DeleteImageAsync(int id)
    {
        var entity = await _db.GalleryImages.FindAsync(id);
        if (entity is null)
        {
            return false;
        }

        _imageStorage.Delete(entity.FileName);
        _db.GalleryImages.Remove(entity);
        await _db.SaveChangesAsync();

        return true;
    }

    public async Task<GalleryImageDto?> UpdateImageAsync(int id, UpdateGalleryImageRequest request)
    {
        var entity = await _db.GalleryImages.FindAsync(id);
        if (entity is null)
        {
            return null;
        }

        if (!string.IsNullOrWhiteSpace(request.Category))
        {
            if (!Enum.TryParse<GalleryCategory>(request.Category, true, out var parsedCategory))
            {
                throw new ArgumentException($"Naməlum kateqoriya: {request.Category}");
            }
            entity.Category = parsedCategory;
        }

        if (request.AltText is not null)
        {
            entity.AltText = request.AltText;
        }

        if (request.SortOrder.HasValue)
        {
            entity.SortOrder = request.SortOrder.Value;
        }

        if (request.IsCover.HasValue)
        {
            if (request.IsCover.Value)
            {
                // Hər kateqoriyada yalnız bir cover ola bilər — digərlərini sıfırla
                var others = await _db.GalleryImages
                    .Where(g => g.Category == entity.Category && g.Id != entity.Id && g.IsCover)
                    .ToListAsync();
                foreach (var o in others) o.IsCover = false;
            }
            entity.IsCover = request.IsCover.Value;
        }

        await _db.SaveChangesAsync();

        return ToDto(entity);
    }

    private GalleryImageDto ToDto(GalleryImage entity) => new()
    {
        Id = entity.Id,
        Url = _imageStorage.GetPublicUrl(entity.FileName),
        Category = entity.Category.ToString().ToLowerInvariant(),
        AltText = entity.AltText,
        SortOrder = entity.SortOrder,
        IsCover = entity.IsCover
    };
}
