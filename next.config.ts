import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
  images: {
    remotePatterns: [new URL('https://falcon-crm.s3.me-central-1.amazonaws.com/**')],
  },
};

export default nextConfig;
