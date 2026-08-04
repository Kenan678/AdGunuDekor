using AdGunuDekor.Api.DTOs;

namespace AdGunuDekor.Api.Services;

public interface IPricingService
{
    /// <summary>Paketləri qaytarır. includeInactive=true yalnız admin üçün.</summary>
    Task<List<PricingPackageDto>> GetPackagesAsync(bool includeInactive = false);

    Task<PricingPackageDto> CreatePackageAsync(UpsertPricingPackageRequest request);

    Task<PricingPackageDto?> UpdatePackageAsync(int id, UpsertPricingPackageRequest request);

    Task<bool> DeletePackageAsync(int id);
}
