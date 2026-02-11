import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "**.onrender.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "galyan.in",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "**.galyan.in",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
