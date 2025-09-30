import { CircleHelp } from 'lucide-react';
import { useTranslations } from 'next-intl';

function TitleItem({ children }: { children: React.ReactNode }) {
  return (
    <h3 className='mb-1 flex items-center gap-2 text-lg font-semibold text-black lg:text-xl'>
      <CircleHelp className='h-5 w-5 text-black/80' /> {children}
    </h3>
  );
}

function ContentItem({ children }: { children: React.ReactNode }) {
  return <p className='mt-2 text-sm text-black/80 lg:text-base'>{children}</p>;
}

export default function Faq() {
  const t = useTranslations('Faq');
  return (
    <div className='mx-auto mt-10 max-w-pc space-y-8 pb-5 lg:mt-16'>
      <h2 className='text-center text-2xl font-bold text-black lg:pb-3 lg:text-3xl'>{t('title')}</h2>
      <div className='grid grid-cols-1 gap-4 px-3 md:grid-cols-2 lg:gap-6 lg:px-0 xl:grid-cols-3'>
        <div className='rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
          <TitleItem>{t('1.question')}</TitleItem>
          <ContentItem>{t('1.answer')}</ContentItem>
        </div>
        <div className='rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
          <TitleItem>{t('2.question')}</TitleItem>
          <ContentItem>{t('2.answer-1')}</ContentItem>
          <ContentItem>{t('2.answer-2')}</ContentItem>
          <ContentItem>{t('2.answer-3')}</ContentItem>
        </div>
        <div className='rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
          <TitleItem>{t('3.question')}</TitleItem>
          <ContentItem>{t('3.answer-1')}</ContentItem>
          <ContentItem>{t('3.answer-2')}</ContentItem>
        </div>
        <div className='rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
          <TitleItem>{t('4.question')}</TitleItem>
          <ContentItem>{t('4.answer')}</ContentItem>
        </div>
        <div className='rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
          <TitleItem>{t('5.question')}</TitleItem>
          <ContentItem>{t('5.answer')}</ContentItem>
        </div>
        <div className='rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
          <TitleItem>{t('6.question')}</TitleItem>
          <ContentItem>{t('6.answer')}</ContentItem>
        </div>
        <div className='rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
          <TitleItem>{t('7.question')}</TitleItem>
          <ContentItem>{t('7.answer')}</ContentItem>
        </div>
        <div className='rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
          <TitleItem>{t('8.question')}</TitleItem>
          <ContentItem>{t('8.answer')}</ContentItem>
        </div>
        <div className='rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
          <TitleItem>{t('9.question')}</TitleItem>
          <ContentItem>{t('9.answer')}</ContentItem>
        </div>
        <div className='rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
          <TitleItem>{t('10.question')}</TitleItem>
          <ContentItem>{t('10.answer')}</ContentItem>
        </div>
        <div className='rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
          <TitleItem>{t('11.question')}</TitleItem>
          <ContentItem>{t('11.answer')}</ContentItem>
        </div>
      </div>
    </div>
  );
}
