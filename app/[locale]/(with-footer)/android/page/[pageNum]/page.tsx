import { RevalidateOneHour } from '@/lib/constants';

import AndroidList from '../../AndroidList';

export const revalidate = RevalidateOneHour;

export default function Page({ params: { pageNum, locale } }: { params: { pageNum: string; locale: string } }) {
  return <AndroidList pageNum={pageNum} locale={locale} />;
}
