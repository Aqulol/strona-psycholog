import path from "path";
import type { NextConfig } from "next";

/**
 * Konfiguracja Next.js 15 – eksport statyczny (output: "export").
 * Gotowy build trafia do katalogu `out/` jako czyste pliki HTML/CSS/JS,
 * które wgrywa się na Firebase Hosting (firebase deploy --only hosting).
 */
const nextConfig: NextConfig = {
  output: "export",
  // Workspace root wprost wskazany — zapobiega warningowi
  // "Next.js inferred your workspace root" u wlasciciela (Windows:
  // package-lock.json lezy tez w katalogu domowym, Next myli root).
  outputFileTracingRoot: path.join(__dirname),
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
