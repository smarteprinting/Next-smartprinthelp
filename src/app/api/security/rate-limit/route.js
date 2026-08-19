import { NextResponse } from 'next/server';
import { checkDistributedRateLimit, RATE_LIMITS } from '@/lib/securityRateLimit';
import { getClientIp, logSecurity } from '@/lib/security';

export async function POST(request) {
  if (process.env.NODE_ENV === 'production' && request.headers.get('x-security-check') !== process.env.SECURITY_INTERNAL_TOKEN) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const path = typeof body?.path === 'string' ? body.path : '/';
  const method = typeof body?.method === 'string' ? body.method : 'GET';
  const clientIp = typeof body?.clientIp === 'string' ? body.clientIp : getClientIp(request);
  const scope = path === '/printer-setup-and-troubleshooting' || path === '/printer-setup-and-troubleshooting/'
    ? 'landing'
    : path.startsWith('/api/auth/')
      ? 'auth'
    : path.startsWith('/api/')
      ? 'api'
      : 'global';
  const settings = RATE_LIMITS[scope];
  const result = await checkDistributedRateLimit({
    identifier: clientIp,
    scope,
    ...settings,
  });

  if (!result.allowed) {
    logSecurity(request, 'BLOCK', 'RATE_LIMIT', { scope, targetPath: path, targetMethod: method });
  }

  return NextResponse.json(result, {
    status: result.allowed ? 200 : 429,
    headers: {
      'Cache-Control': 'no-store',
      'X-RateLimit-Limit': String(settings.limit),
      'X-RateLimit-Remaining': String(result.remaining),
      'X-RateLimit-Reset': result.resetAt.toISOString(),
    },
  });
}