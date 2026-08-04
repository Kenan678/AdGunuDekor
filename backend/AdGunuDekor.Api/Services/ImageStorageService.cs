using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing;

namespace AdGunuDekor.Api.Services;

public class ImageStorageService : IImageStorageService
{
    private const int MaxWidthPx = 2000;
    private const int JpegQuality = 92;

    private readonly string _uploadsFolder;
    private readonly ILogger<ImageStorageService> _logger;

    public ImageStorageService(IWebHostEnvironment env, ILogger<ImageStorageService> logger)
    {
        _logger = logger;

        // wwwroot/uploads — WebRootPath appsettings deyil, hosting environment-dən gəlir
        var webRoot = env.WebRootPath ?? Path.Combine(env.ContentRootPath, "wwwroot");
        _uploadsFolder = Path.Combine(webRoot, "uploads");

        if (!Directory.Exists(_uploadsFolder))
        {
            Directory.CreateDirectory(_uploadsFolder);
        }
    }

    public async Task<string> SaveAsync(Stream fileStream, string originalFileName)
    {
        var fileName = $"{Guid.NewGuid():N}.jpg";
        var fullPath = Path.Combine(_uploadsFolder, fileName);

        using var image = await Image.LoadAsync(fileStream);

        if (image.Width > MaxWidthPx)
        {
            var newHeight = (int)(image.Height * (MaxWidthPx / (double)image.Width));
            image.Mutate(x => x.Resize(MaxWidthPx, newHeight));
        }

        var encoder = new JpegEncoder { Quality = JpegQuality };
        await image.SaveAsJpegAsync(fullPath, encoder);

        _logger.LogInformation("Şəkil saxlanıldı: {FileName} (mənbə: {OriginalName})", fileName, originalFileName);

        return fileName;
    }

    public void Delete(string fileName)
    {
        var fullPath = Path.Combine(_uploadsFolder, fileName);
        if (File.Exists(fullPath))
        {
            File.Delete(fullPath);
            _logger.LogInformation("Şəkil silindi: {FileName}", fileName);
        }
    }

    public string GetPublicUrl(string fileName) => $"/uploads/{fileName}";
}
