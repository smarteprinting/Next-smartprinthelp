"use client";
import { useEffect } from "react";
import { usePathname } from 'next/navigation';

const ScrollToTop = () => {
    const { pathname } = { pathname: usePathname() };

    useEffect(() => {
        // Scroll to top whenever the path changes
        window.scrollTo({
            top: 0,
            behavior: "smooth", // optional, remove if you want instant scroll
        });
    }, [pathname]);

    return null; // no UI
};

export default ScrollToTop;
