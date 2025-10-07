function resolveBaseUrlEnv() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL as string | undefined;
  if (fromEnv && /^https?:\/\//i.test(fromEnv)) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

export const BASE_URL = resolveBaseUrlEnv();

export const { GOOGLE_TRACKING_ID, GOOGLE_ADSENSE_URL, CONTACT_US_EMAIL } = process.env as Record<string, string>;
