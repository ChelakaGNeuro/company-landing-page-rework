import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   allowedDevOrigins: process.env.ALLOWED_DEV_ORIGIN
    ? process.env.ALLOWED_DEV_ORIGIN.split(',').map(s => s.trim())
    : [],
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};


export default nextConfig;
