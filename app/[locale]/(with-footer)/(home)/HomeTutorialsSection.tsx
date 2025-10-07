import Link from 'next/link';
import { createClient } from '@/db/supabase/client';
import { getTranslations } from 'next-intl/server';

import TutorialRowList from '@/components/tutorials/TutorialRowList';

const HOME_TUTORIALS_LIMIT = 20;

export default async function HomeTutorialsSection() {
  const supabase = createClient();
  const t = await getTranslations('Tutorials');

  const { data: tutorials } = await supabase
    .from('tutorials')
    .select('id, slug, title, summary, cover_url, updated_at')
    .order('updated_at', { ascending: false })
    .limit(HOME_TUTORIALS_LIMIT);

  if (!tutorials || tutorials.length === 0) return null;

  return (
    <section className='my-10 flex flex-col gap-5 lg:my-16'>
      <div className='flex items-center justify-between'>
        <h2 className='text-[18px] text-black lg:text-[28px]'>{t('title')}</h2>
        <Link
          href='/tutorials'
          className='rounded-[8px] border border-black/70 px-3 py-1 text-xs text-black hover:bg-gray-100 lg:text-sm'
        >
          {t('viewMore')}
        </Link>
      </div>
      <TutorialRowList dataList={tutorials} />
    </section>
  );
}
