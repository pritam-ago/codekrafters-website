import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.pravatar.cc"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'imgs.search.brave.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
