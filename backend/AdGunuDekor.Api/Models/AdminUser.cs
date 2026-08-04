namespace AdGunuDekor.Api.Models;

/// <summary>
/// Admin panelə giriş edə bilən istifadəçi.
/// Parol heç vaxt açıq mətn kimi saxlanılmır — yalnız BCrypt hash-i.
/// </summary>
public class AdminUser
{
    public int Id { get; set; }

    public required string Username { get; set; }

    /// <summary>BCrypt ilə hashlənmiş parol. Açıq mətn parol heç vaxt buraya yazılmamalıdır.</summary>
    public required string PasswordHash { get; set; }

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}
