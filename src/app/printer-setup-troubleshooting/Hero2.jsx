"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Printer,
  Wrench,
  Power,
  Download,
  Wifi,
  AlertTriangle,
  FileImage,
} from "lucide-react";
import { openSetupChat } from "./chatSupport";

export default function Hero2() {
  const router = useRouter();
  const [allowStartNow, setAllowStartNow] = useState(true);

  useEffect(() => {
    fetch("/api/hp-setup/settings")
      .then((res) => res.json())
      .then((data) => setAllowStartNow(data.allowStartNow !== false))
      .catch(() => setAllowStartNow(true));
  }, []);

  const openModelSearch = () => {
    if (allowStartNow) {
      router.push("/printer-setup-troubleshooting/model-search");
      return;
    }

    openSetupChat();
  };

  return (
    <div className="w-full bg-[#f4f6f9] min-h-screen flex flex-col justify-between">
      {/* =========================================
          HERO BANNER (TOP SECTION)
      ========================================= */}
      <section
        className="w-full py-12 sm:py-16 md:py-20 flex flex-col items-center justify-center relative px-4 text-center text-white overflow-hidden shrink-0"
        style={{
          backgroundImage: "url('/hero_background_image.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
  

        <div className="relative z-10 max-w-[1000px] mx-auto flex flex-col items-center justify-center h-full">
          {/* Main Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight mb-3 drop-shadow-md">
            Smart Printer Setup & Troubleshooting
          </h1>

          {/* Subtitle - Single line on large screens */}
          <p className="text-xs sm:text-sm md:text-base text-blue-50 font-normal max-w-[800px] lg:max-w-none lg:whitespace-nowrap leading-relaxed mb-7 drop-shadow">
            Setup, offline errors, WiFi drops, driver issues — guided solutions that get you printing again in minutes.
          </p>

          {/* Hero Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto px-4 sm:px-0">
            <button
              type="button"
              onClick={openModelSearch}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <Printer size={18} />
              Quick Setup
            </button>

            <button
              type="button"
              onClick={openModelSearch}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <Wrench size={18} />
              Easy Troubleshooting
            </button>
          </div>
        </div>
      </section>

      {/* =========================================
          ISSUE SELECTOR GRID (BOTTOM SECTION)
      ========================================= */}
      <section className="w-full max-w-[1220px] mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16 flex-1 flex flex-col justify-center">
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#111827]">
            Choose Your Issue
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm mt-2 font-medium">
            Select an option below for smart printer setup and troubleshooting.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          
          {/* Card 1: New Printer Setup */}
          <div className="bg-white rounded-[2rem] p-7 sm:p-8 border-2 border-gray-200/90 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between items-start text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#eef4ff] text-[#0052cc] flex items-center justify-center mb-5">
                <Printer size={24} />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#0052cc] mb-2">
                New Printer Setup
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                New printer in the box? Go from unboxed to first print without the hassle.
              </p>
            </div>
            <button
              type="button"
              onClick={openModelSearch}
              className="w-full bg-[#0052cc] hover:bg-[#003e99] text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition-colors duration-200 shadow-md text-center"
            >
              Start Printer Setup
            </button>
          </div>

          {/* Card 2: Printer Shows Offline */}
          <div className="bg-white rounded-[2rem] p-7 sm:p-8 border-2 border-gray-200/90 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between items-start text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#eef4ff] text-[#0052cc] flex items-center justify-center mb-5">
                <Power size={24} />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#0052cc] mb-2">
                Printer Shows Offline
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                Printer showing offline again? Get it back online in minutes — for good.
              </p>
            </div>
            <button
              type="button"
              onClick={openModelSearch}
              className="w-full bg-[#0052cc] hover:bg-[#003e99] text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition-colors duration-200 shadow-md text-center"
            >
              Fix Offline Printer
            </button>
          </div>

          {/* Card 3: Install Printer Drivers */}
          <div className="bg-white rounded-[2rem] p-7 sm:p-8 border-2 border-gray-200/90 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between items-start text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#eef4ff] text-[#0052cc] flex items-center justify-center mb-5">
                <Download size={24} />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#0052cc] mb-2">
                Install Printer Drivers
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                Wrong or outdated drivers? Get the exact match for your model installed.
              </p>
            </div>
            <button
              type="button"
              onClick={openModelSearch}
              className="w-full bg-[#0052cc] hover:bg-[#003e99] text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition-colors duration-200 shadow-md text-center"
            >
              Install Printer Drivers
            </button>
          </div>

          {/* Card 4: WiFi Connection Drops */}
          <div className="bg-white rounded-[2rem] p-7 sm:p-8 border-2 border-gray-200/90 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between items-start text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#eef4ff] text-[#0052cc] flex items-center justify-center mb-5">
                <Wifi size={24} />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#0052cc] mb-2">
                WiFi Connection Drops
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                Tired of your printer vanishing from WiFi? Lock in a connection that lasts.
              </p>
            </div>
            <button
              type="button"
              onClick={openModelSearch}
              className="w-full bg-[#0052cc] hover:bg-[#003e99] text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition-colors duration-200 shadow-md text-center"
            >
              Fix Connectivity Issue
            </button>
          </div>

          {/* Card 5: Error Codes / Not Detected */}
          <div className="bg-white rounded-[2rem] p-7 sm:p-8 border-2 border-gray-200/90 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between items-start text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#eef4ff] text-[#0052cc] flex items-center justify-center mb-5">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#0052cc] mb-2">
                Error Codes / Not Detected
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                Flashing lights or cryptic errors? Get a real diagnosis, not guesswork.
              </p>
            </div>
            <button
              type="button"
              onClick={openModelSearch}
              className="w-full bg-[#0052cc] hover:bg-[#003e99] text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition-colors duration-200 shadow-md text-center"
            >
              Diagnose Printer Error
            </button>
          </div>

          {/* Card 6: Scanner Not Working */}
          <div className="bg-white rounded-[2rem] p-7 sm:p-8 border-2 border-gray-200/90 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between items-start text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#eef4ff] text-[#0052cc] flex items-center justify-center mb-5">
                <FileImage size={24} />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#0052cc] mb-2">
                Scanner Not Working?
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                Blank scans or streaky pages? Bring back crisp, clean prints today.
              </p>
            </div>
            <button
              type="button"
              onClick={openModelSearch}
              className="w-full bg-[#0052cc] hover:bg-[#003e99] text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition-colors duration-200 shadow-md text-center"
            >
              Fix Scanner Issue
            </button>
          </div>

        </div>

        {/* Footer Help Text */}
        <div className="text-center mt-10 sm:mt-12 text-xs sm:text-sm text-[#111827] font-semibold px-2">
          Need more help? Connect with our live chat support team for quick assistance.
        </div>
      </section>
    </div>
  );
}