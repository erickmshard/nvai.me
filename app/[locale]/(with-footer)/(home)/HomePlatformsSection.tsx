import Link from 'next/link';
import { createClient } from '@/db/supabase/client';

type Item = {
  name: string;
  title: string;
  icon_url: string | null;
  content: string | null;
};

async function fetchTop(table: string, limit = 12) {
  const supabase = createClient();
  const { data } = await supabase
    .from(table)
    .select('name,title,icon_url,content')
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data || []) as Item[];
}

function MiniCard({
  href,
  title,
  icon,
  content,
}: {
  href: string;
  title: string;
  icon?: string | null;
  content?: string | null;
}) {
  return (
    <Link
      href={href}
      className='group flex h-24 items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-sm focus-visible:shadow-md focus-visible:outline-none'
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon || '/favicon.ico'}
        alt={title}
        width={40}
        height={40}
        className='h-10 w-10 shrink-0 rounded-lg border border-gray-200 bg-gray-50 object-cover'
      />
      <div className='min-w-0 flex-1'>
        <h3 className='truncate text-sm font-semibold text-black group-hover:opacity-80'>{title}</h3>
        {content ? <p className='mt-1 line-clamp-2 text-xs leading-snug text-black/70'>{content}</p> : null}
      </div>
    </Link>
  );
}

export default async function HomePlatformsSection() {
  const [windows, mac, android] = await Promise.all([
    fetchTop('windows_app'),
    fetchTop('mac_app'),
    fetchTop('android_app'),
  ]);

  const hasAny = (windows?.length || 0) + (mac?.length || 0) + (android?.length || 0) > 0;
  if (!hasAny) return null;

  return (
    <section className='my-10 flex flex-col gap-10 lg:my-16'>
      {windows?.length ? (
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-[18px] text-black lg:text-[28px]'>Windows Apps</h2>
            <Link
              href='/windows'
              className='rounded-[8px] border border-black/70 px-3 py-1 text-xs text-black hover:bg-gray-100 lg:text-sm'
            >
              View More
            </Link>
          </div>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
            {windows.map((item) => (
              <MiniCard
                key={item.name}
                href={`/windows/${encodeURIComponent(item.name)}`}
                title={item.title}
                icon={item.icon_url}
                content={item.content || undefined}
              />
            ))}
          </div>
        </div>
      ) : null}

      {mac?.length ? (
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-[18px] text-black lg:text-[28px]'>Mac Apps</h2>
            <Link
              href='/mac'
              className='rounded-[8px] border border-black/70 px-3 py-1 text-xs text-black hover:bg-gray-100 lg:text-sm'
            >
              View More
            </Link>
          </div>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
            {mac.map((item) => (
              <MiniCard
                key={item.name}
                href={`/mac/${encodeURIComponent(item.name)}`}
                title={item.title}
                icon={item.icon_url}
                content={item.content || undefined}
              />
            ))}
          </div>
        </div>
      ) : null}

      {android?.length ? (
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-[18px] text-black lg:text-[28px]'>Android Apps</h2>
            <Link
              href='/android'
              className='rounded-[8px] border border-black/70 px-3 py-1 text-xs text-black hover:bg-gray-100 lg:text-sm'
            >
              View More
            </Link>
          </div>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
            {android.map((item) => (
              <MiniCard
                key={item.name}
                href={`/android/${encodeURIComponent(item.name)}`}
                title={item.title}
                icon={item.icon_url}
                content={item.content || undefined}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
