
"use client";

import React from "react";

function FinalConversion() {
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
    <section className="w-full bg-gradient-to-b from-slate-50 to-white px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center shadow-xl shadow-slate-200/60 sm:px-10 sm:py-14">
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" aria-hidden="true" />
          Printer support
        </span>

        <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Need Printer Setup Help or Troubleshooting Assistance?
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
          Whether you are adding a printer to your computer, connecting to WiFi,
          resolving offline errors, or installing drivers, start with the
          instructions above. If the issue continues, contact Smart Print Help
          to discuss available assistance options.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={openJivoChat}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 active:translate-y-0"
          >
            Get Printer Setup Help
            <span aria-hidden="true">→</span>
          </button>

          <button
            type="button"
            onClick={openJivoChat}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition duration-200 hover:-translate-y-0.5 hover:border-blue-700 hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 active:translate-y-0"
          >
            Chat About Your Printer Issue
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default FinalConversion;
