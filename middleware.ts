import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/printer-setup/:path*', '/printer-setup-and-troubleshooting/:path*'],
};

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/printer-setup')) {
    const targetPath = pathname.replace('/printer-setup', '/printer-setup-and-troubleshooting');
    return NextResponse.redirect(new URL(targetPath === '/printer-setup-and-troubleshooting' ? '/printer-setup-and-troubleshooting/' : targetPath, req.url));
  }

  const isRootPath = pathname === '/printer-setup-and-troubleshooting' || pathname === '/printer-setup-and-troubleshooting/';
  const isSettingsPath = pathname.startsWith('/printer-setup-and-troubleshooting/settings');

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
      return NextResponse.redirect(new URL('/printer-setup-and-troubleshooting/', req.url));
    }
  } catch (error) {
    console.error('Printer setup middleware error:', error);
  }

  return NextResponse.next();
}
