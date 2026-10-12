"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const commonErrors = [
  {
    title: "Printer not detected",
    description:
      "Check power, network or USB connection, and supported drivers.",
  },
  {
    title: "Printer connected but not printing",
    description:
      "Check selected printer, print queue, paper/cartridge errors, and test-page output.",
  },
  {
    title: "Installation failed",
    description:
      "Verify software compatibility and retry using the official manufacturer instructions.",
  },
  {
    title: "Printer driver unavailable",
    description:
      "Find a compatible driver on the manufacturer’s official website.",
  },
  {
    title: "Wireless printer disconnects",
    description:
      "Check signal strength, router settings, printer power behavior, and recent network changes.",
  },
  {
    title: "Print jobs stuck in queue",
    description:
      "Cancel stuck jobs and restart the printing process; advanced spooler troubleshooting may be required.",
  },
];

function PrinterNotConnected() {
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
      aria-labelledby="printer-errors-heading"
      className="w-full bg-white px-4 py-14 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="printer-errors-heading"
          className="text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
        >
          Printer Not Connecting? Troubleshoot Common Printer Errors
        </h2>

        <div className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {commonErrors.map(({ title, description }) => (
            <article
              key={title}
              className="border-t border-slate-200 py-6"
            >
              <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={openJivoChat}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
          >
            Get Help With Printer Connection Issues
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default PrinterNotConnected;