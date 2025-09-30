/* eslint-disable react/jsx-no-target-blank */

import Link from 'next/link';
import { WebNavigation } from '@/db/supabase/types';
import { CircleArrowRight, SquareArrowOutUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

function hashToIndex(key: string, mod: number) {
  let h = 5381;
  for (let i = 0; i < key.length; i += 1) h = (h * 33) ^ key.charCodeAt(i);
  return Math.abs(h) % mod;
}

const accentCombos = [
  'border-rose-200 from-rose-50 to-rose-100 ring-rose-200/40',
  'border-pink-200 from-pink-50 to-pink-100 ring-pink-200/40',
  'border-fuchsia-200 from-fuchsia-50 to-fuchsia-100 ring-fuchsia-200/40',
  'border-violet-200 from-violet-50 to-violet-100 ring-violet-200/40',
  'border-indigo-200 from-indigo-50 to-indigo-100 ring-indigo-200/40',
  'border-blue-200 from-blue-50 to-blue-100 ring-blue-200/40',
  'border-cyan-200 from-cyan-50 to-cyan-100 ring-cyan-200/40',
  'border-teal-200 from-teal-50 to-teal-100 ring-teal-200/40',
  'border-emerald-200 from-emerald-50 to-emerald-100 ring-emerald-200/40',
  'border-lime-200 from-lime-50 to-lime-100 ring-lime-200/40',
  'border-yellow-200 from-yellow-50 to-yellow-100 ring-yellow-200/40',
  'border-amber-200 from-amber-50 to-amber-100 ring-amber-200/40',
  'border-orange-200 from-orange-50 to-orange-100 ring-orange-200/40',
  'border-red-200 from-red-50 to-red-100 ring-red-200/40',
  'border-sky-200 from-sky-50 to-sky-100 ring-sky-200/40',
  'border-slate-200 from-slate-50 to-slate-100 ring-slate-200/40',
];

export default function WebNavCard({ name, thumbnail_url, title, url, content }: WebNavigation) {
  const t = useTranslations('Home');
  const key = (title || name) as string;
  const accent = accentCombos[hashToIndex(key, accentCombos.length)];

  return (
    <div
      className={`flex h-[228px] flex-col gap-3 rounded-xl border bg-gradient-to-b p-1 lg:h-[360px] ${accent} transition-all duration-200 hover:-translate-y-0.5 hover:ring-2`}
    >
      <Link href={`/ai/${name}`} title={title} className='group relative'>
        <img
          src={thumbnail_url || ''}
          alt={title}
          title={title}
          width={310}
          height={174}
          className='aspect-[310/174] w-full rounded-xl bg-white/40 ring-1 ring-black/5 hover:opacity-70'
        />
        <div className='absolute inset-0 z-10 hidden items-center justify-center gap-1 rounded-xl bg-black/50 text-xl text-white transition-all duration-200 group-hover:flex'>
          {t('checkDetail')} <CircleArrowRight className='size-4' />
        </div>
      </Link>
      <div className='flex items-center justify-between px-[6px]'>
        <a href={url} title={title} target='_blank' rel='nofollow' className='hover:opacity-70'>
          <h3 className='line-clamp-1 flex-1 text-sm font-bold text-black lg:text-base'>{title}</h3>
        </a>
        <a href={url} title={title} target='_blank' rel='nofollow' className='hover:opacity-70'>
          <SquareArrowOutUpRight className='size-5 text-black' />
          <span className='sr-only'>{title}</span>
        </a>
      </div>
      <p className='line-clamp-4 px-[6px] text-xs text-black/80 lg:line-clamp-6 lg:text-sm'>{content}</p>
    </div>
  );
}
