"use client";
import React, { useState, useEffect, useRef } from 'react';
import PrinterHeader from './PrinterHeader';
import { usePathname, useRouter } from 'next/navigation';

export default function ClientLayout({ children }) {
  const [showLogo, setShowLogo] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [allowStartNow, setAllowStartNow] = useState(true);
  const pathname = usePathname();
  const router = useRef(useRouter());

  // Fetch settings only once on mount
  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const res = await fetch('/api/printer-setup/settings');
        const data = await res.json();
        setShowHeader(data.showHeader === true);
        setShowLogo(data.showLogo === true);
        setAllowStartNow(data.allowStartNow !== false);

        const isRootPath = pathname === '/printer-setup-and-troubleshooting' || pathname === '/printer-setup-and-troubleshooting/';
        const isSettingsPath = pathname?.startsWith('/printer-setup-and-troubleshooting/settings');

        // Redirect to root if start now is disabled and user is on a subpage
        if (data.allowStartNow === false && !isRootPath && !isSettingsPath) {
          router.current.push('/printer-setup-and-troubleshooting/');
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
        setShowHeader(false);
        setShowLogo(false);
      } finally {
        setSettingsLoaded(true);
      }
    };

    fetchHeader();
  }, []); // Empty dependency array - fetch only once on mount

  const isRootPath = pathname === '/printer-setup-and-troubleshooting' || pathname === '/printer-setup-and-troubleshooting/';
  const isSettingsPath = pathname?.startsWith('/printer-setup-and-troubleshooting/settings');
  const shouldHideHeader = isRootPath || isSettingsPath;

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
