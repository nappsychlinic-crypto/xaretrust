import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.xaregrowth.com',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
