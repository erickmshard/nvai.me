import type { Metadata } from 'next';

import { RevalidateOneHour } from '@/lib/constants';

import MacList from './MacList';

export const revalidate = RevalidateOneHour;

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <MacList locale={locale} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Mac Software – Free Latest Downloads | Nav ai';
  const description = 'Discover curated Mac apps with safe, direct downloads. Get the latest versions free on Nav ai.';

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      url: '/mac',
      title,
      description,
      siteName: 'Nav ai',
      images: ['/images/tap4-ai.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/tap4-ai.png'],
    },
    alternates: {
      canonical: '/mac',
    },
  };
}
