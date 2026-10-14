"use client";

import { useEffect } from 'react';

export default function ConversionTracker() {
    useEffect(() => {
        if (window.location.pathname.replace(/\/+$/, '') !== '/printer-setup-troubleshooting/installation-failed') return;
        if (window.__installationFailedConversionSent) return;

        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () {
            window.dataLayer.push(arguments);
        };
        window.__installationFailedConversionSent = true;
        window.gtag('event', 'conversion', {
            send_to: 'AW-18114921677/BbFRCPXCu6gcEM2J771D',
            value: 1.0,
            currency: 'USD',
        });
    }, []);

    return null;
}
