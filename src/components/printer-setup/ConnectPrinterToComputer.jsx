"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const windowsSteps = [
  "Turn on the printer and connect it by USB or to the appropriate network.",
  "Open Settings → Bluetooth & devices → Printers & scanners.",
  "Select Add device and wait for available printers.",
  "Choose the printer and complete the installation prompts.",
  "If it is not detected, use available manual-add options or the manufacturer’s setup instructions.",
  "Set it as default if desired and print a test page.",
];

const macSteps = [
  "Turn on the printer and connect it to USB or the network.",
  "Open System Settings → Printers & Scanners.",
  "Choose Add Printer, Scanner, or Fax.",
  "Select the printer and compatible software or AirPrint where supported.",
  "Complete setup and print a test page.",
];

function ConnectPrinterToComputer() {
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
      aria-labelledby="connect-printer-heading"
      className="w-full bg-slate-50 px-4 py-14 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-4xl text-center">
          <h2
            id="connect-printer-heading"
            className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
          >
            Connect Printer to Computer – Windows &amp; Mac Setup Guide
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            Trying to add a printer to your computer but cannot find the
            device? Many printers connect through USB or WiFi, and some office
            models support Ethernet. Select the supported method and follow the
            operating-system steps below.
          </p>
        </header>

        <div className="mt-10 grid gap-10 border-t border-slate-200 pt-8 md:grid-cols-2 md:gap-12">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              How to Add a Printer to Windows 11
            </h3>
            <ol className="mt-4">
              {windowsSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex items-start gap-4 border-b border-slate-200 py-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-800">
                    {index + 1}
                  </span>
                  <p className="pt-0.5 text-sm leading-7 text-slate-700">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900">
              How to Connect a Printer to Mac
            </h3>
            <ol className="mt-4">
              {macSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex items-start gap-4 border-b border-slate-200 py-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-800">
                    {index + 1}
                  </span>
                  <p className="pt-0.5 text-sm leading-7 text-slate-700">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <p className="mx-auto max-w-4xl text-center text-sm leading-7 text-slate-600 sm:text-base">
            Computer not detecting the printer? Check power, cable/port,
            network membership, drivers, firewall/network discovery, and the
            printer’s wireless connection.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={openJivoChat}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
            >
              Connect Printer to Computer
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConnectPrinterToComputer;
