// ---------------------------------------------------------------
// Admin panelin API çağırışları (yalnız browser-də işləyir).
// Token localStorage-da saxlanılır və hər sorğuya əlavə olunur.
// ---------------------------------------------------------------

import {
  API_URL,
  type GalleryImage,
  type PricingPackage,
  type Video,
} from "@/lib/api";

const TOKEN_KEY = "adgunudekor_token";
const TOKEN_EXP_KEY = "adgunudekor_token_exp";

export interface LoginResult {
  token: string;
  username: string;
  expiresAtUtc: string;
}

// ---- Token idarəsi ----

export function getToken(): string | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem(TOKEN_KEY);
  const exp = localStorage.getItem(TOKEN_EXP_KEY);

  if (!token || !exp) return null;

  if (new Date(exp).getTime() <= Date.now()) {
    clearToken();
    return null;
  }

  return token;
}

export function saveToken(result: LoginResult): void {
  localStorage.setItem(TOKEN_KEY, result.token);
  localStorage.setItem(TOKEN_EXP_KEY, result.expiresAtUtc);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXP_KEY);
}

// ---- Ümumi sorğu köməkçisi ----

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers);

  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  // Login endpoint-ində 401 = səhv parol; başqa yerdə 401 = sessiya bitib
  if (res.status === 401) {
    const isLogin = path.includes("/auth/login");
    if (!isLogin) {
      clearToken();
      throw new Error("Sessiya bitib. Yenidən daxil olun.");
    }
    throw new Error("İstifadəçi adı və ya parol səhvdir.");
  }

  if (!res.ok) {
    let message = `Xəta baş verdi (${res.status})`;
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {
      // body JSON deyilsə, default mesaj qalır
    }
    throw new Error(message);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

// ---- Auth ----

export async function login(
  username: string,
  password: string
): Promise<LoginResult> {
  const result = await request<LoginResult>("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  saveToken(result);
  return result;
}

// ---- Qalereya ----

export function fetchGalleryAdmin(): Promise<GalleryImage[]> {
  return request<GalleryImage[]>("/api/gallery");
}

export function uploadImage(
  file: File,
  category: string,
  altText: string
): Promise<GalleryImage> {
  const form = new FormData();
  form.append("file", file);
  form.append("category", category);
  if (altText) form.append("altText", altText);

  return request<GalleryImage>("/api/gallery", { method: "POST", body: form });
}

export function updateImage(
  id: number,
  data: { category?: string; altText?: string; sortOrder?: number; isCover?: boolean }
): Promise<GalleryImage> {
  return request<GalleryImage>(`/api/gallery/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function deleteImage(id: number): Promise<void> {
  return request<void>(`/api/gallery/${id}`, { method: "DELETE" });
}

// ---- Qiymət paketləri ----

export interface UpsertPricingPackage {
  name: string;
  tag: string | null;
  priceFrom: number;
  features: string[];
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
}

export function fetchPricingAdmin(): Promise<PricingPackage[]> {
  return request<PricingPackage[]>("/api/pricing/all");
}

export function createPackage(
  data: UpsertPricingPackage
): Promise<PricingPackage> {
  return request<PricingPackage>("/api/pricing", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function updatePackage(
  id: number,
  data: UpsertPricingPackage
): Promise<PricingPackage> {
  return request<PricingPackage>(`/api/pricing/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function deletePackage(id: number): Promise<void> {
  return request<void>(`/api/pricing/${id}`, { method: "DELETE" });
}

// ---- Videolar ----

export function fetchVideosAdmin(): Promise<Video[]> {
  return request<Video[]>("/api/videos");
}

export function uploadVideo(
  file: File,
  title: string,
  poster: Blob | null
): Promise<Video> {
  const form = new FormData();
  form.append("file", file);
  form.append("title", title);
  if (poster) form.append("poster", poster, "poster.jpg");
  return request<Video>("/api/videos", { method: "POST", body: form });
}

export function deleteVideo(id: number): Promise<void> {
  return request<void>(`/api/videos/${id}`, { method: "DELETE" });
}

/**
 * Video faylından ilk kadrı poster kimi çıxarır (brauzerdə, canvas ilə).
 * Codec dəstəklənmirsə null qaytarır — o halda poster olmadan yüklənir.
 */
export function extractPoster(file: File): Promise<Blob | null> {
  return new Promise((resolve) => {
    try {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.muted = true;
      video.playsInline = true;
      const url = URL.createObjectURL(file);
      video.src = url;

      const cleanup = () => URL.revokeObjectURL(url);
      const fail = () => {
        cleanup();
        resolve(null);
      };

      video.onloadeddata = () => {
        // 1-ci saniyəyə keç (ilk kadr çox vaxt boş olur)
        video.currentTime = Math.min(1, (video.duration || 2) / 2);
      };
      video.onseeked = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth || 1280;
          canvas.height = video.videoHeight || 720;
          const ctx = canvas.getContext("2d");
          if (!ctx) return fail();
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(
            (blob) => {
              cleanup();
              resolve(blob);
            },
            "image/jpeg",
            0.8
          );
        } catch {
          fail();
        }
      };
      video.onerror = fail;
      // 8 saniyə timeout
      setTimeout(fail, 8000);
    } catch {
      resolve(null);
    }
  });
}
