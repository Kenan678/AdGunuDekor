using AdGunuDekor.Api.DTOs;
using AdGunuDekor.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AdGunuDekor.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GalleryController : ControllerBase
{
    private const long MaxFileSizeBytes = 30 * 1024 * 1024; // 30 MB (şəkil serverdə avtomatik kiçildilir)
    private static readonly string[] AllowedContentTypes = { "image/jpeg", "image/png", "image/webp" };

    private readonly IGalleryService _galleryService;

    public GalleryController(IGalleryService galleryService)
    {
        _galleryService = galleryService;
    }

    /// <summary>Bütün şəkilləri qaytarır. ?category=balon ilə filtrlənə bilər. Hər kəsə açıqdır.</summary>
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<List<GalleryImageDto>>> GetImages([FromQuery] string? category)
    {
        try
        {
            var images = await _galleryService.GetImagesAsync(category);
            return Ok(images);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    /// <summary>Yeni şəkil yükləyir. Yalnız daxil olmuş admin istifadə edə bilər.</summary>
    [HttpPost]
    [Authorize]
    [RequestSizeLimit(MaxFileSizeBytes)]
    public async Task<ActionResult<GalleryImageDto>> UploadImage(
        [FromForm] IFormFile file,
        [FromForm] string category,
        [FromForm] string? altText)
    {
        if (file is null || file.Length == 0)
        {
            return BadRequest(new { message = "Şəkil faylı boşdur." });
        }

        if (file.Length > MaxFileSizeBytes)
        {
            return BadRequest(new { message = "Şəkil 30MB-dan böyük ola bilməz." });
        }

        if (!AllowedContentTypes.Contains(file.ContentType))
        {
            return BadRequest(new { message = "Yalnız JPEG, PNG və ya WEBP formatları qəbul olunur." });
        }

        try
        {
            using var stream = file.OpenReadStream();
            var result = await _galleryService.UploadImageAsync(stream, file.FileName, category, altText);
            return CreatedAtAction(nameof(GetImages), new { }, result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    /// <summary>Şəkilin metadata-sını (kateqoriya, sıra, alt mətn) yeniləyir. Yalnız admin.</summary>
    [HttpPut("{id:int}")]
    [Authorize]
    public async Task<ActionResult<GalleryImageDto>> UpdateImage(int id, [FromBody] UpdateGalleryImageRequest request)
    {
        try
        {
            var result = await _galleryService.UpdateImageAsync(id, request);
            return result is null ? NotFound() : Ok(result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    /// <summary>Şəkili silir (disk + verilənlər bazası). Yalnız admin.</summary>
    [HttpDelete("{id:int}")]
    [Authorize]
    public async Task<IActionResult> DeleteImage(int id)
    {
        var deleted = await _galleryService.DeleteImageAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
