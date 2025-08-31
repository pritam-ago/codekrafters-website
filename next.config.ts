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
    ],
  },
};

export default nextConfig;
