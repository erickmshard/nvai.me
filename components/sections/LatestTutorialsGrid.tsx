import Link from 'next/link';
import { createPublicClient } from '@/db/supabase/publicClient';

type TutorialItem = {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  cover_url: string | null;
  updated_at: string;
};

export default async function LatestTutorialsGrid({
  excludeSlug,
  moreHref = '/tutorials',
  title = 'Latest Tutorials',
}: {
  excludeSlug?: string;
  moreHref?: string;
  title?: string;
}) {
  const supabase = createPublicClient(900);
  const { data } = await supabase
    .from('tutorials')
    .select('id, slug, title, summary, cover_url, updated_at')
    .order('updated_at', { ascending: false })
    .limit(10);

  const list = (data || [])
    .filter((item: TutorialItem) => (excludeSlug ? item.slug !== excludeSlug : true))
    .slice(0, 9) as TutorialItem[];

  if (!list.length) return null;

  return (
    <section className='mx-auto mb-12 w-full max-w-pc px-3 lg:mb-16 lg:px-0'>
      <div className='mb-3 mt-6 flex items-center justify-between lg:mt-8'>
        <h2 className='text-xl font-semibold text-black lg:text-2xl'>{title}</h2>
        <Link
          href={moreHref}
          className='rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-black/80 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-sm'
        >
          View more
        </Link>
      </div>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
        {list.map((item) => (
          <Link
            key={item.id}
            href={`/tutorials/${item.slug}`}
            className='group flex h-28 items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-sm focus-visible:shadow-md focus-visible:outline-none lg:h-32'
            title={item.title}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {item.cover_url ? (
              <img
                src={item.cover_url}
                alt={item.title}
                width={120}
                height={80}
                loading='lazy'
                decoding='async'
                className='h-20 w-28 shrink-0 rounded-lg bg-white object-cover ring-1 ring-black/5 lg:h-[88px] lg:w-36'
              />
            ) : (
              <div className='h-20 w-28 shrink-0 rounded-lg bg-gradient-to-b from-gray-100 to-gray-50 ring-1 ring-black/5 lg:h-[88px] lg:w-36' />
            )}
            <div className='min-w-0 flex-1'>
              <h3 className='line-clamp-1 text-sm font-semibold text-black lg:text-base'>{item.title}</h3>
              {item.summary ? (
                <p className='mt-1 line-clamp-2 text-xs text-black/80 lg:line-clamp-3 lg:text-sm'>{item.summary}</p>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
