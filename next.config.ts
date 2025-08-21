import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "kalki.gumlet.io",
      "5.imimg.com",
      "www.samyakk.com",
          "media.istockphoto.com",
      "encrypted-tbn0.gstatic.com",
      "t3.ftcdn.net",
      "www.cbazaar.com",
      "pinkchick.in",
      "clothsvilla.com",
      "www.blogswow.com",
      "blogproxy.andaazfashion.com",
      "example.com",
      "in.kalkifashion.com",
      "cdn.shopify.com",
      "res.cloudinary.com",
      "scontent.cdninstagram.com"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS domains
      },
      {
        protocol: "http",
        hostname: "**", // Allow all HTTP domains
      }
    ],
  },
};

export default nextConfig;
