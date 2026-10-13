"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Download,
  Wifi,
  Printer,
  Wrench,
  FileText,
  ScanLine,
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
    <section className="w-full min-h-[90vh] bg-gradient-to-b from-[#f4f8ff] to-[#f7faff] text-[#10204a] overflow-hidden flex flex-col justify-between">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 w-full my-auto py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-14">
          
          {/* =====================
              LEFT CONTENT (span 7 columns)
          ====================== */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* Heading */}
            <h1 className="text-[34px] font-extrabold leading-[1.12] tracking-tight text-[#10204a] sm:text-[44px] lg:text-[52px]">
              Smart Printer Setup &{" "}
              <span className="text-[#2564e5] bg-gradient-to-r from-[#2564e5] to-[#1a4bc8] bg-clip-text text-transparent">
                Troubleshooting
              </span>
            </h1>

            {/* Subheading & Description Container */}
            <div className="mt-5 space-y-2.5">
              <h2 className="text-[19px] sm:text-[21px] font-bold text-[#162744] leading-snug">
                Set Up, Connect & Troubleshoot Your Printer
              </h2>
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#536582] max-w-[600px]">
                Get step-by-step help with printer setup, HP printer setup, connecting a printer to a computer or WiFi, printer offline issues, printer not connecting, printer not printing, driver installation, and scanner problems.
              </p>
            </div>

            {/* Main CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={openModelSearch}
                className="inline-flex h-[50px] items-center justify-center gap-2.5 rounded-xl bg-[#2564e5] px-7 text-[15px] font-semibold text-white shadow-lg shadow-[#2564e5]/25 transition-all duration-200 hover:bg-[#1d53c4]"
              >
                <Printer size={18} />
                Start Printer Setup
                <ArrowRight size={16} className="ml-1" />
              </button>

              <button
                type="button"
                onClick={openModelSearch}
                className="inline-flex h-[50px] items-center justify-center gap-2.5 rounded-xl border border-[#cbd5e1] bg-white px-7 text-[15px] font-semibold text-[#172746] transition-all duration-200 hover:border-[#2564e5] hover:text-[#2564e5] hover:bg-[#f8fbff] shadow-sm"
              >
                <Wrench size={17} className="text-[#2564e5]" />
                Troubleshoot Printer Issues
              </button>
            </div>

          </div>

          {/* =========================
              RIGHT IMAGE AREA (span 5 columns)
          ========================= */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <div 
              className="w-full h-[300px] sm:h-[380px] lg:h-[420px] flex items-center justify-center overflow-hidden rounded-2xl bg-white shadow-xl border border-white/80 p-0 relative group cursor-pointer" 
              onClick={openModelSearch}
            >
              <img
                src="/contttt.webp" 
                alt="Printer technical support"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                onError={(e)=>{
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>

        </div>

        {/* =====================
            GRID ISSUE SELECTOR CARDS (6 CARDS)
        ====================== */}
        <div className="mt-16 lg:mt-20">
          <div className="text-center mb-6">
            <h3 className="text-[19px] sm:text-[20px] font-bold text-[#10204a]">
              Select Your Printer Issue
            </h3>
            <p className="text-[13px] text-[#536582] mt-1">Choose an option below to get targeted assistance</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            
            {/* 1. New Printer Setup */}
            <button
              type="button"
              onClick={openModelSearch}
              className="group flex flex-col items-center text-center rounded-2xl border border-[#dce4ef] bg-white p-5 shadow-sm transition-all duration-200 hover:border-[#2564e5] hover:shadow-md hover:-translate-y-1"
            >
              <div className="mb-3 flex h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#e8f0ff] text-[#2564e5] transition group-hover:bg-[#2564e5] group-hover:text-white">
                <Printer size={24} />
              </div>
              <h4 className="text-[13px] font-bold text-[#162744] leading-snug">New Printer Setup</h4>
              <p className="mt-1 text-[11px] leading-tight text-[#75839a]">Set up and configure a new printer.</p>
            </button>

            {/* 2. Printer Showing Offline */}
            <button
              type="button"
              onClick={openModelSearch}
              className="group flex flex-col items-center text-center rounded-2xl border border-[#dce4ef] bg-white p-5 shadow-sm transition-all duration-200 hover:border-[#2564e5] hover:shadow-md hover:-translate-y-1"
            >
              <div className="mb-3 flex h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#e8f0ff] text-[#2564e5] transition group-hover:bg-[#2564e5] group-hover:text-white">
                <Wifi size={24} />
              </div>
              <h4 className="text-[13px] font-bold text-[#162744] leading-snug">Printer Showing Offline</h4>
              <p className="mt-1 text-[11px] leading-tight text-[#75839a]">Troubleshoot common printer offline and connection issues.</p>
            </button>

            {/* 3. Connect Printer to Wifi */}
            <button
              type="button"
              onClick={openModelSearch}
              className="group flex flex-col items-center text-center rounded-2xl border border-[#dce4ef] bg-white p-5 shadow-sm transition-all duration-200 hover:border-[#2564e5] hover:shadow-md hover:-translate-y-1"
            >
              <div className="mb-3 flex h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#e8f0ff] text-[#2564e5] transition group-hover:bg-[#2564e5] group-hover:text-white">
                <Wifi size={24} />
              </div>
              <h4 className="text-[13px] font-bold text-[#162744] leading-snug">Connect Printer to Wifi</h4>
              <p className="mt-1 text-[11px] leading-tight text-[#75839a]">Connect a wireless printer to your WiFi network.</p>
            </button>

            {/* 4. Printer Not Printing */}
            <button
              type="button"
              onClick={openModelSearch}
              className="group flex flex-col items-center text-center rounded-2xl border border-[#dce4ef] bg-white p-5 shadow-sm transition-all duration-200 hover:border-[#2564e5] hover:shadow-md hover:-translate-y-1"
            >
              <div className="mb-3 flex h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#e8f0ff] text-[#2564e5] transition group-hover:bg-[#2564e5] group-hover:text-white">
                <FileText size={24} />
              </div>
              <h4 className="text-[13px] font-bold text-[#162744] leading-snug">Printer Not Printing</h4>
              <p className="mt-1 text-[11px] leading-tight text-[#75839a]">Check WiFi, USB, network, and computer connectivity.</p>
            </button>

            {/* 5. Install Printer Driver */}
            <button
              type="button"
              onClick={openModelSearch}
              className="group flex flex-col items-center text-center rounded-2xl border border-[#dce4ef] bg-white p-5 shadow-sm transition-all duration-200 hover:border-[#2564e5] hover:shadow-md hover:-translate-y-1"
            >
              <div className="mb-3 flex h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#e8f0ff] text-[#2564e5] transition group-hover:bg-[#2564e5] group-hover:text-white">
                <Download size={24} />
              </div>
              <h4 className="text-[13px] font-bold text-[#162744] leading-snug">Install Printer Driver</h4>
              <p className="mt-1 text-[11px] leading-tight text-[#75839a]">Find and install the appropriate software for your printer.</p>
            </button>

            {/* 6. Scanner Not Working */}
            <button
              type="button"
              onClick={openModelSearch}
              className="group flex flex-col items-center text-center rounded-2xl border border-[#dce4ef] bg-white p-5 shadow-sm transition-all duration-200 hover:border-[#2564e5] hover:shadow-md hover:-translate-y-1"
            >
              <div className="mb-3 flex h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#e8f0ff] text-[#2564e5] transition group-hover:bg-[#2564e5] group-hover:text-white">
                <ScanLine size={24} />
              </div>
              <h4 className="text-[13px] font-bold text-[#162744] leading-snug">Scanner Not Working</h4>
              <p className="mt-1 text-[11px] leading-tight text-[#75839a]">Troubleshoot common printer scanning and connection problems.</p>
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}