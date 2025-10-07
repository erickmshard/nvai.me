import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/db/supabase/client';

import { Separator } from '@/components/ui/separator';
import MarkdownProse from '@/components/MarkdownProse';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createClient();
  const { data } = await supabase.from('tutorials').select('*').eq('slug', slug).maybeSingle();
  if (!data) notFound();
  const desc = data.summary || (data.content_md || '').slice(0, 160);
  return {
    title: data.title,
    description: desc,
    // keywords intentionally omitted per requirement
    alternates: { canonical: `/tutorials/${encodeURIComponent(slug)}` },
    openGraph: {
      type: 'article',
      url: `/tutorials/${encodeURIComponent(slug)}`,
      title: data.title,
      description: desc,
      images: data.cover_url ? [data.cover_url] : ['/images/tap4-ai.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: desc,
      images: data.cover_url ? [data.cover_url] : ['/images/tap4-ai.png'],
    },
  };
}

export default async function TutorialDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data, error } = await supabase.from('tutorials').select('*').eq('slug', params.slug).single();

  if (error || !data) return notFound();

  const summary = data.summary || (data.content_md || '').slice(0, 140);

  return (
    <div className='relative w-full bg-gray-50 text-black'>
      <div className='mx-auto flex w-full max-w-pc flex-col px-3 py-5 lg:flex-row lg:justify-between lg:px-0 lg:py-10'>
        <div className='flex flex-col items-center lg:items-start'>
          <div className='max-w-[720px] space-y-1 text-balance lg:space-y-3'>
            <h1 className='text-2xl text-black lg:text-5xl'>{data.title}</h1>
            {summary ? <p className='text-sm leading-relaxed text-black/80 lg:text-base'>{summary}</p> : null}
          </div>
        </div>
        {data.cover_url ? (
          <div className='flex-center group relative h-[171px] w-full flex-shrink-0 lg:h-[234px] lg:w-[466px]'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.cover_url}
              alt={data.title}
              className='absolute mt-3 aspect-[466/234] w-full rounded-[16px] border border-gray-200 bg-gray-50 object-cover lg:mt-0'
            />
          </div>
        ) : null}
      </div>
      <Separator className='bg-gray-200' />
      <div className='mx-auto mb-5 w-full max-w-pc px-3 lg:px-0'>
        <MarkdownProse markdown={data?.content_md || ''} className='prose-lg' />
      </div>
    </div>
  );
}
