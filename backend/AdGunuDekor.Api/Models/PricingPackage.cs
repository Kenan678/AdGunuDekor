namespace AdGunuDekor.Api.Models;

/// <summary>
/// Saytda göstərilən qiymət paketi. Admin paneldən idarə olunur —
/// qiyməti, adı və xüsusiyyətləri dəyişmək üçün koda dəymək lazım deyil.
/// </summary>
public class PricingPackage
{
    public int Id { get; set; }

    /// <summary>Paketin adı (məs. "Tam Set").</summary>
    public required string Name { get; set; }

    /// <summary>Kartın üstündəki etiket (məs. "Ən çox seçilən").</summary>
    public string? Tag { get; set; }

    /// <summary>Başlanğıc qiymət (AZN).</summary>
    public decimal PriceFrom { get; set; }

    /// <summary>Paketə daxil olanlar — hər sətir bir xüsusiyyət.</summary>
    public List<string> Features { get; set; } = new();

    /// <summary>Vurğulanmış (böyük) kart kimi göstərilsin?</summary>
    public bool IsFeatured { get; set; }

    /// <summary>Saytda görünsün? (silmədən gizlətmək üçün)</summary>
    public bool IsActive { get; set; } = true;

    /// <summary>Göstərilmə sırası (kiçik = əvvəl).</summary>
    public int SortOrder { get; set; }

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}
