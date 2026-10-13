"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const installationSteps = [
  "Identify the printer manufacturer and exact model.",
  "Check the Windows or macOS version.",
  "Visit the manufacturer’s official support website.",
  "Download compatible drivers/software.",
  "Run the installer and choose the correct connection type.",
  "Restart if prompted, verify the printer appears, and print a test page.",
];

function PrinterDriverInstallation() {
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
      aria-labelledby="printer-driver-installation-heading"
      className="w-full bg-slate-50 px-4 py-14 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-4xl text-center">
         <h2
  id="printer-driver-installation-heading"
  className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
>
  Printer Driver Installation &amp; Software Setup
</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            Drivers and supporting software help the computer recognize the
            printer and access available functions. Modern operating systems
            often install basic drivers automatically, while scanning or
            maintenance functions may require additional official software.
          </p>
        </header>

        <ol className="mt-10 grid gap-x-12 border-t border-slate-200 pt-4 sm:grid-cols-2">
          {installationSteps.map((step, index) => (
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
            If installation fails, check compatibility, disk space,
            permissions, and conflicting installers. Do not download printer
            drivers from unverified sources.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={openJivoChat}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
            >
              Explore Printer Driver Setup
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrinterDriverInstallation;