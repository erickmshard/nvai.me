import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Avoid writing trace files which can be locked on Windows
  outputFileTracing: false,
  env: {
    NEXT_BASE_API: process.env.NEXT_BASE_API,
  },
  eslint: {
    // Avoid blocking builds on ESLint plugin issues; run lint separately
    ignoreDuringBuilds: true,
  },
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.artiversehub.ai',
        port: '',
        pathname: '/**',
      },
    ],
  },
  productionBrowserSourceMaps: false,
};

export default withNextIntl(nextConfig);
