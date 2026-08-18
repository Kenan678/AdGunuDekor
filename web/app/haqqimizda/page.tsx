import type { Metadata } from "next";
import About from "@/components/About";
import WhyUs from "@/components/WhyUs";

export const metadata: Metadata = {
  title: "Haqqımızda",
  description:
    "Ad Günü Dekor — Bakıda tədbir dekorasiyası. 600+ tədbir təcrübəsi, fərdi dizayn, vaxtında təhvil və şəffaf qiymət.",
  alternates: { canonical: "/haqqimizda" },
};

export default function HaqqimizdaPage() {
  return (
    <main>
      <div className="h-20" aria-hidden />
      <About />
      <WhyUs />
    </main>
  );
}
