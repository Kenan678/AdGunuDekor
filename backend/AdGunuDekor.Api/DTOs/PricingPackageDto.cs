namespace AdGunuDekor.Api.DTOs;

/// <summary>API-dan frontend-ə qaytarılan qiymət paketi.</summary>
public class PricingPackageDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Tag { get; set; }
    public decimal PriceFrom { get; set; }
    public List<string> Features { get; set; } = new();
    public bool IsFeatured { get; set; }
    public bool IsActive { get; set; }
    public int SortOrder { get; set; }
}

/// <summary>Yeni paket yaratmaq / mövcudu yeniləmək üçün.</summary>
public class UpsertPricingPackageRequest
{
    public required string Name { get; set; }
    public string? Tag { get; set; }
    public decimal PriceFrom { get; set; }
    public List<string> Features { get; set; } = new();
    public bool IsFeatured { get; set; }
    public bool IsActive { get; set; } = true;
    public int SortOrder { get; set; }
}
