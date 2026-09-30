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
    <section className="relative w-full bg-white text-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[350px] lg:min-h-[365px]">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-7 py-10 lg:py-12 text-center lg:text-left">

            <h1
              className="
                text-2xl
                sm:text-3xl
                md:text-4xl
                lg:text-[30px]
                xl:text-[32px]
                font-extrabold
                tracking-tight
                text-black
                mb-5
                leading-tight
                whitespace-nowrap
              "
            >
              Printer Setup Help &amp;{" "}
              <span className="text-[#024bd8]">
                Troubleshooting
              </span>
            </h1>

            <p
              className="
                text-sm
                sm:text-base
                md:text-[17px]
                text-gray-700
                max-w-2xl
                mx-auto
                lg:mx-0
                leading-relaxed
                mb-4
                font-normal
              "
            >
              Need help setting up your printer or getting it connected again?
              Find straightforward guidance for HP printer setup, HP Smart
              setup, WiFi connections, printer offline issues, adding a printer
              to your computer, driver installation, and other common printer
              problems.
            </p>

            <p
              className="
                text-xs
                sm:text-sm
                text-gray-500
                font-medium
                mb-6
              "
            >
              Choose what you need help with below to get started.
            </p>

            {/* BUTTONS */}
            <div
              className="
                flex
                flex-col
                sm:flex-row
                items-center
                justify-center
                lg:justify-start
                gap-4
              "
            >
              {/* PRIMARY BUTTON */}
              <button
                onClick={handleGetStarted}
                className="
                  w-full
                  sm:w-auto
                  px-7
                  py-3
                  rounded-full
                  bg-[#024bd8]
                  hover:bg-[#023fb5]
                  active:scale-[0.98]
                  text-white
                  font-semibold
                  text-sm
                  transition-all
                  duration-200
                  cursor-pointer
                  flex
                  items-center
                  justify-center
                  gap-2
                  border
                  border-[#024bd8]
                "
              >
                <span>Get Started</span>

                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>

              {/* SECONDARY BUTTON */}
              <button
                onClick={() => handleScrollTo("issue-selection")}
                className="
                  w-full
                  sm:w-auto
                  px-7
                  py-3
                  rounded-full
                  bg-white
                  hover:bg-gray-50
                  active:scale-[0.98]
                  text-black
                  border
                  border-gray-300
                  font-semibold
                  text-sm
                  transition-all
                  duration-200
                  cursor-pointer
                  flex
                  items-center
                  justify-center
                  gap-2
                "
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
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* RIGHT SLIDER */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-6 lg:py-0">

            <div className="relative w-full flex items-center justify-center">

              {/* PREVIOUS ARROW */}
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="
                  absolute
                  left-0
                  lg:-left-2
                  z-10
                  p-1
                  text-black
                  hover:text-[#024bd8]
                  transition-colors
                  duration-200
                  cursor-pointer
                "
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* IMAGE - NO BORDER / NO CARD / NO SHADOW */}
              <div className="w-full h-[230px] sm:h-[260px] lg:h-[285px] flex items-center justify-center">
                <img
                  src={slides[currentIndex].image}
                  alt={slides[currentIndex].alt}
                  className="
                    w-full
                    h-full
                    object-contain
                    transition-opacity
                    duration-300
                    select-none
                  "
                />
              </div>

              {/* NEXT ARROW */}
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="
                  absolute
                  right-0
                  lg:-right-2
                  z-10
                  p-1
                  text-black
                  hover:text-[#024bd8]
                  transition-colors
                  duration-200
                  cursor-pointer
                "
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero2;