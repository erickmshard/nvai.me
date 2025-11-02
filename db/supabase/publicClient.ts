/* eslint-disable import/prefer-default-export */
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

import type { Database } from './types';

/**
 * Public, read-only Supabase client for server components without reading cookies.
 * Passes through Next.js fetch with revalidate hints so results can be cached.
 */
export function createPublicClient(revalidateSeconds: number = 900) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn('[supabase] Missing env for public client. Using no-op client.');
    }
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

  return createSupabaseClient<Database>(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      // Ensure signature matches overloaded `fetch` (accepts URL | Request | string)
      fetch: (input: Request | string | URL, init?: RequestInit) =>
        fetch(input as any, { ...(init || {}), next: { revalidate: revalidateSeconds } } as any),
    },
  });
}
