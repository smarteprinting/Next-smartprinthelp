export function getClientIp(request) {
  // Fallback checks safely for NextRequest objects or standard incoming Node/Edge request objects
  const headers = request.headers;
  if (typeof headers?.get === 'function') {
    return (
      headers.get('x-real-ip') ||
      headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'unknown'
    );
  }
  return 'unknown';
}

export function getClientCountry(request) {
  const headers = request.headers;
  if (typeof headers?.get === 'function') {
    return headers.get('x-vercel-ip-country') || 'unknown';
  }
  return 'unknown';
}

export function getRequestSecurityInfo(request) {
  const url = typeof request.url === 'string' ? new URL(request.url) : { pathname: '/' };
  const headers = request.headers;
  
  return {
    timestamp: new Date().toISOString(),
    ip: getClientIp(request),
    country: getClientCountry(request),
    path: url.pathname,
    method: request.method,
    userAgent: typeof headers?.get === 'function' ? (headers.get('user-agent') || 'missing') : 'missing',
    referer: typeof headers?.get === 'function' ? (headers.get('referer') || 'none') : 'none',
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