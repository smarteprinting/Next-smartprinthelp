"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const slides = [
  {
    image: "/slide-1.png",
    alt: "Printer Setup Illustration 1",
  },
  {
    image: "/slide-2.png",
    alt: "Printer Setup Illustration 2",
  },
];

const Hero2 = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allowStartNow, setAllowStartNow] = useState(true);

  useEffect(() => {
    fetch('/api/hp-setup/settings')
      .then(res => res.json())
      .then(data => setAllowStartNow(data.allowStartNow !== false))
      .catch(() => setAllowStartNow(true));
  }, []);

  const handleGetStarted = () => {
    if (allowStartNow) {
      router.push("/printer-setup-troubleshooting/model-search");
    } else {
      if (window.jivo_api && typeof window.jivo_api.open === 'function') {
        window.jivo_api.open();
      } else {
        alert('Chat support is currently unavailable.');
      }
    }
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-slate-50/50 via-white to-white text-slate-900 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[380px] lg:min-h-[400px] gap-8 py-6">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-7 py-6 lg:py-10 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[32px] xl:text-[34px] font-black tracking-tight text-slate-900 mb-5 leading-[1.15]">
              Printer Setup Help &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#024bd8] to-blue-600">
                Troubleshooting
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-[17px] text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-4 font-normal">
              Need help setting up your printer or getting it connected again?
              Find straightforward guidance for HP printer setup, HP Smart
              setup, WiFi connections, printer offline issues, adding a printer
              to your computer, driver installation, and other common printer
              problems.
            </p>

            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-6">
              Choose what you need help with below to get started.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              {/* PRIMARY BUTTON */}
              <button
                onClick={handleGetStarted}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#024bd8] hover:bg-[#023fb5] active:scale-[0.98] text-white font-semibold text-sm transition-all duration-200 shadow-sm shadow-blue-500/20 hover:shadow-md hover:shadow-blue-500/30 cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Click Here for Printer Setup</span>
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>

              {/* SECONDARY BUTTON */}
              <button
                onClick={handleGetStarted}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-800 border border-slate-200/80 hover:border-slate-300 font-semibold text-sm transition-all duration-200 shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Troubleshoot an Issue</span>
                <svg
                  className="w-4 h-4 text-[#024bd8]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* RIGHT SLIDER */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-4 lg:py-0">
            <div className="relative w-full max-w-md bg-gradient-to-b from-blue-50/40 to-slate-50/50 border border-slate-100 rounded-3xl p-6 shadow-sm flex items-center justify-center">

              {/* PREVIOUS ARROW */}
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-[#024bd8] shadow-sm border border-slate-100 transition-all duration-200 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* IMAGE CONTAINER */}
              <div className="w-full h-[220px] sm:h-[250px] lg:h-[270px] flex items-center justify-center px-6">
                <img
                  src={slides[currentIndex].image}
                  alt={slides[currentIndex].alt}
                  className="w-full h-full object-contain transition-all duration-500 ease-in-out select-none drop-shadow-sm"
                />
              </div>

              {/* NEXT ARROW */}
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-[#024bd8] shadow-sm border border-slate-100 transition-all duration-200 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* SLIDER DOTS INDICATOR (Added for better UX) */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex === index ? "w-6 bg-[#024bd8]" : "w-1.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero2;