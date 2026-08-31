export function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const vercelForwarded = request.headers.get('x-vercel-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cloudflareIp = request.headers.get('cf-connecting-ip');
  const candidate = forwarded?.split(',')[0]?.trim()
    || vercelForwarded?.split(',')[0]?.trim()
    || realIp?.trim()
    || cloudflareIp?.trim();

  return candidate || 'unknown';
}

export function getClientCountry(request) {
  return request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry') || 'unknown';
}

export function getRequestSecurityInfo(request) {
  return {
    timestamp: new Date().toISOString(),
    ip: getClientIp(request),
    country: getClientCountry(request),
    path: new URL(request.url).pathname,
    method: request.method,
    userAgent: request.headers.get('user-agent') || 'missing',
    referer: request.headers.get('referer') || 'none',
    rawHeaders: {
      xForwardedFor: request.headers.get('x-forwarded-for') || null,
      xVercelForwardedFor: request.headers.get('x-vercel-forwarded-for') || null,
      xRealIp: request.headers.get('x-real-ip') || null,
      cfConnectingIp: request.headers.get('cf-connecting-ip') || null,
      xVercelIpCountry: request.headers.get('x-vercel-ip-country') || null,
      cfIpCountry: request.headers.get('cf-ipcountry') || null,
    },
  };
}

export function logSecurity(request, action, reason, extra = {}) {
  const info = getRequestSecurityInfo(request);
  console.log('[SECURITY]', { ...info, action, ...(reason ? { reason } : {}), ...extra });
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function isValidEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function verifyRecaptchaToken(token, expectedAction) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const allowedHostnames = (process.env.RECAPTCHA_ALLOWED_HOSTNAMES || '')
    .split(',')
    .map((hostname) => hostname.trim().toLowerCase())
    .filter(Boolean);
  if (!secret || typeof token !== 'string' || token.length === 0 || token.length > 4096) {
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret,
        response: token,
      }),
      cache: 'no-store',
    });
    const result = await response.json();
    return response.ok &&
      result.success === true &&
      (!expectedAction || result.action === expectedAction) &&
      Number(result.score) >= 0.5 &&
      (allowedHostnames.length === 0 || allowedHostnames.includes(String(result.hostname || '').toLowerCase()));
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

