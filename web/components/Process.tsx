import Reveal from "@/components/Reveal";

const STEPS = [
  {
    no: "01",
    title: "Yazın, danışaq",
    text: "WhatsApp və ya Instagram üzərindən tarix, məkan və mövzu haqqında qısa məlumat verin.",
  },
  {
    no: "02",
    title: "Konsepti təsdiqləyək",
    text: "Rəng palitrası, fon dizaynı və büdcəyə uyğun paketi birlikdə seçirik.",
  },
  {
    no: "03",
    title: "Qurulum və təhvil",
    text: "Tədbir günü ərzində məkanda quraşdırma tamamlanır — siz sadəcə qonaqları qarşılayırsınız.",
  },
];

export default function Process() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1536px] px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-display text-base italic text-rose">
              Necə işləyir
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Sifarişdən quruluşa qədər üç addım
            </h2>
          </div>
        </Reveal>

        <div className="relative mt-14 grid gap-10 md:grid-cols-3">
          {/* Bağlayıcı xətt (yalnız desktop) */}
          <div className="absolute top-7 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-rose/40 via-gold/40 to-coral/40 md:block" />

          {STEPS.map((step, i) => (
            <Reveal key={step.no} delay={i * 150}>
              <div className="group relative text-center md:text-left">
                <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-green font-display text-lg font-bold text-white shadow-lg shadow-green/30 transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:scale-110">
                  {step.no}
                </span>
                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
