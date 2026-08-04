import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ad Günü Dekor — Bakıda balon, foto zəng və masa dekoru",
    template: "%s | Ad Günü Dekor",
  },
  description:
    "Bakıda ad günü dekorasiyası: balon kompozisiyaları, foto zənglər və masa dekoru. 150+ hazırlanmış tədbir, 24 saat ərzində sifariş cavabı. İlk konsultasiya pulsuzdur.",
  keywords: [
    "ad günü dekoru",
    "balon dekoru",
    "foto zəng",
    "masa dekoru",
    "ad günü bəzədilməsi",
    "Bakı dekorasiya",
    "doğum günü dekoru",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "az_AZ",
    url: SITE_URL,
    siteName: "Ad Günü Dekor",
    title: "Ad Günü Dekor — Bakıda balon, foto zəng və masa dekoru",
    description:
      "Hər doğum günü unudulmaz bir səhnəyə çevrilsin. Balon, foto zəng və masa dekoru — Bakıda.",
    images: [{ url: "/assets/sample-masa.jpg", width: 1100, height: 733 }],
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
  themeColor: "#fff8f3",
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
