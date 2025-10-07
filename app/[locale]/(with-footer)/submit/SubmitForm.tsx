'use client';

import { cn } from '@/lib/utils';

export default function SubmitForm({ className }: { className?: string }) {
  return (
    <div className={cn('mx-3 mb-5 lg:w-[444px]', className)}>
      <div className='rounded-2xl bg-gradient-to-r from-pink-500/50 via-fuchsia-500/50 to-purple-600/50 p-[1px] shadow-[0_10px_30px_rgba(44,45,54,0.08)]'>
        <div className='rounded-[16px] bg-white px-5 py-6 lg:px-7 lg:py-8'>
          <div className='flex items-start gap-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='size-6 text-purple-600'
            >
              <path
                fillRule='evenodd'
                d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm10.5-4.125a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0ZM9.75 10.5a.75.75 0 0 0 0 1.5h.375v4.125H9.75a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-.375V10.5H14.25a.75.75 0 0 0 0-1.5h-4.5Z'
                clipRule='evenodd'
              />
            </svg>
            <h3 className='text-2xl font-bold tracking-tight text-[#2C2D36]'>Submission Notice</h3>
          </div>

          <p className='mt-3 text-[14px] leading-7 text-[#2C2D36]/90'>
            Due to a heavy workload, the directory currently only accepts reciprocal listings for websites that have
            been online for at least one year. “New websites” refers to sites less than one year old; listing them
            requires a $3.99 fee.
          </p>

          <div className='mt-5 flex flex-wrap items-center gap-3'>
            <span className='text-sm text-[#2C2D36]/80'>If you accept this, please email</span>
            <a
              href='mailto:cyberoneaillc@gmail.com'
              className='inline-flex items-center gap-2 rounded-md bg-[#2C2D36] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90'
            >
              cyberoneaillc@gmail.com
            </a>
          </div>

          <hr className='my-5 border-dashed border-gray-200' />
          <p className='text-sm text-gray-600'>Wishing you a smooth and successful workday!</p>
        </div>
      </div>
    </div>
  );
}
