import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getClientIp, logSecurity } from './src/lib/security';

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/security/rate-limit).*)'],
};

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

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

  try {
    const securityResponse = await fetch(new URL('/api/security/rate-limit', req.url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-security-check': process.env.SECURITY_INTERNAL_TOKEN || 'local-development',
      },
      body: JSON.stringify({ path: pathname, method: req.method, clientIp: getClientIp(req) }),
      cache: 'no-store',
    });

    if (securityResponse.status === 429) {
      logSecurity(req, 'BLOCK', 'RATE_LIMIT', { suspiciousSignals });
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }

    if (!securityResponse.ok) {
      throw new Error(`Security check returned ${securityResponse.status}`);
    }

    const rateLimit = await securityResponse.json().catch(() => ({}));
    logSecurity(req, 'ALLOW', suspiciousSignals.length ? 'SUSPICIOUS_SIGNALS_LOGGED' : undefined, {
      suspiciousSignals,
      rateLimitRemaining: rateLimit.remaining,
    });
  } catch (error) {
    // Security telemetry must not take the site offline if MongoDB is unavailable.
    logSecurity(req, 'ALLOW', 'RATE_LIMIT_SERVICE_UNAVAILABLE');
  }

  if (pathname === '/printer-setup' || pathname.startsWith('/printer-setup/')) {
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
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'x-printer-settings-check': '1' },
      cache: 'no-store',
    });
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
