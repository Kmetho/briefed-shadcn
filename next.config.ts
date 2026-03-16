import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://42v3x39ukm.ufs.sh/f/**")],
  },
};

export default nextConfig;
