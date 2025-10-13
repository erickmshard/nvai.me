import type { Metadata } from 'next';

import { RevalidateOneHour } from '@/lib/constants';

import WindowsList from './WindowsList';

export const revalidate = RevalidateOneHour;

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <WindowsList locale={locale} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Windows Software – Free Latest Downloads | Nav ai';
  const description =
    'Discover curated Windows apps with safe, direct downloads. Get the latest versions free on Nav ai.';

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      url: '/windows',
      title,
      description,
      siteName: 'Nav ai Directory',
      images: ['/images/tap4-ai.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/tap4-ai.png'],
    },
    alternates: {
      canonical: '/windows',
    },
  };
}
