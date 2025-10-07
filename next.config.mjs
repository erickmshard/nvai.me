import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const isWindows = process.platform === 'win32';
const isVercel = Boolean(process.env.VERCEL);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep tracing enabled on Vercel so required RSC manifests are bundled.
  // Only disable locally on Windows to avoid file locking issues.
  outputFileTracing: isVercel ? true : !isWindows,
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
