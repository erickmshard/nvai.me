import { NextResponse } from 'next/server';
import { createClient } from '@/db/supabase/client';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');

  if (!name) {
    return new NextResponse('Missing name', { status: 400 });
  }

  const supabase = createClient();
  const { data, error } = await supabase.from('android_app').select('download_url').eq('name', name).maybeSingle();

  if (error || !data?.download_url) {
    return new NextResponse('Not found', { status: 404 });
  }

  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: data.download_url,
      'X-Robots-Tag': 'noindex, nofollow',
      'Referrer-Policy': 'no-referrer',
      'Cache-Control': 'no-store',
    },
  });
}
