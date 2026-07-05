"use client";
import React from 'react';
import { useParams } from 'next/navigation';

const brandSupportNumbers = {
  HP: '+1 (855) 618-4642',
  Brother: '+1 (855) 618-4642',
  EPSON: '+1 (855) 618-4642',
  Canon: '+1 (855) 618-4642',
};

const brandThemes = {
  HP: {
    accent: '#279ACB',
    accentDark: '#1f7fb4',
    overlayStart: 'rgba(39, 154, 203, 0.82)',
    overlayEnd: 'rgba(17, 74, 108, 0.72)',
    shadow: 'rgba(39, 154, 203, 0.28)',
    bgImage: '/hero_background_image.jpg',
  },
  Brother: {
    accent: '#3751A9',
    accentDark: '#2d4290',
    overlayStart: 'rgba(55, 81, 169, 0.84)',
    overlayEnd: 'rgba(33, 48, 104, 0.7)',
    shadow: 'rgba(55, 81, 169, 0.28)',
    bgImage: '/brother-bg-setup.webp',
  },
  EPSON: {
    accent: '#3751A9',
    accentDark: '#2d4290',
    overlayStart: 'rgba(55, 81, 169, 0.84)',
    overlayEnd: 'rgba(33, 48, 104, 0.7)',
    shadow: 'rgba(55, 81, 169, 0.28)',
    bgImage: '/epson-bg-setup.webp',
  },
  Canon: {
    accent: '#8D3343',
    accentDark: '#6c2735',
    overlayStart: 'rgba(141, 51, 67, 0.84)',
    overlayEnd: 'rgba(90, 30, 42, 0.72)',
    shadow: 'rgba(141, 51, 67, 0.28)',
    bgImage: '/canon-bg-setup.webp',
  },
};

function normalizeBrand(value) {
  const normalizedValue = (value || '').toString().trim().toLowerCase();

  if (['canon', 'canon print', 'canon printer'].includes(normalizedValue)) {
    return 'Canon';
  }

  if (['epson', 'epson printer'].includes(normalizedValue)) {
    return 'EPSON';
  }

  if (['brother', 'brother printer'].includes(normalizedValue)) {
    return 'Brother';
  }

  if (['hp', 'hp smart', 'hp smart app'].includes(normalizedValue)) {
    return 'HP';
  }

  return 'HP';
}

export default function InstallationFailedPage() {
  const { brand } = useParams();
  const resolvedBrand = normalizeBrand(brand);
  const supportNumber = brandSupportNumbers[resolvedBrand] || brandSupportNumbers.HP;
  const brandName = resolvedBrand === 'EPSON' ? 'Epson' : resolvedBrand;
  const theme = brandThemes[resolvedBrand] || brandThemes.HP;

  return (
    <div
      className="md:min-h-[91vh] min-h-screen flex flex-col justify-center items-center bg-cover bg-center px-2"
      style={{
        backgroundImage: `linear-gradient(135deg, ${theme.overlayStart} 0%, ${theme.overlayEnd} 100%), url('${theme.bgImage}')`,
      }}
    >
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center animate-fadeIn mt-10 mb-10" style={{ boxShadow: `0 20px 50px ${theme.shadow}` }}>
        <div className="rounded-full p-6 mb-8 shadow-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accentDark} 100%)`, boxShadow: `0 14px 30px ${theme.shadow}` }}>
          <i className="fa-solid fa-shield-halved text-5xl text-white drop-shadow-lg"></i>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center tracking-tight">
          Printer Driver Installation Error
        </h2>
        <div className="text-center font-bold mb-8 text-lg" style={{ color: theme.accent }}>
          We encountered an issue completing the {brandName} printer driver installation due to <span className="font-extrabold">error 1603</span>.
        </div>
        <div className="text-center text-black font-extrabold mb-4 text-2xl">
          Contact {brandName} Support to Resolve this Issue
        </div>
        <div className="text-center text-gray-800 mb-6 text-lg">
          Toll-Free (USA/CA): <span className="font-bold text-black text-xl">{supportNumber}</span>
        </div>
        <button
          className="mx-auto font-bold py-3 px-8 rounded-xl text-lg flex items-center justify-center transition-all shadow-xl gap-2 mb-8 border-2"
          style={{
            backgroundColor: '#ffffff',
            color: theme.accent,
            borderColor: theme.accent,
            boxShadow: `0 12px 25px ${theme.shadow}`,
          }}
          onClick={() => {
            if (window.jivo_api && typeof window.jivo_api.open === 'function') {
              window.jivo_api.open();
            } else {
              alert('Chat support is not available yet.');
            }
          }}
          type="button"
        >
          <i className="fa-solid fa-comments text-xl"></i> Chat Now <span className="ml-1">&#187;</span>
        </button>
        <div className="text-center font-semibold mt-2 text-base" style={{ color: theme.accent }}>
          Note: For best results, avoid repeatedly attempting the installation without proper guidance, as it may not resolve the issue. Our experts are here to help you complete the setup correctly.
        </div>
      </div>
    </div>
  );
}
