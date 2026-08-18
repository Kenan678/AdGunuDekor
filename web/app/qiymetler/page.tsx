import type { Metadata } from "next";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import { fetchPricing } from "@/lib/api";

export const revalidate = 20;

export const metadata: Metadata = {
  title: "Qiymətlər — Büdcənizə uyğun paketlər",
  description:
    "Ad Günü Dekor-un qiymət paketləri: Mini Dekor, Tədbir Dekoru (Medium/Premium). Rəng seçimi, quraşdırma və konsultasiya daxildir.",
  alternates: { canonical: "/qiymetler" },
};

export default async function QiymetlerPage() {
  const packages = await fetchPricing();

  return (
    <main>
      <div className="h-20" aria-hidden />
      <Pricing packages={packages} />
      <Testimonials />
    </main>
  );
}
