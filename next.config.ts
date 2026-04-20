import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
  serverExternalPackages: ["mongoose"],
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "http://217.154.115.9:4501/uploads/:path*",
      },
      {
        source: "/assets/images/:path*",
        destination: "http://217.154.115.9:4501/assets/images/:path*",
      },
      {
        source: "/assets/productImages/:path*",
        destination: "http://217.154.115.9:4501/assets/productImages/:path*",
      },
      {
        source: "/assets/profilePicture/:path*",
        destination: "http://217.154.115.9:4501/assets/profilePicture/:path*",
      },
    ];
  },
  async redirects() {
    // /products was the old catalog URL — the entire catalog moved to
    // /litbuy-spreadsheet for the exact-keyword match. 301 so Google
    // passes signals to the new canonical URL.
    return [
      {
        source: "/products",
        destination: "/litbuy-spreadsheet",
        permanent: true,
      },
      {
        source: "/products/:slug",
        destination: "/litbuy-spreadsheet/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
