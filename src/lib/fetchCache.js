// Simple fetch cache to deduplicate identical requests within a time window
const fetchCache = new Map();
const CACHE_TTL = 5000; // 5 seconds

export async function cachedFetch(url, options = {}) {
  const cacheKey = `${url}:${JSON.stringify(options)}`;
  
  // Return cached result if available and not expired
  if (fetchCache.has(cacheKey)) {
    const cached = fetchCache.get(cacheKey);
    if (Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.promise;
    }
    fetchCache.delete(cacheKey);
  }

  // Create the fetch promise
  const promise = fetch(url, { ...options, cache: 'no-store' })
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    });

  // Store promise in cache with timestamp
  fetchCache.set(cacheKey, {
    promise,
    timestamp: Date.now(),
  });

  try {
    const result = await promise;
    return result;
  } catch (error) {
    // Remove from cache on error
    fetchCache.delete(cacheKey);
    throw error;
  }
}

// Clear old cache entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, { timestamp }] of fetchCache.entries()) {
    if (now - timestamp > CACHE_TTL * 2) {
      fetchCache.delete(key);
    }
  }
}, CACHE_TTL);
