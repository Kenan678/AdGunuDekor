"use client";

import { useMemo, useState } from "react";
import { imageUrl, type GalleryImage } from "@/lib/api";
import { CATEGORIES } from "@/lib/categories";
import Reveal from "@/components/Reveal";

const FILTERS = [
  { key: "all", label: "Hamısı" },
  ...CATEGORIES.map((c) => ({ key: c.key, label: c.short })),
];

export default function GallerySection({
  images,
}: {
  images: GalleryImage[];
}) {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const visible = useMemo(
    () =>
      filter === "all"
        ? images
        : images.filter((img) => img.category === filter),
    [images, filter]
  );

  return (
    <section id="qalereya" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1536px] px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal direction="down">
              <span className="script-label">Tamamlanmış tədbirlər</span>
            </Reveal>
            <Reveal direction="left" delay={150}>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                İşlərimizdən bir neçə kadr
              </h2>
            </Reveal>
          </div>

          <Reveal direction="right" delay={250}>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`rounded-full px-5 py-2 font-display text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                    filter === f.key
                      ? "bg-rose text-white shadow-lg shadow-rose/30"
                      : "bg-white text-muted shadow-sm hover:text-rose"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {visible.length === 0 ? (
          <p className="mt-14 rounded-3xl bg-white p-10 text-center text-muted shadow-sm">
            Bu kateqoriyada hələ şəkil yoxdur. Tezliklə əlavə olunacaq! 🎈
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {visible.map((img, i) => (
              <Reveal key={img.id} delay={(i % 4) * 90}>
                <button
                  onClick={() => setLightbox(img)}
                  className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-rose/30"
                >
                  {/* Bütün şəkillər eyni nisbətdə (3:4) kəsilir → səliqəli cərgə */}
                  <img
                    src={imageUrl(img.url)}
                    alt={img.altText ?? "Ad günü dekoru nümunəsi"}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Hover-də rəngli gradient örtük + böyütmə işarəsi */}
                  <span className="absolute inset-0 bg-gradient-to-t from-green/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-white/90 text-lg text-rose opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    ⤢
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Bağla"
            className="absolute top-5 right-6 text-4xl font-light text-white/80 transition-colors hover:text-white"
          >
            &times;
          </button>
          <img
            src={imageUrl(lightbox.url)}
            alt={lightbox.altText ?? "Ad günü dekoru"}
            className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
