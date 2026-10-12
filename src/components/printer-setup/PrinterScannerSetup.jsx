"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const setupSteps = [
  "Finish printer setup and verify connectivity.",
  "Check whether the operating system detects the scanner.",
  "Install supported scanning software if required.",
  "Open the scanning application and choose the correct device.",
  "Select resolution, format, and destination.",
  "Scan a test document.",
];

function PrinterScannerSetup() {
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
      aria-labelledby="printer-scanner-setup-heading"
      className="w-full bg-white px-4 py-14 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-4xl text-center">
          <h2
            id="printer-scanner-setup-heading"
            className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
          >
            Printer &amp; Scanner Setup – Configure Your Device
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            Multifunction printers combine printing and scanning. Scanning may
            require separate software or permissions even when printing
            already works.
          </p>
        </header>

        <ol className="mt-10 grid gap-x-12 border-t border-slate-200 pt-4 sm:grid-cols-2">
          {setupSteps.map((step, index) => (
            <li
              key={step}
              className="flex items-start gap-4 border-b border-slate-200 py-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                {index + 1}
              </span>
              <p className="pt-1 text-sm leading-7 text-slate-700 sm:text-base">
                {step}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-7">
          <p className="mx-auto max-w-4xl text-center text-sm leading-7 text-slate-600 sm:text-base">
            If scanning fails, check permissions, software, and network
            communication.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={openJivoChat}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
            >
              Get Printer &amp; Scanner Setup Guidance
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrinterScannerSetup;