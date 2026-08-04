using AdGunuDekor.Api.DTOs;
using AdGunuDekor.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AdGunuDekor.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PricingController : ControllerBase
{
    private readonly IPricingService _pricingService;

    public PricingController(IPricingService pricingService)
    {
        _pricingService = pricingService;
    }

    /// <summary>Aktiv paketləri qaytarır. Hər kəsə açıqdır.</summary>
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<List<PricingPackageDto>>> GetPackages()
    {
        var packages = await _pricingService.GetPackagesAsync(includeInactive: false);
        return Ok(packages);
    }

    /// <summary>Bütün paketləri (gizlilər daxil) qaytarır. Yalnız admin.</summary>
    [HttpGet("all")]
    [Authorize]
    public async Task<ActionResult<List<PricingPackageDto>>> GetAllPackages()
    {
        var packages = await _pricingService.GetPackagesAsync(includeInactive: true);
        return Ok(packages);
    }

    /// <summary>Yeni paket yaradır. Yalnız admin.</summary>
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<PricingPackageDto>> CreatePackage([FromBody] UpsertPricingPackageRequest request)
    {
        try
        {
            var result = await _pricingService.CreatePackageAsync(request);
            return CreatedAtAction(nameof(GetPackages), new { }, result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    /// <summary>Mövcud paketi yeniləyir. Yalnız admin.</summary>
    [HttpPut("{id:int}")]
    [Authorize]
    public async Task<ActionResult<PricingPackageDto>> UpdatePackage(int id, [FromBody] UpsertPricingPackageRequest request)
    {
        try
        {
            var result = await _pricingService.UpdatePackageAsync(id, request);
            return result is null ? NotFound() : Ok(result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    /// <summary>Paketi silir. Yalnız admin.</summary>
    [HttpDelete("{id:int}")]
    [Authorize]
    public async Task<IActionResult> DeletePackage(int id)
    {
        var deleted = await _pricingService.DeletePackageAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
