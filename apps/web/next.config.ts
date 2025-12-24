import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../../"),
  // Disable static page generation for error pages
  generateBuildId: async () => {
    return "build";
  },
};

export default nextConfig;
