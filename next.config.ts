import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

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
      // For testing purposes
      {
        protocol: 'https',
        hostname: 'picsum.photos',
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
      {
        protocol: 'https',
        hostname: 'dl-web.dropbox.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.better-auth.com',
        port: '',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
