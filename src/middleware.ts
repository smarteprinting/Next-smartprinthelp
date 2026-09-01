import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getClientCountry, getClientIp, logSecurity } from './lib/security';

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const ip = getClientIp(req);
  const country = getClientCountry(req);

  // Skip logging for static assets
  const staticFilePattern = /\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|woff|woff2|ttf|eot|map)$/i;
  const isStaticFile = staticFilePattern.test(pathname);

  if (!isStaticFile) {
    console.info(
      '[traffic]',
      JSON.stringify({
        ip,
        method: req.method,
        path: pathname,
        country: country || 'unknown',
      }),
    );
  }

  const contentLength = Number(req.headers.get('content-length') || 0);
  if (contentLength > 64 * 1024) {
    logSecurity(req, 'BLOCK', 'REQUEST_TOO_LARGE', { contentLength });
    return NextResponse.json({ error: 'Request body is too large.' }, { status: 413 });
  }

  const userAgent = req.headers.get('user-agent') || '';
  const suspiciousSignals = [
    !userAgent && 'MISSING_USER_AGENT',
    /headless|phantomjs|selenium|playwright|puppeteer/i.test(userAgent) && 'AUTOMATION_INDICATOR',
  ].filter(Boolean);

  if (suspiciousSignals.length > 0) {
    logSecurity(req, 'LOG', 'SUSPICIOUS_SIGNALS_DETECTED', { suspiciousSignals });
  }

  if (pathname === '/printer-setup' || pathname.startsWith('/printer-setup/')) {
    const targetPath = pathname.replace('/printer-setup', '/printer-setup-and-troubleshooting');
    return NextResponse.redirect(new URL(targetPath === '/printer-setup-and-troubleshooting' ? '/printer-setup-and-troubleshooting/' : targetPath, req.url));
  }

  return NextResponse.next();
}