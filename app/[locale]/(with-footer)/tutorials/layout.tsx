import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.tutorials',
  });

  return {
    title: t('title'),
    description: t('description'),
    // keywords intentionally omitted per requirement
    openGraph: {
      type: 'website',
      url: '/tutorials',
      title: t('title'),
      description: t('description'),
      siteName: 'Nav ai Directory',
      images: ['/images/tap4-ai.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/images/tap4-ai.png'],
    },
    alternates: {
      canonical: '/tutorials',
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className='flex-y-center mx-auto w-full max-w-pc px-3'>{children}</div>;
}
