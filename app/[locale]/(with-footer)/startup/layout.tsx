import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Startup');
  const title = t('title');
  const description = t('subTitle');
  return {
    title,
    description,
    openGraph: {
      type: 'website',
      url: '/startup',
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
      canonical: '/startup',
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className='mx-auto w-full max-w-pc'>{children}</div>;
}
