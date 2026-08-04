using AdGunuDekor.Api.Data;
using AdGunuDekor.Api.DTOs;
using AdGunuDekor.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace AdGunuDekor.Api.Services;

public class PricingService : IPricingService
{
    private readonly AppDbContext _db;

    public PricingService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<PricingPackageDto>> GetPackagesAsync(bool includeInactive = false)
    {
        var query = _db.PricingPackages.AsQueryable();

        if (!includeInactive)
        {
            query = query.Where(p => p.IsActive);
        }

        var packages = await query
            .OrderBy(p => p.SortOrder)
            .ThenBy(p => p.PriceFrom)
            .ToListAsync();

        return packages.Select(ToDto).ToList();
    }

    public async Task<PricingPackageDto> CreatePackageAsync(UpsertPricingPackageRequest request)
    {
        Validate(request);

        var entity = new PricingPackage
        {
            Name = request.Name.Trim(),
            Tag = NormalizeTag(request.Tag),
            PriceFrom = request.PriceFrom,
            Features = CleanFeatures(request.Features),
            IsFeatured = request.IsFeatured,
            IsActive = request.IsActive,
            SortOrder = request.SortOrder
        };

        _db.PricingPackages.Add(entity);
        await _db.SaveChangesAsync();

        return ToDto(entity);
    }

    public async Task<PricingPackageDto?> UpdatePackageAsync(int id, UpsertPricingPackageRequest request)
    {
        Validate(request);

        var entity = await _db.PricingPackages.FindAsync(id);
        if (entity is null)
        {
            return null;
        }

        entity.Name = request.Name.Trim();
        entity.Tag = NormalizeTag(request.Tag);
        entity.PriceFrom = request.PriceFrom;
        entity.Features = CleanFeatures(request.Features);
        entity.IsFeatured = request.IsFeatured;
        entity.IsActive = request.IsActive;
        entity.SortOrder = request.SortOrder;

        await _db.SaveChangesAsync();

        return ToDto(entity);
    }

    public async Task<bool> DeletePackageAsync(int id)
    {
        var entity = await _db.PricingPackages.FindAsync(id);
        if (entity is null)
        {
            return false;
        }

        _db.PricingPackages.Remove(entity);
        await _db.SaveChangesAsync();

        return true;
    }

    private static void Validate(UpsertPricingPackageRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            throw new ArgumentException("Paketin adı boş ola bilməz.");
        }

        if (request.PriceFrom < 0)
        {
            throw new ArgumentException("Qiymət mənfi ola bilməz.");
        }
    }

    private static string? NormalizeTag(string? tag) =>
        string.IsNullOrWhiteSpace(tag) ? null : tag.Trim();

    private static List<string> CleanFeatures(List<string> features) =>
        features
            .Select(f => f.Trim())
            .Where(f => f.Length > 0)
            .ToList();

    private static PricingPackageDto ToDto(PricingPackage entity) => new()
    {
        Id = entity.Id,
        Name = entity.Name,
        Tag = entity.Tag,
        PriceFrom = entity.PriceFrom,
        Features = entity.Features,
        IsFeatured = entity.IsFeatured,
        IsActive = entity.IsActive,
        SortOrder = entity.SortOrder
    };
}
