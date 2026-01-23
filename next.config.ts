import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "cdn-images.dzcdn.net",
        pathname: "/images/**",
      },
      {
        protocol: 'https',
        hostname: 'tokuzl.net',
        port: '',
        pathname: '/**', // Mengizinkan semua folder gambar di dalam domain tersebut
      },
      {
        protocol: 'http', // Jaga-jaga kalau ada gambar yang masih pakai http
        hostname: 'tokuzl.net',
        port: '',
        pathname: '/**',
      },
      
    ],
  },
};



export default nextConfig;
