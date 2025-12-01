import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { hostname: 'via.placeholder.com' },
      { hostname: 'img5a.flixcart.com' },
      { hostname: 'img6a.flixcart.com' },
      { hostname: 'cdn.pixabay.com' },
      { hostname: 'i.pinimg.com' },
      { hostname: 'www.freepik.com' },
      { hostname: 'media.istockphoto.com' },
      { hostname: 'm.media-amazon.com' },
      { hostname: 'images.pexels.com' },
    ],
    qualities: [75, 100],  // Add configured qualities
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.dev https://*.clerk.accounts.dev https://challenges.cloudflare.com; worker-src 'self' blob:; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' http://localhost:4000 https://*.clerk.dev https://*.clerk.accounts.dev https://challenges.cloudflare.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

