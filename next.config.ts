import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    position: 'bottom-right',
  },
  images: {
    remotePatterns: [
      // For testing purposes
      {
        protocol: 'https',
        hostname: 'cdn.shadcnstudio.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '*.ufs.sh',
        port: '',
      },
    ],
  },
};

export default nextConfig;
