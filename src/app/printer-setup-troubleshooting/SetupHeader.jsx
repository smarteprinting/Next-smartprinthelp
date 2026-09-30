"use client";

import React, { useState } from "react";

function SetupHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white text-black">

      {/* Main Header */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">

        <div className="h-[82px] flex items-center justify-between">

          {/* LEFT — Wordmark */}
          <a href="#" className="flex items-center gap-3 shrink-0">
            <div className="flex flex-col leading-none">
              <span className="text-[22px] font-extrabold tracking-[-0.04em]">
                PRINT
              </span>

              <span className="text-[10px] font-semibold tracking-[0.25em] text-[#024bd8] mt-1">
                GUIDE CENTER
              </span>
            </div>
          </a>

          {/* CENTER — Navigation */}
          <nav className="hidden lg:flex items-center gap-8">

            <a
              href="#"
              className="relative py-7 text-sm font-semibold text-black group"
            >
              Setup
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#024bd8] group-hover:w-full transition-all duration-200" />
            </a>

            <a
              href="#"
              className="relative py-7 text-sm font-semibold text-gray-600 hover:text-black group"
            >
              Connection
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#024bd8] group-hover:w-full transition-all duration-200" />
            </a>

            <a
              href="#"
              className="relative py-7 text-sm font-semibold text-gray-600 hover:text-black group"
            >
              Troubleshooting
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#024bd8] group-hover:w-full transition-all duration-200" />
            </a>

            <a
              href="#"
              className="relative py-7 text-sm font-semibold text-gray-600 hover:text-black group"
            >
              Drivers
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#024bd8] group-hover:w-full transition-all duration-200" />
            </a>

          </nav>

          {/* RIGHT — Utility */}
          <div className="hidden md:flex items-center gap-5">

            <button
              className="
                flex
                items-center
                gap-2
                text-sm
                font-medium
                text-gray-600
                hover:text-[#024bd8]
                transition-colors
              "
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.35-4.35m1.35-5.15a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                />
              </svg>

              Search
            </button>

            <span className="h-5 w-px bg-gray-200" />

            <a
              href="#"
              className="
                text-sm
                font-semibold
                text-[#024bd8]
                hover:text-[#023fb5]
              "
            >
              Guide
            </a>

          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              lg:hidden
              w-10
              h-10
              flex
              items-center
              justify-center
              border
              border-gray-200
              rounded-md
            "
            aria-label="Toggle navigation"
          >
            {menuOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* BLUE ACCENT */}
      <div className="h-[3px] bg-[#024bd8]" />

      {/* SECONDARY INFO STRIP */}
      <div className="border-b border-gray-200 bg-[#fafafa]">

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">

          <div className="min-h-[42px] flex items-center justify-between">

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-900">
                Printer Setup Guide
              </span>

              <span className="text-gray-300">/</span>

              <span className="text-xs text-gray-500">
                Find the right guide for your printer
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-5">

              <a
                href="#"
                className="text-xs text-gray-500 hover:text-[#024bd8]"
              >
                Setup Guide
              </a>

              <a
                href="#"
                className="text-xs text-gray-500 hover:text-[#024bd8]"
              >
                Common Issues
              </a>

              <a
                href="#"
                className="text-xs text-gray-500 hover:text-[#024bd8]"
              >
                Contact
              </a>

            </div>

          </div>

        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="lg:hidden border-b border-gray-200 bg-white">

          <nav className="max-w-[1400px] mx-auto px-5 py-3">

            <a
              href="#"
              className="block py-3 text-sm font-semibold"
            >
              Setup
            </a>

            <a
              href="#"
              className="block py-3 text-sm font-semibold text-gray-600"
            >
              Connection
            </a>

            <a
              href="#"
              className="block py-3 text-sm font-semibold text-gray-600"
            >
              Troubleshooting
            </a>

            <a
              href="#"
              className="block py-3 text-sm font-semibold text-gray-600"
            >
              Drivers
            </a>

            <a
              href="#"
              className="block py-3 text-sm font-semibold text-[#024bd8]"
            >
              Guide
            </a>

          </nav>
        </div>
      )}

    </header>
  );
}

export default SetupHeader;