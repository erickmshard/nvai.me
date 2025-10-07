import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const languages = [
  {
    code: 'en-US',
    lang: 'en',
    label: 'English',
  },
];

export const locales = languages.map((lang) => lang.lang);

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    // Set a global default time zone to avoid ENVIRONMENT_FALLBACK warnings
    // and SSR/CSR markup mismatches.
    timeZone: process.env.DEFAULT_TIME_ZONE || 'UTC',
  };
});
