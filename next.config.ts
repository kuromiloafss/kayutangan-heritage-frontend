import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
    ],
    // Backend jalan di localhost (IP privat), jadi Next perlu diizinkan
    // mengambil gambar dari sana untuk optimizer gambar.
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;