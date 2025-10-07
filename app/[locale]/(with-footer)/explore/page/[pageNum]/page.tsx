import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { RevalidateOneHour } from '@/lib/constants';

import ExploreList from '../../ExploreList';

export const revalidate = RevalidateOneHour * 6;

export async function generateMetadata({
  params: { pageNum },
}: {
  params: { pageNum: string | undefined };
}): Promise<Metadata> {
  const t = await getTranslations('Explore');
  const currentPage = pageNum ? Number(pageNum) : 1;
  const baseTitle = t('title');
  const title = `${baseTitle} - Page ${currentPage}`;
  return {
    title,
    alternates: {
      canonical: `/explore/page/${currentPage}`,
    },
  };
}

export default function page({ params: { pageNum } }: { params: { pageNum: string | undefined } }) {
  return <ExploreList pageNum={pageNum} />;
}
