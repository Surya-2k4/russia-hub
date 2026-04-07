import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias.canvas = false;
    }
    return config;
  },
  // Satisfy Next.js 16 requirement when webpack config is present
  // @ts-ignore - Turbopack config is required for build in this environment
  turbopack: {
    resolveAlias: {
      canvas: './src/lib/mock-canvas.js',
    },
  },
};

export default nextConfig;
