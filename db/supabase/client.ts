/* eslint-disable import/prefer-default-export */

import { cookies } from 'next/headers';
import { createBrowserClient, createServerClient } from '@supabase/ssr';

import { Database } from './types';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn('[supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Using no-op client.');
    }

    // Provide a minimal no-op client to avoid hard crashes in production
    // when environment variables are not configured. All queries resolve to
    // empty results so pages can render with fallbacks instead of 500.
    const chain: any = {
      select: () => chain,
      eq: () => chain,
      order: () => chain,
      range: () => chain,
      limit: () => chain,
      ilike: () => chain,
      single: async () => ({ data: null, error: null, count: 0 }),
      maybeSingle: async () => ({ data: null, error: null, count: 0 }),
      then: (resolve: any) => resolve({ data: [], error: null, count: 0 }),
    };
    return { from: () => chain } as any;
  }

  if (typeof window === 'undefined') {
    const cookieStore = cookies();
    return createServerClient<Database>(url, anonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (_) {
            // Ignore in RSC where setting cookies is not allowed
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (_) {
            // Ignore in RSC where setting cookies is not allowed
          }
        },
      },
    });
  }

  return createBrowserClient<Database>(url, anonKey);
}
