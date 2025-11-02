import Link from 'next/link';
import { createPublicClient } from '@/db/supabase/publicClient';

import WebNavCard from '@/components/webNav/WebNavCard';

type WebNav = {
  id: number;
  name: string;
  title: string | null;
  url: string | null;
  content: string | null;
  thumbnail_url: string | null;
  category_name: string | null;
  tag_name: string | null;
  collection_time: string | null;
};

export default async function LatestWebNavGrid({
  excludeName,
  moreHref = '/explore',
  title = 'Latest AI Tools',
}: {
  excludeName?: string;
  moreHref?: string;
  title?: string;
}) {
  const supabase = createPublicClient(900);
  const { data } = await supabase
    .from('web_navigation')
    .select('*')
    .order('collection_time', { ascending: false })
    .limit(9);

  const list = (data || [])
    .filter((item: WebNav) => (excludeName ? item.name !== excludeName : true))
    .slice(0, 8) as WebNav[];

  if (!list.length) return null;

  return (
    <section className='relative z-0 mx-auto mb-12 mt-8 w-full max-w-pc px-3 lg:mb-16 lg:mt-12 lg:px-0'>
      <div className='mb-3 mt-6 flex items-center justify-between lg:mt-8'>
        <h2 className='text-xl font-semibold text-black lg:text-2xl'>{title}</h2>
        <Link
          href={moreHref}
          className='rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-black/80 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-sm'
        >
          View more
        </Link>
      </div>
      <div className='grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4'>
        {list.map((item) => (
          <WebNavCard key={item.id} {...(item as any)} />
        ))}
      </div>
    </section>
  );
}
