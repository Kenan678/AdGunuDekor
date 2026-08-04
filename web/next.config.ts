import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker/VPS deploy üçün əlverişli — bütün lazımi fayllar .next/standalone-a yığılır
  output: "standalone",
};

export default nextConfig;
