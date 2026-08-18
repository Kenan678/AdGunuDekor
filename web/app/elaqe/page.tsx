import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Əlaqə — Tədbirinizi planlaşdıraq",
  description:
    "Ad Günü Dekor ilə əlaqə: WhatsApp, Instagram və telefon. Bakı və ətraf rayonlarda xidmət göstəririk, ilk konsultasiya pulsuzdur.",
  alternates: { canonical: "/elaqe" },
};

export default function ElaqePage() {
  return (
    <main>
      <div className="h-20" aria-hidden />
      <Contact />
    </main>
  );
}
