import Link from 'next/link';
import { createClient } from '@/db/supabase/client';
import type { AndroidApp } from '@/db/supabase/types';

import SearchForm from '@/components/home/SearchForm';
import BasePagination from '@/components/page/BasePagination';

const ANDROID_PAGE_SIZE = 24;

export default async function AndroidList({ pageNum, locale }: { pageNum?: string; locale?: string }) {
  const supabase = createClient();
  const currentPage = pageNum ? Number(pageNum) : 1;
  const start = (currentPage - 1) * ANDROID_PAGE_SIZE;
  const end = start + ANDROID_PAGE_SIZE - 1;

  const { data, count } = await supabase
    .from('android_app')
    .select('name,title,icon_url,content,category,created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(start, end);

  const list = (data || []) as AndroidApp[];

  const site = process.env.NEXT_PUBLIC_SITE_URL || '';
  const langPrefix = locale && locale !== 'en' ? `/${locale}` : '';
  const pagePath = pageNum ? `/android/page/${encodeURIComponent(pageNum)}` : '/android';

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Android Apps',
    description: 'Discover curated Android apps with safe, direct downloads. Get the latest versions free on Nav ai.',
    url: site ? `${site}${langPrefix}${pagePath}` : undefined,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: list.map((item, i) => ({
        '@type': 'ListItem',
        position: start + i + 1,
        url: site ? `${site}${langPrefix}/android/${encodeURIComponent(item.name)}` : undefined,
        name: item.title,
        image: item.icon_url || undefined,
      })),
    },
  } as any;

  return (
    <div className='mx-auto w-full max-w-pc px-3 pb-16 lg:pb-24'>
      <script
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
      <div className='my-5 flex flex-col gap-1 text-center lg:my-10 lg:gap-3'>
        <h1 className='text-2xl lg:text-5xl'>Android Apps</h1>
        <h2 className='text-xs text-black/70 lg:text-sm'>Curated Android software you can download safely.</h2>
      </div>
      <div className='mb-6 flex w-full items-center justify-center lg:mb-8'>
        <SearchForm />
      </div>

      {list.length === 0 ? (
        <div className='py-20 text-center text-black/60'>No apps yet.</div>
      ) : (
        <>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
            {list.map((item) => (
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
                  <h3 className='min-w-0 truncate text-base font-semibold leading-6 text-black group-hover:opacity-80'>
                    {item.title}
                  </h3>
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
          <BasePagination
            currentPage={currentPage}
            pageSize={ANDROID_PAGE_SIZE}
            total={count || 0}
            route='/android'
            subRoute='/page'
            className='my-5 lg:my-10'
          />
        </>
      )}
    </div>
  );
}
