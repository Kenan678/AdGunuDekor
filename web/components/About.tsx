import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section className="overflow-x-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1536px] items-center gap-14 px-6 lg:grid-cols-2">
        {/* Sol — tağ şəkillər + təcrübə dairəsi (soldan gəlir) */}
        <Reveal direction="left">
          <div className="relative flex justify-center gap-4 lg:justify-start">
            <div className="arch-frame w-40 overflow-hidden transition-transform duration-500 ease-out hover:scale-[1.05] sm:w-60">
              <video
                src="/assets/videos/about-1.mp4"
                poster="/assets/sample-foto.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-64 w-full object-cover sm:h-80"
              />
            </div>
            <div className="arch-frame mt-10 w-40 overflow-hidden transition-transform duration-500 ease-out hover:scale-[1.05] sm:mt-14 sm:w-60">
              <video
                src="/assets/videos/about-2.mp4"
                poster="/assets/sample-masa.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-64 w-full object-cover sm:h-80"
              />
            </div>
          </div>
        </Reveal>

        {/* Sağ — hər element ayrı istiqamətdən */}
        <div>
          <Reveal direction="down">
            <span className="script-label">Biz kimik</span>
          </Reveal>

          <Reveal direction="left" delay={150}>
            <h2 className="mt-3 font-display text-3xl font-bold leading-snug tracking-tight sm:text-4xl">
              Hər tədbirdə bir sevgi hekayəsi yaradırıq
            </h2>
          </Reveal>

          <Reveal direction="right" delay={300}>
            <p className="mt-5 leading-relaxed text-muted">
              Ad Günü Dekor komandası olaraq, sizin ən xoşbəxt anlarınızı
              gözəlləşdiririk. 1 yaşdan böyüklər tədbirinə qədər hər anınız üçün
              özəl konsept hazırlayırıq — rəngi, dizaynı və hər kiçik detalı
              sizin zövqünüzə uyğun seçirik.
            </p>
          </Reveal>

          <Reveal direction="right" delay={420}>
            <p className="mt-4 leading-relaxed text-muted">
              600-dən çox tədbir təcrübəmizlə, sifarişdən quruluşa qədər bütün
              işi biz üzərimizə götürürük. Siz sadəcə gəlin və gününüzü yaşayın
              — qalanı bizim işimizdir.
            </p>
          </Reveal>

          <Reveal direction="left" delay={550}>
            <a
              href="https://wa.me/994702721555"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-rose px-8 py-3.5 font-display text-sm font-semibold text-white transition-all duration-300 ease-out hover:scale-105 hover:bg-rose-dark"
            >
              Ətraflı öyrənin
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
