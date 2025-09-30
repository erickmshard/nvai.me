'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      {isVisible && (
        <button
          type='button'
          onClick={scrollToTop}
          className='fixed bottom-52 right-48 hidden items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-rose-500 p-2 shadow-md ring-1 ring-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-95 lg:flex'
          aria-label='Scroll to top'
        >
          <ArrowUp className='h-5 w-5 text-white' />
          <span className='sr-only'>Go to Top</span>
        </button>
      )}
    </div>
  );
}
