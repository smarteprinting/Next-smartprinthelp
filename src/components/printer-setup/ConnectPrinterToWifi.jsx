"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const setupSteps = [
  "Turn on the printer and open its wireless/network settings.",
  "Select WiFi setup or follow the model-specific button/app procedure.",
  "Choose the correct wireless network (SSID).",
  "Enter the WiFi password carefully.",
  "Confirm the connection using the wireless indicator or network status page.",
  "Add the printer to your computer or mobile device.",
];

function ConnectPrinterToWifi() {
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
      aria-labelledby="connect-printer-wifi-heading"
      className="w-full bg-white px-4 py-14 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-4xl text-center">
         <h2
  id="connect-printer-wifi-heading"
  className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
>
  Connect Printer to WiFi – Wireless Printer Setup Guide
</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            Wireless setup lets compatible computers and mobile devices print
            without a direct USB cable. An incorrect network password, weak
            signal, incompatible wireless settings, or an old saved network may
            prevent connection.
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
            If it will not connect, check the password, move closer to the
            router, restart devices, confirm supported frequency/security
            settings, and verify that the printer is not using an old network.
            Avoid a factory reset unless necessary.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={openJivoChat}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
            >
              Get Wireless Printer Setup Help
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConnectPrinterToWifi;
