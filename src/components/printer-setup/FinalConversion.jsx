
"use client";

import React from "react";
import Image from "next/image";

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
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white px-6 py-8 sm:px-10 sm:py-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left Content */}
          <div className="text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
              <span
                className="h-2 w-2 rounded-full bg-blue-600"
                aria-hidden="true"
              />
              Printer support
            </span>

            <h2 className="mt-5 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              Need Printer Setup Help or Troubleshooting Assistance?
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              Whether you are adding a printer to your computer, connecting to
              WiFi, resolving offline errors, or installing drivers, start with
              the instructions above. If the issue continues, contact Smart
              Print Help to discuss available assistance options.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={openJivoChat}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white transition duration-200 hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
              >
                Get Printer Setup Help
                <span aria-hidden="true">→</span>
              </button>

              <button
                type="button"
                onClick={openJivoChat}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition duration-200 hover:border-blue-700 hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
              >
                Chat About Your Printer Issue
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          {/* Right Image Section - Replace the image path */}
         <div className="relative flex min-h-[280px] items-center justify-center sm:min-h-[360px] lg:min-h-[420px]">
  <div className="relative w-full max-w-[560px] overflow-hidden rounded-2xl">
    <Image
      src="/contttt.webp"
      alt="Printer setup and troubleshooting support"
      width={700}
      height={560}
      priority={false}
      sizes="(max-width: 1024px) 100vw, 50vw"
      className="h-auto w-full object-contain"
    />
  </div>
</div>
        </div>
      </div>
    </section>
  );
}

export default FinalConversion;
