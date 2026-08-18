import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const COMPANY_LINKS = [
  { href: "/haqqimizda", label: "Haqqımızda" },
  { href: "/qalereya", label: "Qalereya" },
  { href: "/qiymetler", label: "Qiymətlər" },
  { href: "/elaqe", label: "Əlaqə" },
];

const SERVICES = [
  "1 Yaş dekoru",
  "Ad günü dekoru",
  "Məzuniyyət dekoru",
  "Kiçik toy dekoru",
];

export default function Footer() {
  return (
    <footer className="bg-cream">
      <div className="mx-auto max-w-[1536px] px-6 pt-14">
        {/* Newsletter sırası (Hanna: loqo + serif mətn + düymə) */}
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
          <div className="text-center lg:text-left">
            <span className="logo-text block text-4xl text-ink">
              Ad Günü Dekor
            </span>
          </div>
          <p className="max-w-md text-center font-display text-lg font-semibold text-ink/70 lg:text-left">
            Yeni mövzular və kampaniyalardan xəbərdar olmaq üçün bizə yazın.
          </p>
          <a
            href="https://wa.me/994702721555?text=Salam!%20Kampaniyalardan%20x%C9%99b%C9%99rdar%20olmaq%20ist%C9%99yir%C9%99m."
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-rose px-9 py-3 font-display text-sm font-semibold text-white transition-colors duration-300 hover:bg-rose-dark"
          >
            ✉ Bizə qoşulun
          </a>
        </div>

        {/* Çiçək ornamentli ayırıcı (Hanna-dakı kimi) */}
        <div className="mt-10 flex items-center gap-4">
          <span className="h-px flex-1 bg-ink/10" />
          <span className="text-rose" aria-hidden>
            ❀
          </span>
          <span className="h-px flex-1 bg-ink/10" />
        </div>

        {/* Sütunlar — teal serif başlıqlar */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="font-display text-xl font-bold text-green">
              Haqqımızda
            </h4>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Bakıda tədbir dekorasiyası — hər anınızı özəl dizayn və zövqlə
              gözəlləşdiririk. Sizin tədbiriniz, bizim ilhamımız.
            </p>
          </div>

          <div>
            <h4 className="font-display text-xl font-bold text-green">
              Keçidlər
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-rose"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xl font-bold text-green">
              Xidmətlər
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {SERVICES.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xl font-bold text-green">
              Əlaqə
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>
                📍 Bakı, Azərbaycan
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-rose"
                >
                  📞 +994 70 272 15 55
                </a>
              </li>
              <li>🕙 Hər gün, 08:00 — 02:00</li>
              <li>💬 WhatsApp 7/24 aktivdir</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Alt sətir — sosial dairələr */}
      <div className="border-t border-ink/10">
        <div className="mx-auto flex max-w-[1536px] flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} Ad Günü Dekor</span>
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/adgunu_dekor1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-rose text-white transition-colors hover:bg-rose-dark"
            >
              ⌾
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-rose text-white transition-colors hover:bg-rose-dark"
            >
              ✆
            </a>
          </div>
          <Link href="/admin" className="transition-colors hover:text-rose">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
