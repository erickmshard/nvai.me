import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createPublicClient } from '@/db/supabase/publicClient';
import dayjs from 'dayjs';

import BaseImage from '@/components/image/BaseImage';
import MarkdownProse from '@/components/MarkdownProse';
import LatestAppsGrid from '@/components/sections/LatestAppsGrid';

export async function generateMetadata({ params: { name } }: { params: { name: string } }): Promise<Metadata> {
  const supabase = createPublicClient(1800);
  const { data } = await supabase.from('android_app').select('title,content,icon_url').eq('name', name).maybeSingle();
  if (!data) return {};
  const baseTitle = `${data.title} Download for Android (Latest) | Nav ai`;
  const descRaw = `${data.content ? `${data.content} ` : ''}Download the latest version of ${data.title} for Android for free. Safe direct download via Nav ai.`;
  const description = descRaw.length > 160 ? `${descRaw.slice(0, 157)}...` : descRaw;
  const image = data.icon_url || undefined;
  return {
    title: baseTitle,
    description,
    alternates: { canonical: `/android/${encodeURIComponent(name)}` },
    openGraph: {
      type: 'website',
      url: `/android/${encodeURIComponent(name)}`,
      title: baseTitle,
      description,
      siteName: 'Nav ai',
      images: image ? [image] : ['/images/tap4-ai.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: baseTitle,
      description,
      images: image ? [image] : ['/images/tap4-ai.png'],
    },
  };
}

export default async function Page({ params: { name } }: { params: { name: string } }) {
  const supabase = createPublicClient(1800);
  const { data } = await supabase.from('android_app').select('*').eq('name', name).maybeSingle();
  if (!data) {
    notFound();
  }

  const created = data.created_at ? dayjs(data.created_at).format('YYYY-MM-DD') : undefined;

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: data.title,
    operatingSystem: 'Android',
    applicationCategory: 'MobileApplication',
    offers: undefined,
    downloadUrl: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/dl-android?name=${encodeURIComponent(data.name)}`,
    image: data.icon_url || undefined,
    description: data.content || undefined,
  };

  return (
    <div className='relative w-full bg-gray-50 text-black'>
      <div className='mx-auto w-full max-w-pc px-3 py-6 lg:px-0 lg:py-10'>
        <script
          type='application/ld+json'
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
        />
        <div className='rounded-2xl border border-gray-200 bg-white p-4 lg:p-6'>
          <div className='flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between'>
            <div className='flex items-center gap-3'>
              <BaseImage
                title={data.title}
                alt={data.title}
                src={data.icon_url || ''}
                width={56}
                height={56}
                className='h-14 w-14 rounded-lg border border-gray-200 bg-gray-50 object-cover'
              />
              <div>
                <h1 className='text-2xl text-black lg:text-4xl'>{data.title}</h1>
                <div className='mt-1 flex flex-wrap items-center gap-2 text-xs text-black/60'>
                  {data.category ? (
                    <span className='inline-flex h-6 items-center rounded-full border border-gray-200 bg-gray-50 px-2 leading-6'>
                      {data.category}
                    </span>
                  ) : null}
                  {created ? <span>Added: {created}</span> : null}
                </div>
              </div>
            </div>
            <a
              href={`/api/dl-android?name=${encodeURIComponent(data.name)}`}
              target='_blank'
              rel='noreferrer noopener nofollow'
              className='inline-flex min-h-5 items-center gap-1 rounded-[8px] bg-gradient-to-r from-indigo-500 to-blue-600 px-4 py-2 text-sm capitalize text-white shadow-lg transition duration-300 ease-in-out hover:-translate-y-0.5 hover:opacity-95'
            >
              Download
            </a>
          </div>
          {data.content ? (
            <p className='mt-3 max-w-[880px] text-sm leading-relaxed text-black/70 lg:text-base'>{data.content}</p>
          ) : null}
        </div>
        <div className='mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]'>
          <section className='rounded-2xl border border-gray-200 bg-white p-4 lg:p-6'>
            <MarkdownProse markdown={data.detail || ''} className='prose-lg' />
          </section>
          <aside className='space-y-4 lg:sticky lg:top-24'>
            <div className='rounded-2xl border border-gray-200 bg-white p-4'>
              <h3 className='text-sm font-semibold text-black/80'>App Info</h3>
              <dl className='mt-2 space-y-2 text-sm text-black/70'>
                {data.category ? (
                  <div className='flex items-center justify-between gap-3'>
                    <dt className='text-black/60'>Category</dt>
                    <dd className='truncate'>{data.category}</dd>
                  </div>
                ) : null}
                {created ? (
                  <div className='flex items-center justify-between gap-3'>
                    <dt className='text-black/60'>Added</dt>
                    <dd>{created}</dd>
                  </div>
                ) : null}
              </dl>
              <a
                href={`/api/dl-android?name=${encodeURIComponent(data.name)}`}
                target='_blank'
                rel='noreferrer noopener nofollow'
                className='mt-3 inline-flex min-h-5 items-center gap-1 rounded-[8px] border border-gray-300 bg-white px-3 py-1 text-xs text-black/80 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-sm'
              >
                Download
              </a>
            </div>
          </aside>
        </div>
      </div>
      {/* Latest in Android */}
      <Suspense>
        <LatestAppsGrid platform='android' excludeName={data.name} moreHref='/android' title='Latest Android Apps' />
      </Suspense>
    </div>
  );
}
