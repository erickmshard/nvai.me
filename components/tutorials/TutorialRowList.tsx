import Link from 'next/link';
import type { Tutorial } from '@/db/supabase/types';
import { ChevronRight } from 'lucide-react';

function formatDate(dateStr?: string | null) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

type TutorialListItem = Pick<Tutorial, 'id' | 'slug' | 'title' | 'summary' | 'cover_url' | 'updated_at'>;

export default function TutorialRowList({ dataList }: { dataList: TutorialListItem[] }) {
  return (
    <ul className='divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white'>
      {dataList.map((item) => (
        <li
          key={item.id}
          className='group relative flex items-stretch gap-3 border-slate-200 from-gray-50 to-white p-3 ring-slate-200/40 transition-all duration-200 hover:bg-gradient-to-r hover:ring-2'
        >
          <Link href={`/tutorials/${item.slug}`} title={item.title} className='relative block shrink-0'>
            {item.cover_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.cover_url}
                alt={item.title}
                width={120}
                height={80}
                loading='lazy'
                decoding='async'
                className='h-20 w-28 rounded-lg bg-white object-cover ring-1 ring-black/5 lg:h-[88px] lg:w-36'
              />
            ) : (
              <div className='h-20 w-28 rounded-lg bg-gradient-to-b from-gray-100 to-gray-50 ring-1 ring-black/5 lg:h-[88px] lg:w-36' />
            )}
            <span className='sr-only'>{item.title}</span>
          </Link>
          <div className='min-w-0 flex-1'>
            <div className='flex items-start justify-between gap-2'>
              <div className='flex min-w-0 items-center gap-2'>
                <Link href={`/tutorials/${item.slug}`} title={item.title} className='group/title hover:opacity-80'>
                  <h3 className='line-clamp-1 text-sm font-semibold text-black lg:text-base'>{item.title}</h3>
                </Link>
              </div>
              <span className='shrink-0 text-[11px] text-black/60 lg:text-xs'>{formatDate(item.updated_at)}</span>
            </div>
            <p className='mt-1 line-clamp-2 text-xs text-black/80 lg:line-clamp-3 lg:text-sm'>{item.summary}</p>
          </div>
          <Link
            href={`/tutorials/${item.slug}`}
            className='hidden shrink-0 items-center self-center whitespace-nowrap rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-black/80 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-sm lg:inline-flex'
          >
            Read <ChevronRight className='ml-1 h-4 w-4' />
          </Link>
        </li>
      ))}
    </ul>
  );
}
