"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { redirect } from 'next/navigation';

/**
 * Enforces trailing slashes on all routes except root.
 * Redirects /about to /about/ (preserving query/hash), using replace: true.
 * Usage: Place <TrailingSlashRedirect /> at the top of your App component.
 */
export default function TrailingSlashRedirect() {
  const location = { pathname: usePathname() };
  const router = useRouter();

  useEffect(() => {
    const { pathname, search, hash } = location;
    if (
      pathname !== '/' &&
      !pathname.endsWith('/') &&
      !pathname.match(/\.[a-zA-Z0-9]{2,5}$/) // don't redirect files like .js, .css, .png
    ) {
      router.push(pathname + '/' + search + hash, { replace: true });
    }
    // eslint-disable-next-line
  }, [location.pathname, location.search, location.hash, navigate]);

  return null;
}