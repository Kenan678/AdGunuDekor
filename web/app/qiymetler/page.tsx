import type { Metadata } from "next";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import { fetchPricing } from "@/lib/api";

export const revalidate = 20;

export const metadata: Metadata = {
  title: "Qiymətlər — Ad Günü Dekoru Paketləri",
  description:
    "Ad Günü Dekor-un qiymət paketləri: Mini Dekor, Tədbir Dekoru (Medium/Premium). Rəng seçimi, quraşdırma və konsultasiya daxildir.",
  alternates: { canonical: "/qiymetler" },
};

export default async function QiymetlerPage() {
  const packages = await fetchPricing();

  return (
    <main>
      <div className="mx-auto max-w-[1536px] px-6 pt-28 pb-2 sm:pt-32">
        <span className="script-label">Qiymətlər</span>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Ad günü dekoru qiymətləri — Bakıda büdcənizə uyğun paketlər
        </h1>
      </div>
      <Pricing packages={packages} />
      <Testimonials />
    </main>
  );
}
