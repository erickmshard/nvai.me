import { RevalidateOneHour } from '@/lib/constants';

import WindowsList from '../../WindowsList';

export const revalidate = RevalidateOneHour;

export default function Page({ params: { pageNum, locale } }: { params: { pageNum: string; locale: string } }) {
  return <WindowsList pageNum={pageNum} locale={locale} />;
}
