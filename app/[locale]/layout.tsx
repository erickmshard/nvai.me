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
      <body className='relative mx-auto flex min-h-screen flex-col bg-gray-50 text-black'>
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

export const metadata: Metadata = {
  metadataBase: new URL(
    (process.env.NEXT_PUBLIC_SITE_URL as string) ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  ),
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
