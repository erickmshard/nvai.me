import { getTranslations } from 'next-intl/server';

import SearchForm from '@/components/home/SearchForm';

import TutorialsList from './TutorialsList';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  const t = await getTranslations('Tutorials');
  return (
    <div className='w-full pb-12 lg:pb-16'>
      <div className='my-5 flex flex-col gap-1 text-balance text-center lg:my-10 lg:gap-3'>
        <h1 className='text-2xl lg:text-5xl'>{t('title')}</h1>
        {t('subTitle') ? <h2 className='text-xs lg:text-sm'>{t('subTitle')}</h2> : null}
      </div>
      <div className='mb-6 flex w-full items-center justify-center lg:mb-8'>
        <SearchForm />
      </div>
      <TutorialsList />
    </div>
  );
}
