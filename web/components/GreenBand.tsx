import Reveal from "@/components/Reveal";

const ITEMS = [
  {
    icon: "🎈",
    title: "Fərdi dizayn",
    text: "Hər tədbir üçün mövzuya uyğun rəng palitrası və konsept hazırlanır.",
  },
  {
    icon: "⚡",
    title: "Sürətli cavab",
    text: "Sifarişlərə 24 saat ərzində cavab veririk, razılaşma tez olur.",
  },
  {
    icon: "🚚",
    title: "Quraşdırma daxil",
    text: "Məkanda tam quraşdırma və tədbirdən sonra yığışdırma bizdən.",
  },
];

export default function GreenBand() {
  return (
    <section className="bg-green">
      <div className="mx-auto grid max-w-[1536px] gap-10 px-6 py-12 md:grid-cols-3 md:divide-x md:divide-white/20">
        {ITEMS.map((item, i) => (
          <Reveal
            key={item.title}
            direction={i === 0 ? "left" : i === ITEMS.length - 1 ? "right" : "up"}
            delay={i * 130}
          >
            <div className="flex items-start gap-5 transition-transform duration-500 ease-out hover:scale-[1.05] md:px-6">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-rose text-2xl shadow-md">
                {item.icon}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {item.text}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
