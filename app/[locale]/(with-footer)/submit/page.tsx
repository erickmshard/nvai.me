import React from 'react';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import Faq from '@/components/Faq';

import SubmitForm from './SubmitForm';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const [meta, submit] = await Promise.all([
    getTranslations({ locale, namespace: 'Metadata.submit' }),
    getTranslations({ locale, namespace: 'Submit' }),
  ]);

  return {
    title: meta('title'),
    description: submit('subTitle'),
    openGraph: {
      type: 'website',
      url: '/submit',
      title: meta('title'),
      description: submit('subTitle'),
      siteName: 'Nav ai Directory',
      images: ['/images/tap4-ai.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta('title'),
      description: submit('subTitle'),
      images: ['/images/tap4-ai.png'],
    },
    alternates: {
      canonical: '/submit',
    },
  };
}

export default function Page() {
  const t = useTranslations('Submit');

  return (
    <div className='mx-auto max-w-pc'>
      <div className='flex-y-center my-3 flex lg:my-10'>
        <h1 className='text-5xl font-bold'>{t('title')}</h1>
        <h2 className='mt-[5px] text-sm font-bold lg:my-3'>{t('subTitle')}</h2>
        <SubmitForm />
      </div>
      <Faq />
    </div>
  );
}
