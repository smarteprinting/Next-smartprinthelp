"use client";

import { useEffect, useRef } from 'react';

export default function ConversionTracker() {
    const conversionSent = useRef(false);

    useEffect(() => {
        if (conversionSent.current) return;
        conversionSent.current = true;

        window.dataLayer = window.dataLayer || [];
        if (typeof window.gtag !== 'function') {
            window.gtag = function () {
                window.dataLayer.push(arguments);
            };
        }

        window.gtag('event', 'conversion', {
            send_to: 'AW-18114921677/BbFRCPXCu6gcEM2J771D',
            value: 1.0,
            currency: 'USD',
        });
    }, []);

    return null;
}
