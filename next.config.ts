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
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
