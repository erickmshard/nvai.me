import Link from 'next/link';
import { createPublicClient } from '@/db/supabase/publicClient';

type Platform = 'windows' | 'mac' | 'android';

type AppItem = {
  name: string;
  title: string;
  icon_url: string | null;
  content: string | null;
  category: string | null;
  created_at: string;
};

function tableName(platform: Platform) {
  switch (platform) {
    case 'windows':
      return 'windows_app';
    case 'mac':
      return 'mac_app';
    case 'android':
      return 'android_app';
  }
}

function platformTitle(platform: Platform) {
  switch (platform) {
    case 'windows':
      return 'Windows Apps';
    case 'mac':
      return 'Mac Apps';
    case 'android':
      return 'Android Apps';
  }
}

export default async function LatestAppsGrid({
  platform,
  excludeName,
  moreHref,
  title,
}: {
  platform: Platform;
  excludeName?: string;
  moreHref?: string;
  title?: string;
}) {
  const supabase = createPublicClient(900);
  const { data } = await supabase
    .from(tableName(platform))
    .select('name,title,icon_url,content,category,created_at')
    .order('created_at', { ascending: false })
    .limit(10);

  const list = (data || [])
    .filter((item: AppItem) => (excludeName ? item.name !== excludeName : true))
    .slice(0, 9) as AppItem[];

  if (!list.length) return null;

  const headerTitle = title || `Latest ${platformTitle(platform)}`;
  const baseHref = platform === 'windows' ? '/windows' : platform === 'mac' ? '/mac' : '/android';

  return (
    <section className='mx-auto mb-12 w-full max-w-pc px-3 lg:mb-16 lg:px-0'>
      <div className='mb-3 mt-6 flex items-center justify-between lg:mt-8'>
        <h2 className='text-xl font-semibold text-black lg:text-2xl'>{headerTitle}</h2>
        <Link
          href={moreHref || baseHref}
          className='rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-black/80 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-sm'
        >
          View more
        </Link>
      </div>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
        {list.map((item) => (
          <Link
            key={item.name}
            href={`/${platform}/${encodeURIComponent(item.name)}`}
            className='group flex h-28 items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-sm focus-visible:shadow-md focus-visible:outline-none lg:h-32'
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
    </section>
  );
}
