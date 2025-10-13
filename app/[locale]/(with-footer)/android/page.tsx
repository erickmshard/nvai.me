import type { Metadata } from 'next';

import { RevalidateOneHour } from '@/lib/constants';

import AndroidList from './AndroidList';

export const revalidate = RevalidateOneHour;

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <AndroidList locale={locale} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Android Apps – Free Latest Downloads | Nav ai';
  const description =
    'Discover curated Android apps with safe, direct downloads. Get the latest versions free on Nav ai.';

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      url: '/android',
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
      canonical: '/android',
    },
  };
}
