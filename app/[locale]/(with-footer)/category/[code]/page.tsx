/* eslint-disable react/jsx-props-no-spreading */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/db/supabase/client';

import { InfoPageSize, RevalidateOneHour } from '@/lib/constants';

import Content from './Content';

export const revalidate = RevalidateOneHour * 6;

export async function generateMetadata({ params }: { params: { code: string } }): Promise<Metadata> {
  const supabase = createClient();
  const { data: categoryList } = await supabase.from('navigation_category').select().eq('name', params.code);

  if (!categoryList || !categoryList[0]) {
    notFound();
  }

  const title = categoryList[0].title || params.code;
  const description = `Discover the best ${title} AI tools on Nav ai Directory. Updated daily.`;
  return {
    title,
    description,
    alternates: { canonical: `/category/${encodeURIComponent(params.code)}` },
    openGraph: {
      type: 'website',
      url: `/category/${encodeURIComponent(params.code)}`,
      title,
      description,
      siteName: 'Nav ai Directory',
      images: ['/images/tap4-ai.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/tap4-ai.png'],
    },
  };
}

export default async function Page({ params }: { params: { code: string } }) {
  const supabase = createClient();
  const [{ data: categoryList, error: categoryError }, { data: navigationList, error: navigationError, count }] =
    await Promise.all([
      supabase.from('navigation_category').select().eq('name', params.code),
      supabase
        .from('web_navigation')
        .select('*', { count: 'exact' })
        .eq('category_name', params.code)
        .range(0, InfoPageSize - 1),
    ]);

  if (categoryError) {
    console.error('Failed to load navigation category detail', categoryError);
  }
  if (!categoryList || !categoryList[0]) {
    notFound();
  }

  if (navigationError) {
    console.error('Failed to load navigation list for category', navigationError);
  }

  const headerTitle = categoryList[0].title || params.code;
  const navigationListData = navigationList ?? [];
  const totalCount = count ?? 0;

  return (
    <Content
      headerTitle={headerTitle}
      navigationList={navigationListData}
      currentPage={1}
      total={totalCount}
      pageSize={InfoPageSize}
      route={`/category/${params.code}`}
    />
  );
}
