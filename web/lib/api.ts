// ---------------------------------------------------------------
// Bütün backend çağırışları üçün tək giriş nöqtəsi.
// API ünvanını dəyişmək lazımdırsa → .env.local → NEXT_PUBLIC_API_URL
// ---------------------------------------------------------------

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5080";

export interface GalleryImage {
  id: number;
  url: string; // API nisbi qaytarır: "/uploads/abc.jpg"
  category: string;
  altText: string | null;
  sortOrder: number;
  isCover: boolean;
}

export interface PricingPackage {
  id: number;
  name: string;
  tag: string | null;
  priceFrom: number;
  features: string[];
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
}

/** Nisbi şəkil URL-ini tam URL-ə çevirir. */
export function imageUrl(relativeOrAbsolute: string): string {
  return relativeOrAbsolute.startsWith("http")
    ? relativeOrAbsolute
    : `${API_URL}${relativeOrAbsolute}`;
}

// ---- Server-side fetch-lər (SEO üçün səhifə serverdə render olunur) ----
// API əlçatan olmasa sayt yıxılmır — boş siyahı ilə davam edir.

export async function fetchGallery(): Promise<GalleryImage[]> {
  try {
    const res = await fetch(`${API_URL}/api/gallery`, {
      next: { revalidate: 20 }, // 20 saniyədən bir yenilənir
    });
    if (!res.ok) return [];
    return (await res.json()) as GalleryImage[];
  } catch {
    return [];
  }
}

export interface Video {
  id: number;
  url: string; // nisbi: "/uploads/videos/abc.mp4"
  posterUrl: string | null;
  title: string;
  sortOrder: number;
}

export async function fetchVideos(): Promise<Video[]> {
  try {
    const res = await fetch(`${API_URL}/api/videos`, {
      next: { revalidate: 20 },
    });
    if (!res.ok) return [];
    return (await res.json()) as Video[];
  } catch {
    return [];
  }
}

export async function fetchPricing(): Promise<PricingPackage[]> {
  try {
    const res = await fetch(`${API_URL}/api/pricing`, {
      next: { revalidate: 20 },
    });
    if (!res.ok) return [];
    return (await res.json()) as PricingPackage[];
  } catch {
    return [];
  }
}
