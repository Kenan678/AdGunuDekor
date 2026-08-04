using AdGunuDekor.Api.DTOs;

namespace AdGunuDekor.Api.Services;

public interface IAuthService
{
    /// <summary>
    /// İstifadəçi adı/parolu yoxlayır. Uğurlu olarsa JWT token qaytarır, əks halda null.
    /// </summary>
    Task<LoginResponse?> LoginAsync(string username, string password);
}
