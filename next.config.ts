import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    /** Cached optimized images TTL (seconds); reduces repeated Sharp work across deploys/clients */
    minimumCacheTTL: 60 * 60 * 24,
    qualities: [75, 85],
  },
};

export default nextConfig;
