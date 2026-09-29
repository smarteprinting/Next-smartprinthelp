"use client";

import React from "react";
import { useRouter } from "next/navigation";

const HomeHero = () => {
    const router = useRouter();

    return (
        <section
            onClick={() => router.push("/printer-setup-troubleshooting/model-search")}
            className="w-full h-screen cursor-pointer relative"
        >
            <img
                src="/banner-1.png"
                alt="Printer Setup and Troubleshooting"
                className="w-full h-full object-cover"
            />
        </section>
    );
};

export default HomeHero;