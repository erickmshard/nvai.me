function resolveBaseUrlEnv() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL as string | undefined;
  if (fromEnv && /^https?:\/\//i.test(fromEnv)) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

export const BASE_URL = resolveBaseUrlEnv();

// Prefer public (browser-exposed) env vars on the client, with server fallbacks
const env = process.env as Record<string, string | undefined>;

export const GOOGLE_TRACKING_ID = env.NEXT_PUBLIC_GOOGLE_TRACKING_ID ?? env.GOOGLE_TRACKING_ID ?? '';

export const GOOGLE_ADSENSE_URL = env.NEXT_PUBLIC_GOOGLE_ADSENSE_URL ?? env.GOOGLE_ADSENSE_URL ?? '';

export const CONTACT_US_EMAIL = env.NEXT_PUBLIC_CONTACT_US_EMAIL ?? env.CONTACT_US_EMAIL ?? '';
