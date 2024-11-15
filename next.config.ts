import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://petheven-api.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
