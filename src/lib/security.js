export function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const vercelForwarded = request.headers.get('x-vercel-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const candidate = forwarded?.split(',')[0]?.trim() || vercelForwarded?.split(',')[0]?.trim() || realIp?.trim();
  return candidate || 'unknown';
}

export function getRequestSecurityInfo(request) {
  return {
    timestamp: new Date().toISOString(),
    ip: getClientIp(request),
    path: new URL(request.url).pathname,
    method: request.method,
    userAgent: request.headers.get('user-agent') || 'missing',
    referer: request.headers.get('referer') || 'none',
  };
}

export function logSecurity(request, action, reason, extra = {}) {
  const info = getRequestSecurityInfo(request);
  console.log('[SECURITY]', JSON.stringify({ ...info, action, ...(reason ? { reason } : {}), ...extra }));
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

