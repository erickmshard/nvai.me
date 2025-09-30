import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/db/supabase/client';
import { CircleArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Separator } from '@/components/ui/separator';
import BaseImage from '@/components/image/BaseImage';
import MarkdownProse from '@/components/MarkdownProse';

export async function generateMetadata({
  params: { locale, websiteName },
}: {
  params: { locale: string; websiteName: string };
}): Promise<Metadata> {
  const supabase = createClient();
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.ai',
  });
  const { data } = await supabase.from('web_navigation').select().eq('name', websiteName);

  if (!data || !data[0]) {
    notFound();
  }

  return {
    title: `${data[0].title} | ${t('titleSubfix')}`,
    description: data[0].content,
  };
}

export default async function Page({ params: { websiteName } }: { params: { websiteName: string } }) {
  const supabase = createClient();
  const t = await getTranslations('Startup.detail');
  const { data: dataList } = await supabase.from('web_navigation').select().eq('name', websiteName);
  if (!dataList) {
    notFound();
  }
  const data = dataList[0];

  function hashToIndex(key: string, mod: number) {
    let h = 5381;
    for (let i = 0; i < key.length; i += 1) h = (h * 33) ^ key.charCodeAt(i);
    return Math.abs(h) % mod;
  }

  const ctaAccentCombos = [
    'from-rose-500 to-fuchsia-600',
    'from-pink-500 to-rose-600',
    'from-fuchsia-500 to-violet-600',
    'from-violet-500 to-indigo-600',
    'from-indigo-500 to-blue-600',
    'from-blue-500 to-sky-500',
    'from-sky-500 to-cyan-500',
    'from-cyan-500 to-teal-600',
    'from-teal-500 to-emerald-600',
    'from-emerald-500 to-lime-600',
    'from-lime-500 to-yellow-500',
    'from-yellow-500 to-amber-600',
    'from-amber-500 to-orange-600',
    'from-orange-500 to-red-600',
    'from-red-500 to-rose-600',
    'from-slate-600 to-slate-800',
  ];
  const key = (data.title || data.name) as string;
  const ctaAccent = ctaAccentCombos[hashToIndex(key, ctaAccentCombos.length)];

  return (
    <div className='relative w-full bg-gray-50 text-black'>
      <div className='mx-auto flex w-full max-w-pc flex-col px-3 py-5 lg:flex-row lg:justify-between lg:px-0 lg:py-10'>
        <div className='flex flex-col items-center lg:items-start'>
          <div className='max-w-[720px] space-y-1 text-balance lg:space-y-3'>
            <h1 className='text-2xl text-black lg:text-5xl'>{data.title}</h1>
            <p className='text-sm leading-relaxed text-black/80 lg:text-base'>{data.content}</p>
          </div>
          <a
            href={data.url}
            target='_blank'
            rel='noreferrer'
            className={`flex-center mt-5 min-h-5 w-full gap-1 rounded-[8px] bg-gradient-to-r ${ctaAccent} p-[10px] text-sm capitalize text-white shadow-lg transition duration-300 ease-in-out hover:-translate-y-0.5 hover:opacity-95 lg:mt-2 lg:w-[288px]`}
          >
            {t('visitWebsite')} <CircleArrowRight className='size-[14px]' />
          </a>
        </div>
        <a
          href={data.url}
          target='_blank'
          rel='noreferrer'
          className='flex-center group relative h-[171px] w-full flex-shrink-0 lg:h-[234px] lg:w-[466px]'
        >
          <BaseImage
            title={data.title}
            alt={data.title}
            fill
            src={data.thumbnail_url || ''}
            className='absolute mt-3 aspect-[466/234] w-full rounded-[16px] border border-gray-200 bg-gray-50 bg-cover lg:mt-0'
          />
          <div className='absolute inset-0 z-10 hidden items-center justify-center gap-1 rounded-[16px] bg-black/50 text-2xl text-white transition-all duration-200 group-hover:flex'>
            {t('visitWebsite')} <CircleArrowRight className='size-5' />
          </div>
        </a>
      </div>
      <Separator className='bg-gray-200' />
      <div className='mx-auto mb-5 w-full max-w-pc px-3 lg:px-0'>
        <h2 className='my-5 text-2xl text-black lg:my-10'>{t('introduction')}</h2>
        <MarkdownProse markdown={data?.detail || ''} className='prose-lg' />
      </div>
    </div>
  );
}
