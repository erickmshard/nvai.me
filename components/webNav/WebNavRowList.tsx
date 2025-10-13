/* eslint-disable react/jsx-no-target-blank */
import Link from 'next/link';
import type { WebNavigation } from '@/db/supabase/types';
import { ChevronRight, SquareArrowOutUpRight, Star } from 'lucide-react';

function hashToIndex(key: string, mod: number) {
  let h = 5381;
  for (let i = 0; i < key.length; i += 1) h = (h * 33) ^ key.charCodeAt(i);
  return Math.abs(h) % mod;
}

const accentCombos = [
  'border-rose-200 ring-rose-200/40',
  'border-pink-200 ring-pink-200/40',
  'border-fuchsia-200 ring-fuchsia-200/40',
  'border-violet-200 ring-violet-200/40',
  'border-indigo-200 ring-indigo-200/40',
  'border-blue-200 ring-blue-200/40',
  'border-cyan-200 ring-cyan-200/40',
  'border-teal-200 ring-teal-200/40',
  'border-emerald-200 ring-emerald-200/40',
  'border-lime-200 ring-lime-200/40',
  'border-yellow-200 ring-yellow-200/40',
  'border-amber-200 ring-amber-200/40',
  'border-orange-200 ring-orange-200/40',
  'border-red-200 ring-red-200/40',
  'border-sky-200 ring-sky-200/40',
  'border-slate-200 ring-slate-200/40',
];

function Stars({ value = 0 }: { value?: number | null }) {
  const v = Math.max(0, Math.min(5, Math.round(value || 0)));
  return (
    <span className='inline-flex items-center gap-0.5 text-amber-500'>
      {Array.from({ length: v }).map((_, i) => (
        <Star key={`s-${i}`} className='h-3.5 w-3.5 fill-current' />
      ))}
      {Array.from({ length: 5 - v }).map((_, i) => (
        <Star key={`e-${i}`} className='h-3.5 w-3.5' />
      ))}
    </span>
  );
}

export default function WebNavRowList({ dataList }: { dataList: WebNavigation[] }) {
  return (
    <ul className='divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white'>
      {dataList.map((item) => {
        const key = (item.title || item.name) as string;
        const accent = accentCombos[hashToIndex(key, accentCombos.length)];
        return (
          <li
            key={item.id}
            className={`group relative flex items-stretch gap-3 from-gray-50 to-white p-3 transition-all duration-200 hover:bg-gradient-to-r hover:ring-2 ${accent}`}
          >
            <Link href={`/ai/${item.name}`} title={item.title ?? item.name} className='relative block shrink-0'>
              <img
                src={item.thumbnail_url || ''}
                alt={item.title ?? item.name}
                width={120}
                height={80}
                loading='lazy'
                decoding='async'
                className='h-20 w-28 rounded-lg bg-white object-cover ring-1 ring-black/5 lg:h-[88px] lg:w-36'
              />
              <span className='sr-only'>{item.title ?? item.name}</span>
            </Link>
            <div className='min-w-0 flex-1'>
              <div className='flex items-start justify-between gap-2'>
                <div className='flex min-w-0 items-center gap-2'>
                  <Link
                    href={`/ai/${item.name}`}
                    title={item.title ?? item.name}
                    className='group/title hover:opacity-80'
                  >
                    <h3 className='line-clamp-1 text-sm font-semibold text-black lg:text-base'>
                      {item.title || item.name}
                    </h3>
                  </Link>
                  <a
                    href={item.url}
                    title={item.title ?? item.name}
                    target='_blank'
                    rel='nofollow'
                    className='shrink-0 hover:opacity-80'
                    aria-label={`Open ${item.title ?? item.name} in new tab`}
                  >
                    <SquareArrowOutUpRight className='size-4 text-black/70 group-hover/title:text-black' />
                  </a>
                </div>
                <Stars value={item.star_rating} />
              </div>
              <p className='mt-1 line-clamp-2 text-xs text-black/80 lg:line-clamp-3 lg:text-sm'>{item.content}</p>
              <div className='mt-2 flex flex-wrap items-center gap-1 text-[11px] text-black/70 lg:text-xs'>
                {item.category_name ? (
                  <span className='rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5'>
                    {item.category_name}
                  </span>
                ) : null}
                {item.tag_name ? (
                  <span className='rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5'>{item.tag_name}</span>
                ) : null}
              </div>
            </div>
            <Link
              href={`/ai/${item.name}`}
              className='hidden shrink-0 items-center self-center whitespace-nowrap rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-black/80 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-sm lg:inline-flex'
            >
              Details <ChevronRight className='ml-1 h-4 w-4' />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
