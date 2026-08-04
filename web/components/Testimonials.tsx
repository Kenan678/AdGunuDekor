import Reveal from "@/components/Reveal";

const REVIEWS = [
  {
    name: "Günel M.",
    place: "Bakı",
    text: "Qızımın ad gününü elə gözəl bəzədilər ki, bütün qonaqlar şəkil çəkdirməkdən doymadı. Çox peşəkar və qayğıkeş komanda!",
  },
  {
    name: "Elvin R.",
    place: "Xırdalan",
    text: "Tədbir möhtəşəm alındı. Vaxtında gəldilər, hər şeyi özləri qurdular, biz heç nəyə qarışmadıq. Mütləq yenidən müraciət edəcəyik.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1536px] items-center gap-12 px-6 lg:grid-cols-[2fr_3fr]">
        {/* Sol — dairəvi şəkil + fırlanan halqa + üzən ürəklər (soldan gəlir) */}
        <Reveal direction="left">
          <div className="animate-float-slow group relative mx-auto aspect-square w-[280px] sm:w-[380px] lg:w-[420px]">
            {/* Xarici nöqtəli halqa — yavaş fırlanır */}
            <div className="absolute -inset-5 rounded-full border-2 border-dashed border-gold/50 animate-spin-slow" />
            {/* İkinci incə halqa — əks istiqamətdə */}
            <div className="absolute -inset-1 rounded-full border border-rose/30 animate-spin-slow-reverse" />

            {/* Şəkil — dairə */}
            <div className="absolute inset-0 overflow-hidden rounded-full shadow-2xl shadow-green/20 ring-8 ring-white">
              <img
                src="/assets/testimonial.jpg"
                alt="Ailələrin xoşbəxt tədbir anları"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>

            {/* Üzən ürəklər / ulduzlar */}
            <span className="animate-balloon absolute -top-2 right-8 text-3xl drop-shadow-lg">❤️</span>
            <span className="animate-balloon absolute bottom-4 -left-3 text-2xl drop-shadow-lg [animation-delay:-2s]">✨</span>
            <span className="animate-balloon absolute -bottom-2 right-10 text-2xl drop-shadow-lg [animation-delay:-4s]">🎈</span>

            {/* Yaşıl reytinq nişanı */}
            <div className="absolute bottom-2 left-0 flex items-center gap-1.5 rounded-full bg-green px-4 py-2 text-white shadow-xl">
              <span className="text-gold">★</span>
              <span className="font-display text-sm font-bold">4.9 / 5</span>
            </div>
          </div>
        </Reveal>

        {/* Sağ — başlıq + kartlar */}
        <div>
          <Reveal direction="down">
            <span className="script-label">Rəylər</span>
          </Reveal>
          <Reveal direction="left" delay={150}>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Ailələr nə deyir
            </h2>
          </Reveal>
          <Reveal direction="right" delay={280}>
            <p className="mt-4 max-w-xl text-muted">
              Hər tədbirdən sonra bizi ən çox sevindirən — ailələrin təşəkkür
              mesajlarıdır.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} direction="right" delay={i * 140}>
                <figure className="relative flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_15px_40px_-25px_rgba(10,10,18,0.3)] transition-transform duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.04]">
                  <blockquote className="flex-1 text-sm leading-relaxed text-muted">
                    {r.text}
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose font-display text-base font-bold text-white">
                      {r.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block font-display text-base font-bold">
                        {r.name}
                      </span>
                      <span className="block text-xs text-muted">{r.place}</span>
                    </span>
                  </figcaption>
                  {/* Böyük sitat işarəsi */}
                  <span
                    aria-hidden
                    className="absolute right-5 bottom-4 font-display text-6xl leading-none text-green/15"
                  >
                    ”
                  </span>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
