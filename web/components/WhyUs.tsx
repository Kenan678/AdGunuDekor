import Reveal from "@/components/Reveal";

const FEATURES = [
  {
    icon: "🎨",
    title: "Fərdi dizayn",
    text: "Hər tədbir üçün mövzuya uyğun rəng və konsept — şablon yox.",
  },
  {
    icon: "⏱",
    title: "Vaxtında təhvil",
    text: "Tədbir gününə qədər hər şey hazır — gecikmə olmur.",
  },
  {
    icon: "💰",
    title: "Şəffaf qiymət",
    text: "Razılaşdığımız qiymət son qiymətdir, gizli xərc yoxdur.",
  },
  {
    icon: "💝",
    title: "600+ tədbir",
    text: "Bakı boyu yüzlərlə məmnun ailənin etibarı.",
  },
];

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-cream py-20 sm:py-24">
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
            <span className="script-label">Niyə biz</span>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Sizi düşünmək bizim işimizdir
            </h2>
          </Reveal>
        </div>

        {/* Ziqzaq düzülüş — 2-ci və 4-cü kart aşağı sürüşür (Hanna-dakı kimi) */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 120}
              className={i % 2 === 1 ? "lg:mt-10" : ""}
            >
              <div className="group h-full rounded-2xl bg-white p-7 text-center shadow-[0_15px_40px_-25px_rgba(10,10,18,0.3)] transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.04] hover:shadow-[0_25px_50px_-25px_rgba(55,108,108,0.45)]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green text-2xl shadow-lg shadow-green/25 transition-transform duration-300 group-hover:scale-110">
                  {f.icon}
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
