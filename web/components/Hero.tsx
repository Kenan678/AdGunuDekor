import Image from "next/image";
import Reveal from "@/components/Reveal";
import { WHATSAPP_URL } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section className="overflow-x-hidden bg-cream">
      <div className="mx-auto grid max-w-[1536px] items-center gap-12 px-6 pt-28 pb-16 sm:pt-36 sm:pb-24 lg:grid-cols-2">
        {/* Sol — hər element ayrı istiqamətdən gəlir (Hanna üslubu) */}
        <div>
          <Reveal direction="down">
            <span className="script-label">Ad Günü Dekor</span>
          </Reveal>

          <Reveal direction="left" delay={150}>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.12] text-green sm:text-5xl xl:text-[3.6rem]">
              Bakıda ad günü dekoru: hər doğum günü unudulmaz bir səhnəyə
              çevrilsin
            </h1>
          </Reveal>

          <Reveal direction="right" delay={300}>
            <p className="mt-6 max-w-lg leading-relaxed text-muted">
              Tədbirlərinizi öz dizaynımızla özəl bəzəyirik. Siz sadəcə
              qonaqları qarşılayın, qalanı bizim işimizdir.
            </p>
          </Reveal>

          <Reveal direction="left" delay={450}>
            <div className="mt-9 flex items-center gap-5">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-rose px-8 py-3.5 font-display text-sm font-semibold text-white transition-all duration-300 ease-out hover:scale-105 hover:bg-rose-dark"
              >
                📞 Əlaqə saxlayın
              </a>
              <a
                href="#qalereya"
                aria-label="İşlərimizə baxın"
                className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green text-white shadow-[0_0_0_8px_rgba(238,170,156,0.35)] transition-transform duration-300 hover:scale-110"
              >
                ▶
              </a>
            </div>
          </Reveal>
        </div>

        {/* Sağ — şəkillər: biri aşağıdan, biri yuxarıdan (mobildə də görünür) */}
        <div className="flex gap-4 lg:gap-6">
          <Reveal direction="up" delay={200} className="mt-10 flex-1">
            <div className="arch-frame overflow-hidden transition-transform duration-500 ease-out hover:scale-[1.04]">
              <Image
                src="/assets/sample-balon.jpg"
                alt="Balon dekoru — ad günü bəzədilməsi"
                width={340}
                height={480}
                priority
                className="h-72 w-full object-cover sm:h-[440px]"
              />
            </div>
          </Reveal>
          <Reveal direction="down" delay={350} className="flex-1">
            <div className="arch-frame overflow-hidden transition-transform duration-500 ease-out hover:scale-[1.04]">
              <Image
                src="/assets/sample-masa.jpg"
                alt="Masa dekoru — ad günü süfrəsi"
                width={340}
                height={480}
                priority
                className="h-72 w-full object-cover sm:h-[440px]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
