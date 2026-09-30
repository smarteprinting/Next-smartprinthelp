"use client";
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function ClientLayout({ children }) {
    const [allowStartNow, setAllowStartNow] = useState(true);
    const pathname = usePathname();
    const router = useRouter();

    // Fetch settings only once on mount
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/hp-setup/settings');
                const data = await res.json();
                setAllowStartNow(data.allowStartNow !== false);

                const isRootPath = pathname === '/printer-setup-troubleshooting' || pathname === '/printer-setup-troubleshooting/';
                const isSettingsPath = pathname?.startsWith('/printer-setup-troubleshooting/settings');

                // Redirect to root if start now is disabled and user is on a subpage
                if (data.allowStartNow === false && !isRootPath && !isSettingsPath) {
                    router.push('/printer-setup-troubleshooting/');
                }
            } catch (error) {
                console.error('Failed to fetch HP settings:', error);
            }
        };

        fetchSettings();
    }, [pathname, router]);

    // Just render children normally - no conditional rendering
    return <>{children}</>;
}
