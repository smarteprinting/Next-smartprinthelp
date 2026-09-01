import { checkDistributedRateLimit, RATE_LIMITS } from '@/lib/securityRateLimit';
import { getClientIp, logSecurity } from '@/lib/security';
import { NextResponse } from 'next/server';

export async function checkApiRateLimit(request, scope = 'api') {
  try {
    const clientIp = getClientIp(request);
    const settings = RATE_LIMITS[scope];

    const result = await checkDistributedRateLimit({
      identifier: clientIp,
      scope,
      ...settings,
    });

    if (!result.allowed) {
      logSecurity(request, 'BLOCK', 'RATE_LIMIT', { scope, path: request.nextUrl.pathname });
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }

    return null; // Allowed, continue
  } catch (error) {
    console.error('Rate limit check error:', error);
    return null; // Fail open - allow request if rate limit service is down
  }
}
