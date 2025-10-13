import { RevalidateOneHour } from '@/lib/constants';

import MacList from '../../MacList';

export const revalidate = RevalidateOneHour;

export default function Page({ params: { pageNum, locale } }: { params: { pageNum: string; locale: string } }) {
  return <MacList pageNum={pageNum} locale={locale} />;
}
