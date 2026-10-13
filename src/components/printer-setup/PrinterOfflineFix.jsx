"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const troubleshootingSteps = [
  "Restart the printer and computer; restart the router when appropriate.",
  "Open the print queue and clear stuck jobs; resume the queue if paused.",
  "On Windows, check that Use Printer Offline is not enabled, where available.",
  "Confirm that the correct printer—not an old duplicate—is selected.",
  "Check compatible drivers and update or reinstall them using official instructions if needed.",
  "Print a test page after restoring communication.",
];

function PrinterOfflineFix() {
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
      aria-labelledby="printer-offline-heading"
      className="w-full bg-slate-50 px-4 py-14 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-4xl text-center">
         <h2
  id="printer-offline-heading"
  className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
>
  Printer Offline Fix – Why Is My Printer Offline?
</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            A printer may show offline even while powered on because the
            computer cannot communicate with it or believes it is unavailable.
            Common causes include a disconnected WiFi network, incorrect
            printer selection, paused or stuck queue, incompatible driver,
            cable problem, or device error.
          </p>
        </header>

        <div className="mt-10 border-t border-slate-200 pt-8">
          <h3 className="text-xl font-bold text-slate-900">
            How to Fix Printer Offline Issues
          </h3>

          <ol className="mt-4 grid gap-x-12 sm:grid-cols-2">
            <li className="flex items-start gap-4 border-b border-slate-200 py-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                1
              </span>
              <p className="pt-1 text-sm leading-7 text-slate-700 sm:text-base">
                Check that the printer is powered on, ready, and free of
                displayed errors.
              </p>
            </li>
            <li className="flex items-start gap-4 border-b border-slate-200 py-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                2
              </span>
              <p className="pt-1 text-sm leading-7 text-slate-700 sm:text-base">
                Verify the WiFi, Ethernet, or USB connection.
              </p>
            </li>
            {troubleshootingSteps.map((step, index) => (
              <li
                key={step}
                className="flex items-start gap-4 border-b border-slate-200 py-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                  {index + 3}
                </span>
                <p className="pt-1 text-sm leading-7 text-slate-700 sm:text-base">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-7">
          <p className="mx-auto max-w-4xl text-center text-sm leading-7 text-slate-600 sm:text-base">
            If the printer still shows offline, investigate network
            configuration, driver conflicts, or model-specific errors.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={openJivoChat}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
            >
              Troubleshoot Printer Offline Issues
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrinterOfflineFix;