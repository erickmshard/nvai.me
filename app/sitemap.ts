import { type MetadataRoute } from 'next';
import { createClient } from '@/db/supabase/client';
import type { AndroidApp, MacApp, NavigationCategory, Tutorial, WebNavigation, WindowsApp } from '@/db/supabase/types';
import { locales } from '@/i18n';

import { InfoPageSize } from '@/lib/constants';
import { BASE_URL } from '@/lib/env';

export const revalidate = 86400; // Rebuild sitemap once per day

function makeAbsoluteUrl(path: string, locale: string) {
  const base = (BASE_URL || '').replace(/\/$/, '');
  const lang = locale === 'en' ? '' : `/${locale}`;
  let normalized = '';
  if (path === '') {
    normalized = '';
  } else if (path.startsWith('/')) {
    normalized = path;
  } else {
    normalized = `/${path}`;
  }
  return `${base}${lang}${normalized}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();
  const items: MetadataRoute.Sitemap = [];

  const add = (path: string, opts?: Partial<MetadataRoute.Sitemap[number]>) => {
    locales.forEach((locale) => {
      items.push({ url: makeAbsoluteUrl(path, locale), ...(opts || {}) });
    });
  };

  // Static core routes
  add('', { lastModified: new Date(), changeFrequency: 'daily', priority: 1 }); // Home
  add('/explore', { lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 });
  add('/tutorials', { lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 });
  add('/android', { lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 });
  add('/mac', { lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 });
  add('/windows', { lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 });
  add('/submit', { lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 });
  add('/startup', { lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 });
  add('/privacy-policy', { lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 });
  add('/terms-of-service', { lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 });

  // Explore pagination
  {
    const { count: webCount } = await supabase.from('web_navigation').select('id', { count: 'exact', head: true });
    const totalExplorePages = Math.max(1, Math.ceil((webCount || 0) / InfoPageSize));
    for (let p = 2; p <= totalExplorePages; p += 1) {
      add(`/explore/page/${p}`, { lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 });
    }
  }

  // Tutorials list pagination and detail pages
  {
    const PAGE_SIZE = 12; // Keep in sync with TutorialsList.tsx
    const [{ count: tutCount }, { data: tutorialList }] = await Promise.all([
      supabase.from('tutorials').select('id', { count: 'exact', head: true }),
      supabase.from('tutorials').select('slug, updated_at').order('updated_at', { ascending: false }),
    ]);

    const totalTutPages = Math.max(1, Math.ceil((tutCount || 0) / PAGE_SIZE));
    for (let p = 2; p <= totalTutPages; p += 1) {
      add(`/tutorials/page/${p}`, { lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 });
    }

    (tutorialList || []).forEach((t: Pick<Tutorial, 'slug' | 'updated_at'>) => {
      const slug = encodeURIComponent(t.slug);
      add(`/tutorials/${slug}`, {
        lastModified: t.updated_at ? new Date(t.updated_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  }

  // Categories with pagination
  {
    const { data: categories } = await supabase.from('navigation_category').select('name');
    const names = (categories || []).map((c: Pick<NavigationCategory, 'name'>) => c.name).filter(Boolean) as string[];

    // For each category, add base route and paginated routes
    // Uses InfoPageSize for category listing (aligned with codebase)
    await Promise.all(
      names.map(async (code) => {
        const codePath = encodeURIComponent(code);
        // Base category page
        add(`/category/${codePath}`, { lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 });

        // Count items in this category to build pagination
        const { count } = await supabase
          .from('web_navigation')
          .select('id', { count: 'exact', head: true })
          .eq('category_name', code);

        const totalPages = Math.max(1, Math.ceil((count || 0) / InfoPageSize));
        for (let p = 2; p <= totalPages; p += 1) {
          add(`/category/${codePath}/page/${p}`, {
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.6,
          });
        }
      }),
    );
  }

  // Android list pagination and detail pages
  {
    const ANDROID_PAGE_SIZE = 24; // Keep in sync with AndroidList.tsx
    const [{ count: androidCount }, { data: androidList }] = await Promise.all([
      supabase.from('android_app').select('name', { count: 'exact', head: true }),
      supabase.from('android_app').select('name, created_at').order('created_at', { ascending: false }),
    ]);

    const totalAndroidPages = Math.max(1, Math.ceil((androidCount || 0) / ANDROID_PAGE_SIZE));
    for (let p = 2; p <= totalAndroidPages; p += 1) {
      add(`/android/page/${p}`, { lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 });
    }

    (androidList || []).forEach((item: Pick<AndroidApp, 'name' | 'created_at'>) => {
      const namePath = encodeURIComponent(item.name);
      add(`/android/${namePath}`, {
        lastModified: item.created_at ? new Date(item.created_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  }

  // Mac list pagination and detail pages
  {
    const MAC_PAGE_SIZE = 24; // Keep in sync with MacList.tsx
    const [{ count: macCount }, { data: macList }] = await Promise.all([
      supabase.from('mac_app').select('name', { count: 'exact', head: true }),
      supabase.from('mac_app').select('name, created_at').order('created_at', { ascending: false }),
    ]);

    const totalMacPages = Math.max(1, Math.ceil((macCount || 0) / MAC_PAGE_SIZE));
    for (let p = 2; p <= totalMacPages; p += 1) {
      add(`/mac/page/${p}`, { lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 });
    }

    (macList || []).forEach((item: Pick<MacApp, 'name' | 'created_at'>) => {
      const namePath = encodeURIComponent(item.name);
      add(`/mac/${namePath}`, {
        lastModified: item.created_at ? new Date(item.created_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  }

  // Windows list pagination and detail pages
  {
    const WINDOWS_PAGE_SIZE = 24; // Keep in sync with WindowsList.tsx
    const [{ count: winCount }, { data: windowsList }] = await Promise.all([
      supabase.from('windows_app').select('name', { count: 'exact', head: true }),
      supabase.from('windows_app').select('name, created_at').order('created_at', { ascending: false }),
    ]);

    const totalWinPages = Math.max(1, Math.ceil((winCount || 0) / WINDOWS_PAGE_SIZE));
    for (let p = 2; p <= totalWinPages; p += 1) {
      add(`/windows/page/${p}`, { lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 });
    }

    (windowsList || []).forEach((item: Pick<WindowsApp, 'name' | 'created_at'>) => {
      const namePath = encodeURIComponent(item.name);
      add(`/windows/${namePath}`, {
        lastModified: item.created_at ? new Date(item.created_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  }

  // AI detail pages
  {
    const { data: navItems } = await supabase
      .from('web_navigation')
      .select('name, collection_time')
      .order('collection_time', { ascending: false });
    (navItems || []).forEach((item: Pick<WebNavigation, 'name' | 'collection_time'>) => {
      const namePath = encodeURIComponent(item.name);
      add(`/ai/${namePath}`, {
        lastModified: item.collection_time ? new Date(item.collection_time) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  }

  return items;
}
