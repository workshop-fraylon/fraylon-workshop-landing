import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/acknowledgement",
        destination: "/Ackowledgement",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
