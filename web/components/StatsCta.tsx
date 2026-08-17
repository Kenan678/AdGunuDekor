import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const STATS = [
  { value: "600+", label: "Xoşbəxt müştəri" },
  { value: "4.9", label: "Müştəri reytinqi" },
  { value: "30+", label: "Dekor mövzusu" },
  { value: "5+", label: "İllik təcrübə" },
];

export default function StatsCta() {
  return (
    <section className="relative">
      {/* Şəkilli CTA banner — parallaks: scroll-da şəkil sabit qalır, yazılar üstündən keçir */}
      <div
        className="relative flex min-h-[480px] items-center justify-center overflow-hidden bg-cover bg-fixed bg-center"
        style={{ backgroundImage: "url(/assets/cta.jpg)" }}
      >
        <div className="absolute inset-0 bg-ink/60" />
        <div className="relative z-10 px-6 pt-16 pb-32 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-snug text-white sm:text-4xl">
              Sevinc, gülüş və unudulmaz anlar — hamısı bir dekorda
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Tarixi deyin, mövzunu seçin — qalan hər şeyi biz həll edək.
            </p>
          </Reveal>
          <Reveal direction="zoom" delay={250}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-rose px-8 py-3.5 font-display text-sm font-semibold text-white transition-all duration-300 ease-out hover:scale-105 hover:bg-rose-dark"
            >
              Sifariş verin
            </a>
          </Reveal>
        </div>
      </div>

      {/* Yaşıl stats lenti — bannerin altına daşır, rəqəmlər sayaraq artır */}
      <div className="mx-auto -mt-20 max-w-5xl px-6 pb-4">
        <dl className="relative z-10 grid grid-cols-2 gap-y-8 rounded-3xl bg-green px-6 py-10 shadow-2xl shadow-green/30 sm:grid-cols-4 sm:divide-x sm:divide-white/15">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-3xl font-bold text-white sm:text-4xl">
                <CountUp value={stat.value} />
              </dd>
              <dd className="mt-1.5 text-xs tracking-wide text-white/75">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
