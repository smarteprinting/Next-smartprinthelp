"use client";

import React, { useState } from "react";

const hpNavItems = ["Home", "OfficeJet", "InkJet", "LaserJet", "Envy"];

const Header = ({ showLogo = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative w-full h-20 bg-white py-2 flex items-center px-[15vw]">
      <nav className="w-full flex items-center justify-between">
        {/* HP Logo */}
        <div className="flex items-center">
          {showLogo && (
            <img
              src="/hp-bg.png"
              alt="HP Logo"
              className="w-[120px] h-[48px] object-contain"
            />
          )}
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex flex-row gap-10 items-center ml-auto">
          {hpNavItems.map((item) => (
            <li key={item}>
              <span className="text-gray-800 text-lg font-normal hover:font-semibold transition cursor-pointer">
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center ml-auto">
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-7 h-7 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <ul className="absolute top-20 left-0 w-full bg-white flex flex-col items-center gap-4 py-6 z-50 md:hidden border-t border-gray-100">
            {hpNavItems.map((item) => (
              <li key={item}>
                <span className="text-gray-800 text-lg font-normal hover:font-semibold transition cursor-pointer">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;