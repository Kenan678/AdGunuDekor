import type { Metadata } from "next";
import GallerySection from "@/components/GallerySection";
import StatsCta from "@/components/StatsCta";
import { fetchGallery } from "@/lib/api";

export const revalidate = 20;

export const metadata: Metadata = {
  title: "Qalereya — Ad Günü Dekoru Nümunələri",
  description:
    "Ad Günü Dekor-un tamamladığı tədbirlərdən şəkillər: 1 yaş, uşaq və böyüklər ad günü, məzuniyyət, kiçik toy dekorları. Bakıda 600+ tədbir təcrübəsi.",
  alternates: { canonical: "/qalereya" },
};

export default async function QalereyaPage() {
  const images = await fetchGallery();

  return (
    <main>
      <div className="mx-auto max-w-[1536px] px-6 pt-28 pb-2 sm:pt-32">
        <span className="script-label">Qalereya</span>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Bakıda ad günü dekoru — tamamladığımız tədbirlər
        </h1>
      </div>
      <GallerySection images={images} />
      <StatsCta />
    </main>
  );
}
