import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getClientCountry, getClientIp, logSecurity } from './lib/security';

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)',
  ],
};

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const ip = getClientIp(req);
  const country = getClientCountry(req);
  
  // Skip middleware internal requests (from fetch calls within middleware)
  const isInternalRequest = req.headers.get('x-middleware-internal') === 'true';
  if (isInternalRequest) {
    return NextResponse.next();
  }

  // Skip static files (images, fonts, css, js, etc.)
  const staticFileExtensions = /\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|woff|woff2|ttf|eot|pdf|zip|mp4|webm)$/i;
  const isStaticFile = staticFileExtensions.test(pathname);
  
  if (isStaticFile) {
    return NextResponse.next();
  }

  // Only log frontend routes (not API routes)
  if (!pathname.startsWith('/api/')) {
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

  // Skip rate limiting for localhost
  const isLocalhost = ip === '::1' || ip === '127.0.0.1' || ip === '::ffff:127.0.0.1';
  
  // Only apply security checks to frontend routes (not static files or API routes)
  if (!isLocalhost && !pathname.startsWith('/api/')) {
    try {
      const securityResponse = await fetch(new URL('/api/security/rate-limit', req.url), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-security-check': process.env.SECURITY_INTERNAL_TOKEN || 'local-development',
          'x-middleware-internal': 'true',
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
  } else if (isLocalhost && !pathname.startsWith('/api/')) {
    logSecurity(req, 'ALLOW', 'LOCALHOST_BYPASS', {
      suspiciousSignals,
      rateLimitRemaining: 'N/A',
    });
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

  if (pathname.startsWith('/printer-setup-and-troubleshooting/')) {
    try {
      const apiUrl = new URL('/api/printer-setup/settings', req.url);
      const res = await fetch(apiUrl, {
        method: 'GET',
        headers: { 
          'x-printer-settings-check': '1',
          'x-middleware-internal': 'true',
          'Accept': 'application/json'
        },
        cache: 'no-store',
      });
      
      if (!res.ok) {
        return NextResponse.next();
      }

      // Verify the response is JSON before parsing
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn('Printer setup settings API returned non-JSON response, skipping check');
        return NextResponse.next();
      }

      const data = await res.json();
      if (data.allowStartNow === false) {
        return NextResponse.redirect(new URL('/printer-setup-and-troubleshooting/', req.url));
      }
    } catch (error) {
      console.error('Printer setup middleware error:', error);
    }
  }

  // Handle printer-setup-troubleshooting routes (HP setup - independent flow)
  const isRootPathHP = pathname === '/printer-setup-troubleshooting' || pathname === '/printer-setup-troubleshooting/';
  const isSettingsPathHP = pathname.startsWith('/printer-setup-troubleshooting/settings');

  if (isRootPathHP || isSettingsPathHP) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/printer-setup-troubleshooting/')) {
    try {
      const apiUrl = new URL('/api/hp-setup/settings', req.url);
      const res = await fetch(apiUrl, {
        method: 'GET',
        headers: { 
          'x-hp-settings-check': '1',
          'x-middleware-internal': 'true',
          'Accept': 'application/json'
        },
        cache: 'no-store',
      });
      
      if (!res.ok) {
        return NextResponse.next();
      }

      // Verify the response is JSON before parsing
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn('HP setup settings API returned non-JSON response, skipping check');
        return NextResponse.next();
      }

      const data = await res.json();
      if (data.allowStartNow === false) {
        return NextResponse.redirect(new URL('/printer-setup-troubleshooting/', req.url));
      }
    } catch (error) {
      console.error('HP setup middleware error:', error);
    }
  }

  return NextResponse.next();
}