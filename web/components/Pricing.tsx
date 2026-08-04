import type { PricingPackage } from "@/lib/api";
import Reveal from "@/components/Reveal";

export default function Pricing({
  packages,
}: {
  packages: PricingPackage[];
}) {
  if (packages.length === 0) return null;

  return (
    <section id="qiymetler" className="relative overflow-hidden bg-white py-20 sm:py-28">
      {/* Arxa fon — açıq gül line-art naxışı */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage: "url(/floral.svg)",
          backgroundSize: "340px 340px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1536px] px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal direction="down">
            <span className="script-label">Xüsusi qiymətlər</span>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Büdcənizə uyğun paketlər
            </h2>
            <p className="mt-4 text-muted">
              Hər paketə rəng seçimi, quraşdırma və konsultasiya daxildir.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid items-center gap-8 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal
              key={pkg.id}
              direction="zoom"
              delay={i * 180}
              className="h-full"
            >
              <article
                className={`relative flex h-full flex-col rounded-3xl p-8 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.03] ${
                  pkg.isFeatured
                    ? "bg-gradient-to-b from-green to-green-dark text-white shadow-2xl shadow-green/40 lg:scale-105"
                    : "bg-white shadow-[0_20px_50px_-30px_rgba(10,10,18,0.35)]"
                }`}
              >
                {pkg.isFeatured && pkg.tag && (
                  <span className="mb-4 self-start rounded-full bg-coral px-4 py-1 text-xs font-semibold text-ink">
                    {pkg.tag}
                  </span>
                )}

                <h3 className="font-display text-2xl font-bold">
                  {pkg.name.split(" ")[0]}{" "}
                  <span className={pkg.isFeatured ? "text-coral" : "text-green"}>
                    {pkg.name.split(" ").slice(1).join(" ")}
                  </span>
                </h3>

                {!pkg.isFeatured && pkg.tag && (
                  <p className="mt-1 text-sm text-muted">{pkg.tag}</p>
                )}

                {/* Zeytun ayırıcı xətt */}
                <div className="mt-4 h-px w-full bg-gold/60" />

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold text-coral">
                    {pkg.priceFrom}₼
                  </span>
                  <span
                    className={`font-display text-sm ${pkg.isFeatured ? "text-white/70" : "text-muted"}`}
                  >
                    / başlayan qiymət
                  </span>
                </div>

                <a
                  href="https://wa.me/994702721555"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 block rounded-full py-3.5 text-center font-display text-sm font-semibold transition-colors duration-300 ${
                    pkg.isFeatured
                      ? "bg-coral text-ink hover:bg-white"
                      : "bg-rose text-white hover:bg-rose-dark"
                  }`}
                >
                  Paketi seçin »
                </a>

                <ul
                  className={`mt-6 flex-1 space-y-3 border-t pt-5 ${pkg.isFeatured ? "border-white/15" : "border-ink/10"}`}
                >
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 font-bold text-coral">✓</span>
                      <span className={pkg.isFeatured ? "text-white/85" : "text-muted"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
