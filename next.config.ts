import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dd6ynagixvnkj.cloudfront.net',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
