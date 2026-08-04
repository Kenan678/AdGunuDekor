import Hero from "@/components/Hero";
import GreenBand from "@/components/GreenBand";
import About from "@/components/About";
import Services from "@/components/Services";
import StatsCta from "@/components/StatsCta";
import WhyUs from "@/components/WhyUs";
import GallerySection from "@/components/GallerySection";
import VideoSection from "@/components/VideoSection";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { fetchGallery, fetchPricing, fetchVideos } from "@/lib/api";

// Səhifə serverdə render olunur və 2 dəqiqədən bir yenilənir (ISR).
// Google botu hazır HTML görür → SEO üçün ideal.
export const revalidate = 20;

export default async function HomePage() {
  const [images, packages, videos] = await Promise.all([
    fetchGallery(),
    fetchPricing(),
    fetchVideos(),
  ]);

  // Google üçün structured data (LocalBusiness)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Ad Günü Dekor",
    description:
      "Bakıda ad günü və tədbir dekorasiyası — 1 yaş, uşaq və böyüklər ad günü, məzuniyyət və kiçik toy dekoru. Özəl dizayn və balon dekoru.",
    telephone: "+994702721555",
    image: `${siteUrl}/assets/og.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bakı",
      addressCountry: "AZ",
    },
    areaServed: { "@type": "City", name: "Bakı" },
    sameAs: ["https://www.instagram.com/adgunu_dekor1"],
    openingHours: "Mo-Su 08:00-02:00",
    priceRange: "₼₼",
    url: siteUrl,
    ...(packages.length > 0 && {
      makesOffer: packages.map((pkg) => ({
        "@type": "Offer",
        name: pkg.name,
        price: pkg.priceFrom,
        priceCurrency: "AZN",
      })),
    }),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <GreenBand />
      <About />
      <Services images={images} />
      <StatsCta />
      <WhyUs />
      <GallerySection images={images} />
      <VideoSection videos={videos} />
      <Pricing packages={packages} />
      <Testimonials />
      <Contact />
    </main>
  );
}
