"use client";
import React, { useState, useEffect, useRef } from 'react';
import PrinterHeader from './PrinterHeader';
import { usePathname, useRouter } from 'next/navigation';

export default function ClientLayout({ children }) {
  const [showLogo, setShowLogo] = useState(false);
  const [showHeader, setShowHeader] = useState(false); // Default to false to avoid blinking
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [allowStartNow, setAllowStartNow] = useState(true);
  const intervalRef = useRef();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchHeader = () => {
      fetch('/api/printer-setup/settings')
        .then(res => res.json())
        .then(data => {
          setShowHeader(data.showHeader === true); // Only show if explicitly true
          setShowLogo(data.showLogo === true);
          setAllowStartNow(data.allowStartNow !== false);

          const isRootPath = pathname === '/printer-setup' || pathname === '/printer-setup/';
          const isSettingsPath = pathname?.startsWith('/printer-setup/settings');

          // Redirect to root if start now is disabled and user is on a subpage
          if (data.allowStartNow === false && !isRootPath && !isSettingsPath) {
            router.push('/printer-setup/');
          }
          setSettingsLoaded(true);
        })
        .catch(() => {
          setShowHeader(false);
          setShowLogo(false);
          setSettingsLoaded(true);
        });
    };
    fetchHeader();
    intervalRef.current = setInterval(fetchHeader, 10000);
    return () => clearInterval(intervalRef.current);
  }, [pathname, router]);

  const isRootPath = pathname === '/printer-setup' || pathname === '/printer-setup/';
  const isSettingsPath = pathname?.startsWith('/printer-setup/settings');
  const shouldHideHeader = isRootPath || isSettingsPath;

  // Prevent flash of subpage content before redirect
  const shouldRenderChildren = isRootPath || isSettingsPath || (settingsLoaded && allowStartNow);

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideHeader && showHeader && <PrinterHeader showLogo={showLogo} />}
      <div className="flex-grow">
        {shouldRenderChildren ? children : null}
      </div>
    </div>
  );
}
