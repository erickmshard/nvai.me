import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/db/supabase/client';
import type { NavigationCategory } from '@/db/supabase/types';
import { getTranslations } from 'next-intl/server';

import { RevalidateOneHour } from '@/lib/constants';
import { Separator } from '@/components/ui/separator';
import Empty from '@/components/Empty';
import Faq from '@/components/Faq';
import TutorialRowList from '@/components/tutorials/TutorialRowList';
import WebNavCardList from '@/components/webNav/WebNavCardList';

import { TagList } from '../../Tag';
import Loading from './loading';

export async function generateMetadata({
  params: { locale, search },
}: {
  params: { locale: string; search?: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.home',
  });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      type: 'website',
      url: `/query/${encodeURIComponent(search || '')}`,
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
      canonical: `/query/${encodeURIComponent(search || '')}`,
    },
  };
}

export const revalidate = RevalidateOneHour / 2;

export default async function Page({ params }: { params: { search?: string } }) {
  const supabase = createClient();
  const t = await getTranslations('Home');
  const { data: categoryList } = await supabase.from('navigation_category').select();
  const keyword = decodeURI(params?.search || '');

  const { data: dataList } = await supabase.from('web_navigation').select().ilike('detail', `%${keyword}%`).limit(24);

  const { data: tutorialList } = await supabase
    .from('tutorials')
    .select('id, slug, title, summary, cover_url, updated_at')
    .or(`title.ilike.%${keyword}%,summary.ilike.%${keyword}%`)
    .limit(12);

  const { data: androidList } = await supabase
    .from('android_app')
    .select('name,title,icon_url,content,category,created_at')
    .or(`title.ilike.%${keyword}%,content.ilike.%${keyword}%`)
    .limit(12);

  const { data: macList } = await supabase
    .from('mac_app')
    .select('name,title,icon_url,content,category,created_at')
    .or(`title.ilike.%${keyword}%,content.ilike.%${keyword}%`)
    .limit(12);

  const { data: windowsList } = await supabase
    .from('windows_app')
    .select('name,title,icon_url,content,category,created_at')
    .or(`title.ilike.%${keyword}%,content.ilike.%${keyword}%`)
    .limit(12);

  const categoryTags = (categoryList ?? []).map((item: NavigationCategory) => ({
    id: String(item.id),
    name: item.name,
    href: `/category/${item.name}`,
  }));
  const androidItems = androidList ?? [];
  const macItems = macList ?? [];
  const windowsItems = windowsList ?? [];

  return (
    <Suspense fallback={<Loading />}>
      <div className='mb-10 mt-5'>{params?.search ? <TagList data={categoryTags} /> : null}</div>
      <section className='flex flex-col gap-6'>
        {params?.search ? (
          <>
            {dataList && dataList.length > 0 ? (
              <div>
                <h2 className='mb-2 text-left text-[18px] lg:text-2xl'>{t('result')}</h2>
                <WebNavCardList dataList={dataList!} />
              </div>
            ) : null}

            {tutorialList && tutorialList.length > 0 ? (
              <div>
                <div className='mb-2 flex items-center justify-between'>
                  <h3 className='text-left text-[16px] font-semibold lg:text-xl'>Tutorials</h3>
                  <Link href='/tutorials' className='text-xs text-black/60 hover:opacity-80 lg:text-sm'>
                    View all
                  </Link>
                </div>
                <TutorialRowList dataList={tutorialList as any} />
              </div>
            ) : null}

            {androidItems.length > 0 ? (
              <div>
                <div className='mb-2 flex items-center justify-between'>
                  <h3 className='text-left text-[16px] font-semibold lg:text-xl'>Android</h3>
                  <Link href='/android' className='text-xs text-black/60 hover:opacity-80 lg:text-sm'>
                    View all
                  </Link>
                </div>
                <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
                  {androidItems.map((item: any) => (
                    <Link
                      key={item.name}
                      href={`/android/${encodeURIComponent(item.name)}`}
                      className='group flex h-28 items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-sm focus-visible:shadow-md focus-visible:outline-none lg:h-32'
                    >
                      <img
                        src={item.icon_url || '/favicon.ico'}
                        alt={item.title}
                        width={56}
                        height={56}
                        loading='lazy'
                        decoding='async'
                        className='h-14 w-14 shrink-0 rounded-lg border border-gray-200 bg-gray-50 object-cover'
                      />
                      <div className='min-w-0 flex-1'>
                        <h4 className='min-w-0 truncate text-base font-semibold leading-6 text-black group-hover:opacity-80'>
                          {item.title}
                        </h4>
                        {item.category ? (
                          <span className='mt-1 inline-flex h-6 max-w-full items-center truncate rounded-full border border-gray-200 bg-gray-50 px-2 text-xs leading-6 text-black/70'>
                            {item.category}
                          </span>
                        ) : null}
                        <p className='mt-1 line-clamp-2 text-sm leading-snug text-black/70'>{item.content}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {macItems.length > 0 ? (
              <div>
                <div className='mb-2 flex items-center justify-between'>
                  <h3 className='text-left text-[16px] font-semibold lg:text-xl'>Mac</h3>
                  <Link href='/mac' className='text-xs text-black/60 hover:opacity-80 lg:text-sm'>
                    View all
                  </Link>
                </div>
                <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
                  {macItems.map((item: any) => (
                    <Link
                      key={item.name}
                      href={`/mac/${encodeURIComponent(item.name)}`}
                      className='group flex h-28 items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-sm focus-visible:shadow-md focus-visible:outline-none lg:h-32'
                    >
                      <img
                        src={item.icon_url || '/favicon.ico'}
                        alt={item.title}
                        width={56}
                        height={56}
                        loading='lazy'
                        decoding='async'
                        className='h-14 w-14 shrink-0 rounded-lg border border-gray-200 bg-gray-50 object-cover'
                      />
                      <div className='min-w-0 flex-1'>
                        <h4 className='min-w-0 truncate text-base font-semibold leading-6 text-black group-hover:opacity-80'>
                          {item.title}
                        </h4>
                        {item.category ? (
                          <span className='mt-1 inline-flex h-6 max-w-full items-center truncate rounded-full border border-gray-200 bg-gray-50 px-2 text-xs leading-6 text-black/70'>
                            {item.category}
                          </span>
                        ) : null}
                        <p className='mt-1 line-clamp-2 text-sm leading-snug text-black/70'>{item.content}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {windowsItems.length > 0 ? (
              <div>
                <div className='mb-2 flex items-center justify-between'>
                  <h3 className='text-left text-[16px] font-semibold lg:text-xl'>Windows</h3>
                  <Link href='/windows' className='text-xs text-black/60 hover:opacity-80 lg:text-sm'>
                    View all
                  </Link>
                </div>
                <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
                  {windowsItems.map((item: any) => (
                    <Link
                      key={item.name}
                      href={`/windows/${encodeURIComponent(item.name)}`}
                      className='group flex h-28 items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-sm focus-visible:shadow-md focus-visible:outline-none lg:h-32'
                    >
                      <img
                        src={item.icon_url || '/favicon.ico'}
                        alt={item.title}
                        width={56}
                        height={56}
                        loading='lazy'
                        decoding='async'
                        className='h-14 w-14 shrink-0 rounded-lg border border-gray-200 bg-gray-50 object-cover'
                      />
                      <div className='min-w-0 flex-1'>
                        <h4 className='min-w-0 truncate text-base font-semibold leading-6 text-black group-hover:opacity-80'>
                          {item.title}
                        </h4>
                        {item.category ? (
                          <span className='mt-1 inline-flex h-6 max-w-full items-center truncate rounded-full border border-gray-200 bg-gray-50 px-2 text-xs leading-6 text-black/70'>
                            {item.category}
                          </span>
                        ) : null}
                        <p className='mt-1 line-clamp-2 text-sm leading-snug text-black/70'>{item.content}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {!(
              (dataList && dataList.length) ||
              (tutorialList && tutorialList.length) ||
              androidItems.length ||
              macItems.length ||
              windowsItems.length
            ) ? (
              <Empty title={t('empty')} />
            ) : null}
          </>
        ) : (
          <Empty title={t('empty')} />
        )}
      </section>
      <Separator className='mx-auto my-10 h-px w-4/5 bg-[#2C2D36] lg:my-16' />
      <Faq />
    </Suspense>
  );
}
