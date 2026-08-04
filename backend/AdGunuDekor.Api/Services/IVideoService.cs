using AdGunuDekor.Api.DTOs;

namespace AdGunuDekor.Api.Services;

public interface IVideoService
{
    Task<List<VideoDto>> GetVideosAsync();

    Task<VideoDto> CreateAsync(
        Stream videoStream,
        string videoFileName,
        Stream? posterStream,
        string? posterFileName,
        string title);

    Task<bool> DeleteAsync(int id);
}
