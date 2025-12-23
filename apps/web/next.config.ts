import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../.."),
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
