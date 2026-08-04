import Reveal from "@/components/Reveal";

const INFO = [
  {
    icon: "📱",
    title: "WhatsApp",
    lines: ["+994 70 272 15 55"],
    href: "https://wa.me/994702721555",
  },
  {
    icon: "📸",
    title: "Instagram",
    lines: ["@adgunudekor"],
    href: "https://instagram.com",
  },
  {
    icon: "🕙",
    title: "İş saatları",
    lines: ["Hər gün 08:00 — 02:00", "WhatsApp 7/24 aktiv"],
  },
  {
    icon: "📍",
    title: "Xidmət ərazisi",
    lines: ["Bakı və ətraf", "rayonlar"],
  },
];

export default function Contact() {
  return (
    <section id="elaqe" className="relative overflow-hidden bg-white py-20 sm:py-24">
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
        {/* Məlumat sırası — dairəvi ikonlarla */}
        <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-ink/10">
          {INFO.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div className="px-4 text-center transition-transform duration-500 ease-out hover:scale-[1.06]">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose text-2xl text-white shadow-lg shadow-rose/30 transition-transform duration-300 hover:scale-110">
                  {item.icon}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-rose"
                    >
                      {item.lines.join(" ")}
                    </a>
                  ) : (
                    item.lines.map((line) => <span key={line} className="block">{line}</span>)
                  )}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Reveal direction="down">
            <span className="script-label">Əlaqə</span>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Tədbirinizi indi planlaşdıraq
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Tarixi söyləyin, qalanını biz düşünək. İlk konsultasiya pulsuzdur.
            </p>
          </Reveal>
          <Reveal direction="zoom" delay={300}>
            <a
              href="https://wa.me/994702721555"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-rose px-9 py-3.5 font-display text-sm font-semibold text-white shadow-xl shadow-rose/30 transition-all duration-300 ease-out hover:scale-105 hover:bg-rose-dark"
            >
              WhatsApp ilə yazın
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
