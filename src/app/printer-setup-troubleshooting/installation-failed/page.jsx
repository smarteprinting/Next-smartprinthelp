"use client";
import React, { useEffect } from 'react';
import Header from '../Header';
import InstallationFailed from './InstallationFailed';

export default function Page() {
    useEffect(() => {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
            window.gtag('event', 'conversion', {
                'send_to': 'AW-18114921677/BbFRCPXCu6gcEM2J771D',
                'value': 1.0,
                'currency': 'USD'
            });
        }
    }, []);

    return (
        <>
            <Header />
            <InstallationFailed />
        </>
    );
}