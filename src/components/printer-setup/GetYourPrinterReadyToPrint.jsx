"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const setupSteps = [
  "Prepare the printer: remove packaging, connect power, install cartridges and load paper according to the manual.",
  "Choose USB, WiFi, or Ethernet depending on the printer and computer.",
  "Establish the selected connection using the printer’s controls or manufacturer instructions.",
  "Install compatible drivers, preferably from the manufacturer’s official support website, if the operating system does not install them automatically.",
  "Open Windows or Mac printer settings and add the printer.",
  "Print a test page to verify successful setup.",
];

function GetYourPrinterReadyToPrint() {
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
      aria-labelledby="printer-setup-guide-heading"
      className="w-full bg-white px-4 py-14 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-4xl text-center">
          <h2
            id="printer-setup-guide-heading"
            className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
          >
            Printer Setup Help – Get Your Printer Ready to Print
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            Setting up a printer involves more than connecting the power cable.
            Your printer must be correctly configured, connected to your
            computer or network, and recognized by your operating system before
            printing. These steps apply to many home and office printers,
            although model-specific procedures vary.
          </p>
        </header>

        <div className="mt-10 border-t border-slate-200 pt-8 sm:mt-12">
          <h3 className="text-xl font-bold text-slate-900">
            How to Set Up a New Printer
          </h3>

          <ol className="mt-5 grid gap-x-12 sm:grid-cols-2">
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
            <p className="mx-auto max-w-3xl text-center text-sm leading-7 text-slate-600 sm:text-base">
              If installation fails, check power, connection status, driver
              compatibility, and any error messages.
            </p>
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={openJivoChat}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
              >
                Get Printer Setup Help
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GetYourPrinterReadyToPrint;