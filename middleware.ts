import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/printer-setup/:path*'],
};

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isRootPath = pathname === '/printer-setup' || pathname === '/printer-setup/';
  const isSettingsPath = pathname.startsWith('/printer-setup/settings');

  if (isRootPath || isSettingsPath) {
    return NextResponse.next();
  }

  try {
    const apiUrl = new URL('/api/printer-setup/settings', req.url);
    const res = await fetch(apiUrl, { method: 'GET', cache: 'no-store' });
    if (!res.ok) {
      return NextResponse.next();
    }

    const data = await res.json();
    if (data.allowStartNow === false) {
      return NextResponse.redirect(new URL('/printer-setup/', req.url));
    }
  } catch (error) {
    console.error('Printer setup middleware error:', error);
  }

  return NextResponse.next();
}
