import { createClient } from '@/db/supabase/client';
import type { NavigationCategory } from '@/db/supabase/types';

import SearchForm from '@/components/home/SearchForm';
import BasePagination from '@/components/page/BasePagination';
import WebNavRowList from '@/components/webNav/WebNavRowList';

import { TagList } from '../(home)/Tag';

const WEB_PAGE_SIZE = 12;

export default async function ExploreList({ pageNum }: { pageNum?: string }) {
  const supabase = createClient();
  const currentPage = pageNum ? Number(pageNum) : 1;

  // start and end
  const start = (currentPage - 1) * WEB_PAGE_SIZE;
  const end = start + WEB_PAGE_SIZE - 1;

  const [{ data: categoryList, error: categoryError }, { data: navigationList, error: navigationError, count }] =
    await Promise.all([
      supabase.from('navigation_category').select(),
      supabase
        .from('web_navigation')
        .select('*', { count: 'exact' })
        .order('collection_time', { ascending: false })
        .range(start, end),
    ]);

  if (categoryError) {
    console.error('Failed to load navigation categories', categoryError);
  }
  if (navigationError) {
    console.error('Failed to load web navigation list', navigationError);
  }

  const tagListData = (categoryList ?? []).map((item: NavigationCategory) => ({
    id: String(item.id),
    name: item.name,
    href: `/category/${item.name}`,
  }));

  const navigationListData = navigationList ?? [];
  const totalCount = count ?? 0;

  return (
    <div className='grid grid-cols-1 items-start gap-5 lg:grid-cols-[260px_1fr]'>
      <aside className='sticky top-20 hidden h-fit lg:block'>
        <h3 className='mb-3 text-sm font-semibold text-black/80'>Categories</h3>
        <TagList colorful showIcons direction='column' maxHeight='auto' data={tagListData} />
      </aside>
      <section className='space-y-4'>
        <div className='flex w-full items-center justify-end'>
          <SearchForm />
        </div>
        <WebNavRowList dataList={navigationListData} />
        <BasePagination
          currentPage={currentPage}
          pageSize={WEB_PAGE_SIZE}
          total={totalCount}
          route='/explore'
          subRoute='/page'
          className='my-5 lg:my-10'
        />
      </section>
    </div>
  );
}
