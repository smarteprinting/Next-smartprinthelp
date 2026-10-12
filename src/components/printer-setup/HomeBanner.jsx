"use client";

import React from "react";
import {
  ArrowRight,
  Download,
  HelpCircle,
  Laptop,
  MessageCircle,
  Printer,
  Wifi,
} from "lucide-react";

const HomeBanner = () => {
  const quickLinks = [
    { label: "Printer Setup", href: "#faq-question-0", Icon: Printer },
    { label: "Computer Connection", href: "#faq-question-0", Icon: Laptop },
    { label: "Wireless Setup", href: "#faq-question-3", Icon: Wifi },
    { label: "Offline Troubleshooting", href: "#faq-question-2", Icon: HelpCircle },
    { label: "Driver Installation", href: "#faq-question-8", Icon: Download },
  ];

  const openJivoChat = () => {
    const tryOpenChat = () => {
      if (window.jivo_api && typeof window.jivo_api.open === "function") {
        window.jivo_api.open();
        return true;
      }
      return false;
    };

    if (tryOpenChat()) return;

    const timeoutAt = Date.now() + 10000;
    const intervalId = window.setInterval(() => {
      if (tryOpenChat()) {
        window.clearInterval(intervalId);
      } else if (Date.now() >= timeoutAt) {
        window.clearInterval(intervalId);
        window.alert("Chat support is currently unavailable.");
      }
    }, 100);
  };

  return (
    <section
      aria-labelledby="printer-setup-banner-heading"
      className="w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-12 text-slate-900 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Top Hero Section: Split Layout (Text 60% / Image Banner 40%) */}
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,60fr)_minmax(0,40fr)] lg:gap-12">
          {/* Left Column: All Text Content & Primary Buttons (~60% width) */}
          <div className="min-w-0">
            <h1
              id="printer-setup-banner-heading"
              className="text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl"
            >
              Printer Setup Help – Connect, Install &amp; Troubleshoot Your
              Printer
            </h1>

            <p className="mt-5 text-base leading-8 text-slate-700">
              Need help setting up a new printer or fixing a connection issue?
              Get step-by-step printer setup help to connect your printer to a
              Windows computer, Mac, or WiFi network. Whether your printer is
              showing offline, not connecting, or not printing, find practical
              troubleshooting instructions and guidance to help you get back
              to printing.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-600">
              From installing printer drivers to resolving wireless
              connectivity problems, Smart Print Help helps you understand
              common printer issues and the steps needed to address them.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={openJivoChat}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition hover:-translate-y-0.5 hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 active:translate-y-0"
              >
                Get Printer Setup Help
                <ArrowRight size={18} aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={openJivoChat}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition hover:-translate-y-0.5 hover:border-blue-700 hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 active:translate-y-0"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Chat About a Printer Issue
              </button>
            </div>
          </div>

          {/* Right Column: Image Banner (~40% width) */}
          <div className="flex w-full items-center justify-center min-w-0 lg:justify-end">
            <img
              src="/contttt.webp"
              alt="Printer Setup Help and Troubleshooting illustration"
              className="w-full h-auto max-w-sm rounded-2xl object-contain object-center shadow-xl shadow-blue-900/5 lg:max-w-md"
            />
          </div>
        </div>

        {/* Bottom Section: Quick Link Cards (2 Columns on Mobile) */}
        <div className="mt-12 sm:mt-16">
          <nav aria-label="Printer help quick links">
            <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-5">
              {quickLinks.map(({ label, href, Icon }) => (
                <li key={label} className="flex">
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      openJivoChat();
                    }}
                    className="group flex w-full flex-col items-center justify-between rounded-xl sm:rounded-2xl border border-slate-100 bg-white p-4 sm:p-6 text-center shadow-md sm:shadow-xl shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-blue-900/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
                  >
                    <div className="mb-3 sm:mb-4 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-lg sm:rounded-xl bg-blue-50 text-blue-700 transition-colors group-hover:bg-blue-700 group-hover:text-white">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold leading-snug text-slate-900 group-hover:text-blue-700">
                      {label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;