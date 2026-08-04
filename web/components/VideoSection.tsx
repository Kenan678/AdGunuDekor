"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { imageUrl, type Video } from "@/lib/api";

export default function VideoSection({ videos }: { videos: Video[] }) {
  const [active, setActive] = useState<string | null>(null);

  if (videos.length === 0) return null;

  return (
    <section id="video" className="relative overflow-hidden bg-cream py-20 sm:py-28">
      {/* Arxa fon — açıq gül line-art naxışı */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{ backgroundImage: "url(/floral.svg)", backgroundSize: "340px 340px" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1536px] px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal direction="down">
            <span className="script-label">Videolarımız</span>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              İşlərimizdən bir neçə video kadr
            </h2>
            <p className="mt-4 text-muted">
              Balonların qurulmasından tədbirin ən şirin anlarına qədər.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {videos.map((v, i) => (
            <Reveal key={v.id} direction={i % 2 === 0 ? "left" : "right"} delay={(i % 2) * 130}>
              <button
                onClick={() => setActive(imageUrl(v.url))}
                className="group relative block aspect-video w-full overflow-hidden rounded-3xl bg-green shadow-[0_25px_60px_-30px_rgba(10,10,18,0.4)]"
              >
                {v.posterUrl && (
                  <img
                    src={imageUrl(v.posterUrl)}
                    alt={v.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                )}
                <span className="absolute inset-0 bg-ink/35 transition-colors duration-300 group-hover:bg-ink/50" />
                <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-rose shadow-xl transition-transform duration-300 group-hover:scale-110">
                  ▶
                </span>
                <span className="absolute inset-x-0 bottom-0 p-5 text-left font-display text-lg font-bold text-white drop-shadow">
                  {v.title}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Video oynadan modal */}
      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setActive(null)}
            aria-label="Bağla"
            className="absolute top-5 right-6 text-4xl font-light text-white/80 hover:text-white"
          >
            &times;
          </button>
          <video
            src={active}
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-full max-w-4xl rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
