import type { MetadataRoute } from "next";

// Bu fayl saytı "Ana ekrana əlavə et" ilə tətbiq kimi quraşdırıla bilən edir.
// Xüsusilə admin panelini telefonda ayrıca ikon kimi açmaq üçün nəzərdə tutulub.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ad Günü Dekor — Admin",
    short_name: "AGD Admin",
    description: "Ad Günü Dekor sayt idarəetmə paneli",
    start_url: "/admin",
    scope: "/",
    display: "standalone",
    background_color: "#efeeec",
    theme_color: "#376c6c",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
