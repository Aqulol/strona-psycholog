import type { NextConfig } from "next";

/**
 * Konfiguracja Next.js 15 – eksport statyczny (output: "export").
 * Gotowy build trafia do katalogu `out/` jako czyste pliki HTML/CSS/JS,
 * które wgrywa się na Firebase Hosting (firebase deploy --only hosting).
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
