"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { imageUrl, type GalleryImage, type PricingPackage, type Video } from "@/lib/api";
import {
  clearToken,
  createPackage,
  deleteImage,
  deletePackage,
  deleteVideo,
  extractPoster,
  fetchGalleryAdmin,
  fetchPricingAdmin,
  fetchVideosAdmin,
  getToken,
  login,
  updateImage,
  updatePackage,
  uploadImage,
  uploadVideo,
  type UpsertPricingPackage,
} from "@/lib/adminApi";
import { CATEGORIES } from "@/lib/categories";

type Tab = "gallery" | "pricing" | "video";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);
  const [tab, setTab] = useState<Tab>("gallery");

  useEffect(() => {
    setAuthed(getToken() !== null);
    setChecked(true);
  }, []);

  if (!checked) return null;

  return (
    <main className="min-h-screen bg-cream px-4 pt-24 pb-16">
      <div className="mx-auto max-w-5xl">
        {!authed ? (
          <LoginForm onSuccess={() => setAuthed(true)} />
        ) : (
          <>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="font-display text-3xl font-bold tracking-tight">
                Admin Panel
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setTab("gallery")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${
                    tab === "gallery"
                      ? "bg-ink text-white"
                      : "bg-white text-muted shadow-sm"
                  }`}
                >
                  Qalereya
                </button>
                <button
                  onClick={() => setTab("pricing")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${
                    tab === "pricing"
                      ? "bg-ink text-white"
                      : "bg-white text-muted shadow-sm"
                  }`}
                >
                  Qiymətlər
                </button>
                <button
                  onClick={() => setTab("video")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${
                    tab === "video"
                      ? "bg-ink text-white"
                      : "bg-white text-muted shadow-sm"
                  }`}
                >
                  Video
                </button>
                <button
                  onClick={() => {
                    clearToken();
                    setAuthed(false);
                  }}
                  className="rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-muted transition-colors hover:text-rose sm:px-5"
                >
                  Çıxış
                </button>
              </div>
            </div>

            {tab === "gallery" && (
              <GalleryManager onUnauthorized={() => setAuthed(false)} />
            )}
            {tab === "pricing" && (
              <PricingManager onUnauthorized={() => setAuthed(false)} />
            )}
            {tab === "video" && (
              <VideoManager onUnauthorized={() => setAuthed(false)} />
            )}
          </>
        )}
      </div>
    </main>
  );
}

/* ================= Giriş ================= */

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Giriş alınmadı.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-sm rounded-3xl bg-white p-8 shadow-xl shadow-rose/10">
      <h1 className="font-display text-2xl font-bold">Admin girişi</h1>
      <p className="mt-1 text-sm text-muted">
        Qalereya və qiymətləri idarə etmək üçün daxil olun.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="İstifadəçi adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full rounded-xl border border-ink/10 bg-cream px-4 py-3 text-sm outline-none focus:border-rose"
        />
        <input
          type="password"
          placeholder="Parol"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-xl border border-ink/10 bg-cream px-4 py-3 text-sm outline-none focus:border-rose"
        />

        {error && <p className="text-sm text-rose">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-rose py-3 font-display text-sm font-semibold text-white shadow-lg shadow-rose/30 transition-colors hover:bg-rose-dark disabled:opacity-60"
        >
          {loading ? "Yoxlanılır..." : "Daxil ol"}
        </button>
      </form>
    </div>
  );
}

/* ================= Qalereya idarəsi ================= */

function GalleryManager({ onUnauthorized }: { onUnauthorized: () => void }) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  // Upload formu
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState(CATEGORIES[0].key);
  const [altText, setAltText] = useState("");

  const handleError = useCallback(
    (err: unknown) => {
      const message = err instanceof Error ? err.message : "Xəta baş verdi.";
      if (message.includes("Sessiya")) onUnauthorized();
      setError(message);
    },
    [onUnauthorized]
  );

  const load = useCallback(async () => {
    try {
      setImages(await fetchGalleryAdmin());
    } catch (err) {
      handleError(err);
    }
  }, [handleError]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleUpload(e: FormEvent) {
    e.preventDefault();
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      await uploadImage(file, category, altText);
      setFile(null);
      setAltText("");
      (e.target as HTMLFormElement).reset();
      await load();
    } catch (err) {
      handleError(err);
    } finally {
      setUploading(false);
    }
  }

  async function handleUpdate(
    id: number,
    data: { category?: string; altText?: string; sortOrder?: number; isCover?: boolean }
  ) {
    setError("");
    try {
      await updateImage(id, data);
      await load();
    } catch (err) {
      handleError(err);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Bu şəkli silmək istədiyinizə əminsiniz?")) return;
    setError("");
    try {
      await deleteImage(id);
      await load();
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <div className="space-y-8">
      {/* Yükləmə formu */}
      <form
        onSubmit={handleUpload}
        className="rounded-3xl bg-white p-6 shadow-sm"
      >
        <h2 className="font-display text-lg font-bold">Yeni şəkil yüklə</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            required
            className="w-full min-w-0 rounded-xl border border-ink/10 bg-cream px-4 py-2.5 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-blush file:px-3 file:py-1 file:text-xs file:font-semibold file:text-rose"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full min-w-0 rounded-xl border border-ink/10 bg-cream px-4 py-2.5 text-sm"
          >
            {CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Alt mətn (SEO üçün)"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            className="w-full min-w-0 rounded-xl border border-ink/10 bg-cream px-4 py-2.5 text-sm"
          />
          <button
            type="submit"
            disabled={uploading || !file}
            className="w-full rounded-full bg-rose px-6 py-2.5 font-display text-sm font-semibold text-white transition-colors hover:bg-rose-dark disabled:opacity-50"
          >
            {uploading ? "Yüklənir..." : "Yüklə"}
          </button>
        </div>
      </form>

      {error && (
        <p className="rounded-2xl bg-rose/10 px-5 py-3 text-sm text-rose">
          {error}
        </p>
      )}

      {/* Şəkil siyahısı */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img) => (
          <GalleryImageCard
            key={img.id}
            img={img}
            onSave={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {images.length === 0 && !error && (
        <p className="rounded-3xl bg-white p-10 text-center text-sm text-muted">
          Hələ şəkil yüklənməyib.
        </p>
      )}
    </div>
  );
}

/* ---- Tək qalereya şəkli kartı: dəyişikliklər "Yadda saxla" ilə saxlanılır ---- */

function GalleryImageCard({
  img,
  onSave,
  onDelete,
}: {
  img: GalleryImage;
  onSave: (
    id: number,
    data: { category?: string; altText?: string; sortOrder?: number; isCover?: boolean }
  ) => Promise<void>;
  onDelete: (id: number) => void;
}) {
  const [category, setCategory] = useState(img.category);
  const [altText, setAltText] = useState(img.altText ?? "");
  const [sortOrder, setSortOrder] = useState(img.sortOrder);
  const [saving, setSaving] = useState(false);

  const dirty =
    category !== img.category ||
    altText !== (img.altText ?? "") ||
    sortOrder !== img.sortOrder;

  async function handleSaveClick() {
    setSaving(true);
    try {
      await onSave(img.id, { category, altText, sortOrder });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="relative">
        <img
          src={imageUrl(img.url)}
          alt={img.altText ?? ""}
          className="h-40 w-full rounded-xl object-cover"
        />
        {img.isCover && (
          <span className="absolute left-2 top-2 rounded-full bg-green px-2.5 py-1 text-[10px] font-semibold text-white shadow">
            ★ Kart şəkli
          </span>
        )}
      </div>
      <div className="mt-3 space-y-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-ink/10 bg-cream px-3 py-2 text-xs"
        >
          {CATEGORIES.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          placeholder="Alt mətn"
          className="w-full rounded-lg border border-ink/10 bg-cream px-3 py-2 text-xs"
        />
        <div className="flex items-center justify-between gap-2">
          <label className="flex items-center gap-2 text-xs text-muted">
            Sıra:
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value, 10) || 0)}
              className="w-16 rounded-lg border border-ink/10 bg-cream px-2 py-1 text-xs"
            />
          </label>
          <button
            onClick={() => onDelete(img.id)}
            className="rounded-lg bg-rose/10 px-3 py-1.5 text-xs font-semibold text-rose transition-colors hover:bg-rose hover:text-white"
          >
            Sil
          </button>
        </div>

        {/* Yadda saxla — yalnız dəyişiklik olanda aktivdir */}
        <button
          onClick={handleSaveClick}
          disabled={!dirty || saving}
          className={`w-full rounded-lg py-2 font-display text-xs font-semibold transition-colors ${
            dirty && !saving
              ? "bg-green text-white hover:bg-green-dark"
              : "cursor-not-allowed bg-ink/5 text-muted"
          }`}
        >
          {saving ? "Saxlanılır..." : dirty ? "Yadda saxla" : "Dəyişiklik yoxdur"}
        </button>

        {/* Kart şəkli et — ana səhifə Xidmətlər bölməsində bu kateqoriyanın şəkli olsun */}
        {!img.isCover && (
          <button
            onClick={() => onSave(img.id, { isCover: true })}
            className="w-full rounded-lg border border-gold/70 py-2 font-display text-xs font-semibold text-ink transition-colors hover:bg-gold/10"
          >
            ★ Kateqoriya kartı et
          </button>
        )}
      </div>
    </div>
  );
}

/* ================= Video idarəsi ================= */

function VideoManager({ onUnauthorized }: { onUnauthorized: () => void }) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");

  const handleError = useCallback(
    (err: unknown) => {
      const message = err instanceof Error ? err.message : "Xəta baş verdi.";
      if (message.includes("Sessiya")) onUnauthorized();
      setError(message);
    },
    [onUnauthorized]
  );

  const load = useCallback(async () => {
    try {
      setVideos(await fetchVideosAdmin());
    } catch (err) {
      handleError(err);
    }
  }, [handleError]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleUpload(e: FormEvent) {
    e.preventDefault();
    if (!file || !title.trim()) return;
    setError("");
    setUploading(true);
    try {
      setProgress("Poster hazırlanır...");
      const poster = await extractPoster(file);
      setProgress("Video yüklənir (böyük fayl bir az çəkə bilər)...");
      await uploadVideo(file, title.trim(), poster);
      setFile(null);
      setTitle("");
      (e.target as HTMLFormElement).reset();
      await load();
    } catch (err) {
      handleError(err);
    } finally {
      setUploading(false);
      setProgress("");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Bu videonu silmək istədiyinizə əminsiniz?")) return;
    setError("");
    try {
      await deleteVideo(id);
      await load();
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleUpload} className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold">Yeni video yüklə</h2>
        <p className="mt-1 text-xs text-muted">
          Poster (kadr) avtomatik videodan çıxarılır. Qısa videolar tövsiyə olunur.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            required
            className="w-full min-w-0 rounded-xl border border-ink/10 bg-cream px-4 py-2.5 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-blush file:px-3 file:py-1 file:text-xs file:font-semibold file:text-rose"
          />
          <input
            type="text"
            placeholder="Video başlığı"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full min-w-0 rounded-xl border border-ink/10 bg-cream px-4 py-2.5 text-sm"
          />
          <button
            type="submit"
            disabled={uploading || !file || !title.trim()}
            className="w-full rounded-full bg-rose px-6 py-2.5 font-display text-sm font-semibold text-white transition-colors hover:bg-rose-dark disabled:opacity-50"
          >
            {uploading ? "Yüklənir..." : "Yüklə"}
          </button>
        </div>
        {progress && <p className="mt-3 text-xs text-muted">{progress}</p>}
      </form>

      {error && (
        <p className="rounded-2xl bg-rose/10 px-5 py-3 text-sm text-rose">{error}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <div key={v.id} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-ink/5">
              {v.posterUrl ? (
                <img
                  src={imageUrl(v.posterUrl)}
                  alt={v.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-3xl text-muted">
                  🎬
                </div>
              )}
            </div>
            <p className="mt-3 font-display text-sm font-bold">{v.title}</p>
            <button
              onClick={() => handleDelete(v.id)}
              className="mt-3 w-full rounded-lg bg-rose/10 py-2 text-xs font-semibold text-rose transition-colors hover:bg-rose hover:text-white"
            >
              Sil
            </button>
          </div>
        ))}
      </div>

      {videos.length === 0 && !error && (
        <p className="rounded-3xl bg-white p-10 text-center text-sm text-muted">
          Hələ video yüklənməyib.
        </p>
      )}
    </div>
  );
}

/* ================= Qiymət idarəsi ================= */

const EMPTY_FORM: UpsertPricingPackage = {
  name: "",
  tag: null,
  priceFrom: 0,
  features: [],
  isFeatured: false,
  isActive: true,
  sortOrder: 0,
};

function PricingManager({ onUnauthorized }: { onUnauthorized: () => void }) {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<PricingPackage | null>(null);
  const [creating, setCreating] = useState(false);

  const handleError = useCallback(
    (err: unknown) => {
      const message = err instanceof Error ? err.message : "Xəta baş verdi.";
      if (message.includes("Sessiya")) onUnauthorized();
      setError(message);
    },
    [onUnauthorized]
  );

  const load = useCallback(async () => {
    try {
      setPackages(await fetchPricingAdmin());
    } catch (err) {
      handleError(err);
    }
  }, [handleError]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSave(data: UpsertPricingPackage, id?: number) {
    setError("");
    try {
      if (id !== undefined) {
        await updatePackage(id, data);
      } else {
        await createPackage(data);
      }
      setEditing(null);
      setCreating(false);
      await load();
    } catch (err) {
      handleError(err);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Bu paketi silmək istədiyinizə əminsiniz?")) return;
    setError("");
    try {
      await deletePackage(id);
      await load();
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <p className="rounded-2xl bg-rose/10 px-5 py-3 text-sm text-rose">
          {error}
        </p>
      )}

      {!creating && !editing && (
        <button
          onClick={() => setCreating(true)}
          className="rounded-full bg-rose px-6 py-2.5 font-display text-sm font-semibold text-white shadow-lg shadow-rose/30 transition-colors hover:bg-rose-dark"
        >
          + Yeni paket
        </button>
      )}

      {(creating || editing) && (
        <PackageForm
          initial={editing ?? undefined}
          onCancel={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSave={(data) => handleSave(data, editing?.id)}
        />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`rounded-2xl bg-white p-5 shadow-sm ${!pkg.isActive ? "opacity-50" : ""}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-lg font-bold">{pkg.name}</h3>
                {pkg.tag && (
                  <span className="mt-1 inline-block rounded-full bg-blush px-3 py-0.5 text-xs font-semibold text-rose">
                    {pkg.tag}
                  </span>
                )}
              </div>
              <span className="font-display text-xl font-extrabold">
                {pkg.priceFrom} ₼
              </span>
            </div>

            <ul className="mt-3 space-y-1 text-xs text-muted">
              {pkg.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>

            <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-muted">
              {pkg.isFeatured && (
                <span className="rounded-full bg-gold/15 px-2.5 py-0.5 font-semibold text-gold">
                  Vurğulanmış
                </span>
              )}
              {!pkg.isActive && (
                <span className="rounded-full bg-ink/10 px-2.5 py-0.5 font-semibold">
                  Gizli
                </span>
              )}
              <span className="rounded-full bg-ink/5 px-2.5 py-0.5">
                Sıra: {pkg.sortOrder}
              </span>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  setCreating(false);
                  setEditing(pkg);
                }}
                className="flex-1 rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-white"
              >
                Redaktə et
              </button>
              <button
                onClick={() => handleDelete(pkg.id)}
                className="rounded-lg bg-rose/10 px-3 py-2 text-xs font-semibold text-rose transition-colors hover:bg-rose hover:text-white"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PackageForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: PricingPackage;
  onSave: (data: UpsertPricingPackage) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<UpsertPricingPackage>(
    initial
      ? {
          name: initial.name,
          tag: initial.tag,
          priceFrom: initial.priceFrom,
          features: initial.features,
          isFeatured: initial.isFeatured,
          isActive: initial.isActive,
          sortOrder: initial.sortOrder,
        }
      : EMPTY_FORM
  );
  const [featuresText, setFeaturesText] = useState(
    initial?.features.join("\n") ?? ""
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSave({
      ...form,
      tag: form.tag?.trim() || null,
      features: featuresText
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-6 shadow-lg shadow-rose/10"
    >
      <h2 className="font-display text-lg font-bold">
        {initial ? `"${initial.name}" paketini redaktə et` : "Yeni paket"}
      </h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-semibold text-muted">
          Paketin adı
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="mt-1 w-full rounded-xl border border-ink/10 bg-cream px-4 py-2.5 text-sm font-normal text-ink"
          />
        </label>

        <label className="text-xs font-semibold text-muted">
          Etiket (məs. &quot;Ən çox seçilən&quot;)
          <input
            type="text"
            value={form.tag ?? ""}
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
            className="mt-1 w-full rounded-xl border border-ink/10 bg-cream px-4 py-2.5 text-sm font-normal text-ink"
          />
        </label>

        <label className="text-xs font-semibold text-muted">
          Başlanğıc qiymət (₼)
          <input
            type="number"
            min="0"
            step="1"
            value={form.priceFrom}
            onChange={(e) =>
              setForm({ ...form, priceFrom: Number(e.target.value) })
            }
            required
            className="mt-1 w-full rounded-xl border border-ink/10 bg-cream px-4 py-2.5 text-sm font-normal text-ink"
          />
        </label>

        <label className="text-xs font-semibold text-muted">
          Sıra (kiçik = əvvəl)
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) =>
              setForm({ ...form, sortOrder: Number(e.target.value) })
            }
            className="mt-1 w-full rounded-xl border border-ink/10 bg-cream px-4 py-2.5 text-sm font-normal text-ink"
          />
        </label>

        <label className="text-xs font-semibold text-muted sm:col-span-2">
          Paketə daxil olanlar (hər sətir bir xüsusiyyət)
          <textarea
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-xl border border-ink/10 bg-cream px-4 py-2.5 text-sm font-normal text-ink"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
            className="h-4 w-4 accent-rose"
          />
          Vurğulanmış kart (böyük göstərilir)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            className="h-4 w-4 accent-rose"
          />
          Saytda göstərilsin
        </label>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-full bg-rose px-6 py-2.5 font-display text-sm font-semibold text-white transition-colors hover:bg-rose-dark"
        >
          Yadda saxla
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-ink/10 px-6 py-2.5 text-sm font-semibold text-muted"
        >
          Ləğv et
        </button>
      </div>
    </form>
  );
}
