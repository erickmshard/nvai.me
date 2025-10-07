import { createClient } from '@/db/supabase/client';
import { getTranslations } from 'next-intl/server';

import BasePagination from '@/components/page/BasePagination';
import TutorialRowList from '@/components/tutorials/TutorialRowList';

const TUTORIAL_PAGE_SIZE = 12;

export default async function TutorialsList({ pageNum }: { pageNum?: string }) {
  const supabase = createClient();
  const t = await getTranslations('Tutorials');
  const currentPage = pageNum ? Number(pageNum) : 1;

  const start = (currentPage - 1) * TUTORIAL_PAGE_SIZE;
  const end = start + TUTORIAL_PAGE_SIZE - 1;

  const { data: tutorialList, count } = await supabase
    .from('tutorials')
    .select('id, slug, title, summary, cover_url, updated_at', { count: 'exact' })
    .order('updated_at', { ascending: false })
    .range(start, end);

  return (
    <section className='space-y-4'>
      {tutorialList && tutorialList.length > 0 ? (
        <TutorialRowList dataList={tutorialList} />
      ) : (
        <div className='rounded-xl border border-gray-200 bg-white p-6 text-sm text-black/70'>{t('empty')}</div>
      )}
      <BasePagination
        currentPage={currentPage}
        pageSize={TUTORIAL_PAGE_SIZE}
        total={count || 0}
        route='/tutorials'
        subRoute='/page'
        className='mb-12 mt-5 lg:mb-16 lg:mt-10'
      />
    </section>
  );
}
