import type { Metadata } from "next";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Fikirlər — Ad Günü Dekoru üçün 10 İlhamverici İdeya",
  description:
    "Bakıda ad günü dekoru seçərkən ilham axtarırsınız? Balon qapısından fotozonaya, rəng palitrindən işıqlandırmaya qədər 10 fikir — Ad Günü Dekor komandasından.",
  alternates: { canonical: "/ideyalar" },
};

const IDEAS = [
  {
    title: "1. Balon qapısı ilə qarşılama",
    text: "Qonaqlar qapıdan girən kimi ilk təəssürat balon qapısından yaranır. Ad günü dekorunda ən çox seçilən elementlərdən biri budur — rəng seçimini mövzuya uyğunlaşdırsanız, tədbirin ovqatı ilk addımdan hiss olunur.",
  },
  {
    title: "2. Fotozona və fon dekoru",
    text: "Yaxşı işıqlandırılmış fotozona qonaqların ən çox vaxt keçirdiyi yerdir. Şar qövsü, kağız güllər və ya sadə parça fon — hansını seçsəniz, ad günü dekorunun 'yaddaqalan' hissəsi məhz bu küncdə formalaşır.",
  },
  {
    title: "3. Mövzuya uyğun rəng palitri",
    text: "3-4 rənglə məhdudlaşan palitri hər zaman daha səliqəli görünür. Uşaq ad günü dekorunda parlaq, canlı tonlar, böyüklər üçün isə qızılı-bej kimi zərif çalarlar daha uzunömürlü zövq verir.",
  },
  {
    title: "4. Masa dekoru və şirniyyat küncü",
    text: "Tort masası tədbirin mərkəzi nöqtəsidir. Kiçik detallar — mövzuya uyğun stəkanlar, adla yazılmış banner, şirniyyat düzülüşü — böyük fərq yaradır və qonaqlar tərəfindən ən çox foto çəkilən yerə çevrilir.",
  },
  {
    title: "5. Yaş rəqəmi ilə mərkəzi kompozisiya",
    text: "Böyük ölçülü rəqəm balonları (1, 18, 30 və s.) indi ad günü dekorunun demək olar ki, standart elementidir. Rəqəmi əsas fon rənginə uyğunlaşdırmaq bütün otağı bir-birinə bağlayır.",
  },
  {
    title: "6. Cizgi film qəhrəmanları ilə uşaq dekoru",
    text: "Uşağın sevdiyi personaj mövzuya çevriləndə ad günü onun üçün əsl bayrama dönür. Bizim qalereyamızda bu tip mövzu üzrə hazırladığımız onlarla dekor nümunəsini görə bilərsiniz.",
  },
  {
    title: "7. Minimal və zərif “böyüklər” dekoru",
    text: "Hər ad günü dekoru rəngarəng olmalı deyil — bej, tərrəngi yaşıl və qızılı tonlarda minimal düzülüş, xüsusilə 30+ yaş qeydlərində daha zövqlü qarşılanır.",
  },
  {
    title: "8. Açıq havada (bağ/həyət) dekor həlləri",
    text: "Açıq məkanlarda küləyə davamlı material seçimi vacibdir — parça asma elementlər, ağır əsaslı qövslər. Bakı və ətraf rayonlarda açıq hava tədbirləri üçün də xidmət göstəririk.",
  },
  {
    title: "9. İşıqlandırma ilə axşam atmosferi",
    text: "Axşam saatlarında keçirilən tədbirlərdə xəfif LED işıq zənciri və ya neon lövhə dekoru tamamilə fərqli bir ovqat yaradır — gündüz sadə görünən dekor axşam fotolarında daha təsirli çıxır.",
  },
  {
    title: "10. Xatirə hədiyyələri və qonaq zonası",
    text: "Kiçik “thank you” hədiyyə paketləri və ya şəkil çəkmək üçün ayrılmış rahat oturacaq zonası — qonaqların tədbirdən sonra da xatırlayacağı detallardır.",
  },
];

export default function IdeyalarPage() {
  return (
    <main>
      <div className="mx-auto max-w-[1536px] px-6 pt-28 pb-2 sm:pt-32">
        <span className="script-label">Fikirlər</span>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Ad günü dekoru üçün 10 ilhamverici fikir
        </h1>
      </div>

      <article className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-6">
          <p className="leading-relaxed text-muted">
            Bakıda ad günü dekoru seçərkən ən çox soruşulan sual budur: “Hansı
            fikir bizim tədbirimizə uyğun olar?” Aşağıda, 600+ tədbir
            təcrübəmizdən topladığımız 10 fikri sizinlə bölüşürük. İstəyinizə
            uyğun olanı seçin, ya da bir neçəsini birləşdirək —{" "}
            <Link href="/elaqe" className="font-semibold text-rose hover:underline">
              bizimlə əlaqə saxlayın
            </Link>{" "}
            və konsultasiya pulsuzdur.
          </p>

          <div className="mt-10 space-y-9">
            {IDEAS.map((idea) => (
              <div key={idea.title}>
                <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                  {idea.title}
                </h2>
                <p className="mt-2 leading-relaxed text-muted">{idea.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl bg-cream p-8 text-center sm:p-10">
            <h3 className="font-display text-2xl font-bold tracking-tight">
              Bu fikirlərdən hansı sizə uyğundur?
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-muted">
              Nümunələrimizə{" "}
              <Link href="/qalereya" className="font-semibold text-rose hover:underline">
                qalereyada
              </Link>{" "}
              baxın, ya da{" "}
              <Link href="/qiymetler" className="font-semibold text-rose hover:underline">
                paketlərimizi
              </Link>{" "}
              nəzərdən keçirin.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-rose px-8 py-3.5 font-display text-sm font-semibold text-white transition-all duration-300 ease-out hover:scale-105 hover:bg-rose-dark"
            >
              WhatsApp ilə yazın
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
