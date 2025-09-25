import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'img5a.flixcart.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'img6a.flixcart.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
