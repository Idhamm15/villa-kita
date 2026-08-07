import type { NextConfig } from "next";

const appUrl =
  process.env.NEXT_APP_URL ||
  process.env.NEXT_PUBLIC_URL?.replace(/\/api$/, "") ||
  "http://localhost:3000";

const parsedAppUrl = new URL(appUrl);

const remotePattern: any = {
  protocol: parsedAppUrl.protocol.replace(":", ""),
  hostname: parsedAppUrl.hostname,
  pathname: "/uploads/**",
};

if (parsedAppUrl.port) {
  remotePattern.port = parsedAppUrl.port;
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      remotePattern,
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;