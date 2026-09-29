"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const FinalConversion = () => {
  const router = useRouter();
  const triggerAssistance = () => {
    router.push('/printer-setup-troubleshooting/model-search');
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white border-t border-slate-800/80 relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,75,216,0.08)_0,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-5 tracking-tight text-white">
          Still Need Help With Your Printer?
        </h2>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-4 max-w-3xl mx-auto">
          If your printer still won't connect, continues showing offline, or you're having trouble completing setup, choose the issue that best matches your problem and continue with the relevant troubleshooting steps.
        </p>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-10 max-w-3xl mx-auto">
          Smart Print Help provides information and assistance for common printer setup and connectivity topics, including HP printer setup, HP Smart setup, HP printer offline issues, printer connection problems, WiFi setup, adding printers to computers, driver installation, printing problems, and scanner troubleshooting.
        </p>

        <button
          onClick={triggerAssistance}
          style={{ backgroundColor: '#024bd8' }}
          className="group px-8 py-4 rounded-2xl hover:opacity-90 active:scale-95 text-white font-bold text-base shadow-lg shadow-[#024bd8]/30 transition-all duration-200 cursor-pointer inline-flex items-center gap-3"
        >
          <span>Get Printer Assistance</span>
          <svg
            className="w-5 h-5 transform transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default FinalConversion;