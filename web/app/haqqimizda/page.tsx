import type { Metadata } from "next";
import About from "@/components/About";
import WhyUs from "@/components/WhyUs";

export const metadata: Metadata = {
  title: "Haqqımızda — Ad Günü Dekoru Təcrübəmiz",
  description:
    "Ad Günü Dekor — Bakıda tədbir dekorasiyası. 600+ tədbir təcrübəsi, fərdi dizayn, vaxtında təhvil və şəffaf qiymət.",
  alternates: { canonical: "/haqqimizda" },
};

export default function HaqqimizdaPage() {
  return (
    <main>
      <div className="mx-auto max-w-[1536px] px-6 pt-28 pb-2 sm:pt-32">
        <span className="script-label">Haqqımızda</span>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Ad Günü Dekor haqqında — Bakıda tədbir dekorasiyası təcrübəmiz
        </h1>
      </div>
      <About />
      <WhyUs />
    </main>
  );
}
