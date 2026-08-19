import Reveal from "@/components/Reveal";
import { CATEGORIES } from "@/lib/categories";
import { imageUrl, type GalleryImage } from "@/lib/api";

export default function Services({
  images = [],
}: {
  images?: GalleryImage[];
}) {
  // Hər kateqoriya üçün kart şəklini seç:
  // 1) admin-də "cover" işarələnmiş qalereya şəkli
  // 2) yoxdursa həmin kateqoriyanın ilk qalereya şəkli
  // 3) o da yoxdursa sabit nümunə şəkil (lib/categories.ts)
  function coverFor(catKey: string, fallback: string): string {
    const inCat = images.filter((im) => im.category === catKey);
    const cover = inCat.find((im) => im.isCover) ?? inCat[0];
    return cover ? imageUrl(cover.url) : fallback;
  }

  return (
    <section id="xidmetler" className="relative overflow-hidden bg-cream py-20 sm:py-28">
      {/* Arxa fon — açıq gül line-art naxışı */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{ backgroundImage: "url(/floral.svg)", backgroundSize: "340px 340px" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1536px] px-6">
        {/* Başlıq — iki sütun (template üslubu): solda başlıq, sağda mətn + düymə */}
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <Reveal direction="left">
            <span className="script-label">Xidmətlərimiz</span>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Bakıda hər mövzuya uyğun ad günü dekoru
            </h2>
          </Reveal>
          <Reveal direction="right" className="lg:pb-2">
            <p className="max-w-md leading-relaxed text-muted">
              1 yaşdan böyüklər tədbirinə qədər — hər anınıza uyğun rəng və
              konsept hazırlayırıq. Bəyəndiyiniz mövzunu seçin, qalanını biz
              düşünək.
            </p>
            <a
              href="#qalereya"
              className="mt-5 inline-block rounded-full bg-rose px-8 py-3 font-display text-sm font-semibold text-white transition-colors duration-300 hover:bg-rose-dark"
            >
              Hamısına baxın
            </a>
          </Reveal>
        </div>

        {/* Ağ kartlar — template ölçüsü: 3:2 şəkil, 30px künc, 25px aralıq */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.key} direction="down" delay={(i % 3) * 130}>
              <a
                href="#qalereya"
                className="group block rounded-[30px] bg-white p-3 pb-6 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_18px_45px_-8px_rgba(0,0,0,0.22)]"
              >
                <div className="aspect-[3/2] overflow-hidden rounded-[18px]">
                  {/* Şəkil xarici (backend) və ya sabit ola bilər — adi img */}
                  <img
                    src={coverFor(cat.key, cat.img)}
                    alt={cat.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 text-center font-display text-[19px] font-semibold text-ink">
                  {cat.label}
                </h3>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
