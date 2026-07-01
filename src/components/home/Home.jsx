"use client";
import React from "react";
import { usePathname } from 'next/navigation';

import HomeCategorySections from "./HomeCategorySections";
import PrintingDestination from "./PrintingDestination";

const Home = () => {
    const location = { pathname: usePathname() };

    return (
        <div className="w-full bg-white min-h-screen relative">
            {/* Category Sections: Home → Office → Inkjet → Laser → Ink & Toner */}
            <HomeCategorySections />

            {/* Printing Destination Section */}
            <PrintingDestination />
        </div>
    );
};

export default Home;
