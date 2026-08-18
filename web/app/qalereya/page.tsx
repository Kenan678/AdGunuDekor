import type { Metadata } from "next";
import GallerySection from "@/components/GallerySection";
import StatsCta from "@/components/StatsCta";
import { fetchGallery } from "@/lib/api";

export const revalidate = 20;

export const metadata: Metadata = {
  title: "Qalereya — Tamamlanmış tədbirlər",
  description:
    "Ad Günü Dekor-un tamamladığı tədbirlərdən şəkillər: 1 yaş, uşaq və böyüklər ad günü, məzuniyyət, kiçik toy dekorları. Bakıda 600+ tədbir təcrübəsi.",
  alternates: { canonical: "/qalereya" },
};

export default async function QalereyaPage() {
  const images = await fetchGallery();

  return (
    <main>
      <div className="h-20" aria-hidden />
      <GallerySection images={images} />
      <StatsCta />
    </main>
  );
}
