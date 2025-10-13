import type { Metadata } from 'next';
import { getMessages } from 'next-intl/server';

import { Toaster } from '@/components/ui/sonner';
import GoogleAdScript from '@/components/ad/GoogleAdScript';
import Navigation from '@/components/home/Navigation';
import ClientIntlProvider from '@/components/intl/ClientIntlProvider';
import SeoScript from '@/components/seo/SeoScript';

import './globals.css';

import { Suspense } from 'react';

import Loading from './loading';

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className=''>
      <body className='relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 text-black'>
        <ClientIntlProvider locale={locale} messages={messages}>
          <Toaster
            position='top-center'
            toastOptions={{
              classNames: {
                error: 'bg-red-400',
                success: 'text-green-400',
                warning: 'text-yellow-400',
                info: 'bg-blue-400',
              },
            }}
          />
          <Navigation />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ClientIntlProvider>
        <SeoScript />
        <GoogleAdScript />
      </body>
    </html>
  );
}

function resolveBaseUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL as string | undefined;
  if (fromEnv && /^https?:\/\//i.test(fromEnv)) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

export const metadata: Metadata = {
  metadataBase: new URL(resolveBaseUrl()),
  icons: { icon: '/favicon.ico' },
  openGraph: {
    type: 'website',
    siteName: 'Nav ai Directory',
    images: ['/images/tap4-ai.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/tap4-ai.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};
