using AdGunuDekor.Api.DTOs;
using AdGunuDekor.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace AdGunuDekor.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    /// <summary>Admin girişi. Uğurlu olarsa JWT token qaytarır.</summary>
    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
    {
        var result = await _authService.LoginAsync(request.Username, request.Password);

        if (result is null)
        {
            return Unauthorized(new { message = "İstifadəçi adı və ya parol səhvdir." });
        }

        return Ok(result);
    }
}
