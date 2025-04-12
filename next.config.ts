
import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;




