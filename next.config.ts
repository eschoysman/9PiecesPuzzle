import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  /* config options here */
    // output: 'export',
    experimental: {
        cssChunking: true
    }
};

export default nextConfig;
