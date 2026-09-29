"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const Hero2 = () => {
  const router = useRouter();

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative w-full bg-white text-black py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">

            {/* Exactly one H1 as specified */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-black mb-6 leading-tight">
              Printer Setup Help &amp; <span className="text-[#024bd8]">Troubleshooting</span>
            </h1>

            {/* Exact text from Section 4 */}
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-6 font-normal">
              Need help setting up your printer or getting it connected again? Find straightforward guidance for HP printer setup, HP Smart setup, WiFi connections, printer offline issues, adding a printer to your computer, driver installation, and other common printer problems.
            </p>

            <p className="text-sm sm:text-base text-gray-500 font-medium mb-8">
              Choose what you need help with below to get started.
            </p>

            {/* Primary and Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => router.push('/printer-setup-troubleshooting/model-search')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#024bd8] hover:bg-[#023fb5] active:scale-95 text-white font-semibold text-base shadow-lg shadow-[#024bd8]/20 transition-all cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Get Started</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              <button
                onClick={() => handleScrollTo('issue-selection')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-gray-50 active:scale-95 text-black border border-gray-300 font-semibold text-base shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Troubleshoot an Issue</span>
                <svg className="w-4 h-4 text-[#024bd8] transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column: Image Placeholder with subtle border */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">

              {/* Image container with a softer, clean gray border */}
              <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-gray-50 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80"
                  alt="Printer Setup Illustration"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero2;