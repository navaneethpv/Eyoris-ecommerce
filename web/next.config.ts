import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'img5a.flixcart.com',
      'img6a.flixcart.com',
      'cdn.pixabay.com',
      'i.pinimg.com',
      'www.freepik.com',
      'media.istockphoto.com',
      'm.media-amazon.com',
      'images.pexels.com',
    ],
  },
};

export default nextConfig;
