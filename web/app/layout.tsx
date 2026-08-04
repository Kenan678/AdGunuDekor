import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ad Günü Dekoru Bakı | Ad Günü və Tədbir Dekorasiyası — Ad Günü Dekor",
    template: "%s | Ad Günü Dekor",
  },
  description:
    "Bakıda ad günü dekoru və tədbir dekorasiyası. 1 yaş, uşaq və böyüklər ad günü, məzuniyyət, kiçik toy dekoru — özəl dizayn, gözəl balonlar. 600+ tədbir təcrübəsi. WhatsApp 7/24.",
  keywords: [
    "ad günü dekoru",
    "ad günü dekoru Bakı",
    "dekor Bakı",
    "tədbir dekorasiyası",
    "1 yaş dekoru",
    "uşaq ad günü dekoru",
    "doğum günü dekoru",
    "balon dekoru Bakı",
    "ad günü bəzədilməsi",
    "məzuniyyət dekoru",
    "kiçik toy dekoru",
    "foto zəng",
    "masa dekoru",
    "Bakı dekorasiya",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "az_AZ",
    url: SITE_URL,
    siteName: "Ad Günü Dekor",
    title: "Ad Günü Dekor — Bakıda tədbir dekorasiyası",
    description:
      "Tədbirlərinizi öz dizaynımızla özəl bəzəyirik. Siz sadəcə qonaqları qarşılayın, qalanı bizim işimizdir.",
    images: [{ url: "/assets/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ad Günü Dekor — Bakıda ad günü dekorasiyası",
    description:
      "Balon kompozisiyaları, foto zənglər və masa dekoru. İlk konsultasiya pulsuzdur.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#376c6c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="az">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Great+Vibes&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
