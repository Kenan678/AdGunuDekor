using AdGunuDekor.Api.DTOs;
using AdGunuDekor.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AdGunuDekor.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VideosController : ControllerBase
{
    private const long MaxFileSizeBytes = 200 * 1024 * 1024; // 200 MB

    private readonly IVideoService _videoService;

    public VideosController(IVideoService videoService)
    {
        _videoService = videoService;
    }

    /// <summary>Bütün videoları qaytarır. Hər kəsə açıqdır.</summary>
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<List<VideoDto>>> GetVideos()
    {
        return Ok(await _videoService.GetVideosAsync());
    }

    /// <summary>Yeni video yükləyir (video + istəyə görə poster + başlıq). Yalnız admin.</summary>
    [HttpPost]
    [Authorize]
    [RequestSizeLimit(MaxFileSizeBytes)]
    [RequestFormLimits(MultipartBodyLengthLimit = MaxFileSizeBytes)]
    public async Task<ActionResult<VideoDto>> UploadVideo(
        [FromForm] IFormFile file,
        [FromForm] string title,
        [FromForm] IFormFile? poster)
    {
        if (file is null || file.Length == 0)
        {
            return BadRequest(new { message = "Video faylı boşdur." });
        }

        if (string.IsNullOrWhiteSpace(title))
        {
            return BadRequest(new { message = "Başlıq boş ola bilməz." });
        }

        try
        {
            await using var videoStream = file.OpenReadStream();
            Stream? posterStream = poster is not null && poster.Length > 0
                ? poster.OpenReadStream()
                : null;

            var result = await _videoService.CreateAsync(
                videoStream, file.FileName, posterStream, poster?.FileName, title);

            posterStream?.Dispose();

            return CreatedAtAction(nameof(GetVideos), new { }, result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    /// <summary>Videonu silir. Yalnız admin.</summary>
    [HttpDelete("{id:int}")]
    [Authorize]
    public async Task<IActionResult> DeleteVideo(int id)
    {
        var deleted = await _videoService.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
