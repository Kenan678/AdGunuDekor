import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Əlaqə — Ad Günü Dekoru Sifarişi",
  description:
    "Ad Günü Dekor ilə əlaqə: WhatsApp, Instagram və telefon. Bakı və ətraf rayonlarda xidmət göstəririk, ilk konsultasiya pulsuzdur.",
  alternates: { canonical: "/elaqe" },
};

export default function ElaqePage() {
  return (
    <main>
      <div className="mx-auto max-w-[1536px] px-6 pt-28 pb-2 sm:pt-32">
        <span className="script-label">Əlaqə</span>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Ad günü dekoru üçün bizimlə əlaqə saxlayın — Bakı
        </h1>
      </div>
      <Contact />
    </main>
  );
}
