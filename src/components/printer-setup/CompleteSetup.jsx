"use client";
import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import SetupProgressModal from './SetupProgressModal';
import BrandFooter from './BrandFooter';

const brandConfigs = {
  HP: {
    displayName: 'HP',
    logo: "/hp-bg.png",
    printerImg: "/hp-printer-software.png",
    bgImage: "/hero_background_image.jpg",
    installButtonBgColor: "#279ACB",
    installButtonTextColor: "text-white",
    installButtonHoverColor: "#1f7fb4",
    installButtonShadowColor: "rgba(39, 154, 203, 0.35)",
    appName: 'HP Smart App',
    heading: 'Complete setup using HP Smart App',
    description: 'HP Smart App will connect the printer to your computer, install print drivers, and set up scanning features (if applicable).',
    steps: ['Make sure your HP printer is powered on.', 'Install HP Smart App to complete setup.'],
    buttonLabel: 'Install HP Smart App',
    footerText: 'To use all available printer features, install HP Smart App on your mobile device or download the latest software for Windows or macOS. Available on:',
  },
  Brother: {
    displayName: 'Brother',
    logo: "/brother-bg.png",
    printerImg: "/brother-bg-image-bg.png",
    bgImage: "/brother-bg-setup.webp",
    installButtonBgColor: "#3751A9",
    installButtonTextColor: "text-white",
    installButtonHoverColor: "#2d4290",
    installButtonShadowColor: "rgba(55, 81, 169, 0.35)",
    appName: 'Brother Mobile Connect',
    heading: 'Complete setup using Brother Mobile Connect',
    description: 'The Brother Mobile Connect app helps connect your printer, install the latest printer drivers, and set up printing and scanning features for compatible devices.',
    steps: ['Turn on your Brother printer.', 'Install Brother Mobile Connect to complete the setup.'],
    buttonLabel: 'Install Brother Mobile Connect',
    footerText: 'To use all supported printer features, install Brother Mobile Connect on your mobile device or download the latest software for Windows or macOS. Available on:',
  },
  EPSON: {
    displayName: 'Epson',
    logo: "/epson-bg.png",
    printerImg: "/epson-bg-image-bg.png",
    bgImage: "/epson-bg-setup.webp",
    installButtonBgColor: "#3751A9",
    installButtonTextColor: "text-white",
    installButtonHoverColor: "#2d4290",
    installButtonShadowColor: "rgba(55, 81, 169, 0.35)",
    appName: 'Epson Smart Panel',
    heading: 'Complete setup using Epson Smart Panel',
    description: 'The Epson Smart Panel app makes it easy to connect your printer, install the required printer software, and configure printing and scanning features for your device.',
    steps: ['Ensure your Epson printer is turned on.', 'Install Epson Smart Panel to finish the printer setup.'],
    buttonLabel: 'Install Epson Smart Panel',
    footerText: 'For the best printing experience and access to all supported features, install Epson Smart Panel on your mobile device or download the latest software for Windows or macOS. Available on:',
  },
  Canon: {
    displayName: 'Canon',
    logo: "/canon-bg.png",
    printerImg: "/canon-image-bg.png",
    bgImage: "/canon-bg-setup.webp",
    installButtonBgColor: "#8D3343",
    installButtonTextColor: "text-white",
    installButtonHoverColor: "#6c2735",
    installButtonShadowColor: "rgba(141, 51, 67, 0.35)",
    appName: 'Canon PRINT App',
    heading: 'Complete setup using Canon PRINT App',
    description: 'The Canon PRINT app helps connect your printer to your computer or mobile device, install the latest printer drivers, and enable printing and scanning features (when supported).',
    steps: ['Make sure your Canon printer is powered on.', 'Install the Canon PRINT app to complete the setup process.'],
    buttonLabel: 'Install Canon PRINT App',
    footerText: 'To access all available printer features, install the Canon PRINT app on your mobile device or download the latest software for Windows or macOS. Available on:',
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

function CompleteSetup() {
  const navigate = useRouter();
  const { brand } = useParams();
  const resolvedBrand = normalizeBrand(brand);
  const config = brandConfigs[resolvedBrand] || brandConfigs.HP;
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('Authorized User');
  const [printerModel, setPrinterModel] = useState('');

  const handleInstallClick = () => {
    const defaultName = 'Authorized User';
    const resolvedModel = typeof window !== 'undefined' ? (window.localStorage.getItem('modelSearchInput') || 'Officejet') : 'Officejet';

    setUserName(defaultName);
    setPrinterModel(resolvedModel);
    setShowModal(true);

    fetch('/api/printer-setup/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: defaultName,
        model: resolvedModel,
      }),
    })
      .then(() => {})
      .catch(() => {});
  };

  if (showModal) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
        <SetupProgressModal
          open={showModal}
          onClose={() => setShowModal(false)}
          user={userName}
          printer={printerModel}
          onError={() => navigate.push(`/printer-setup/installation-failed/${brand || 'HP'}`)}
        />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <section
        className="w-full min-h-[560px] flex items-start justify-center relative px-[6%]"
        style={{
          height: '560px',
          backgroundImage: `url(${config.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-full max-w-[1200px] flex flex-row items-start justify-between relative h-full">
          <div className="flex flex-col justify-center h-full w-full max-w-[700px] pt-8">
            <h1 className="text-white text-3xl md:text-4xl mb-8 leading-tight drop-shadow-lg">{config.heading}</h1>
            <p className="text-white text-lg md:text-xl mb-6 font-normal drop-shadow whitespace-normal">{config.description}</p>
            <ol className="text-white text-lg mb-6 pl-6 list-decimal">
              {config.steps.map((step, index) => (
                <li key={`${step}-${index}`} className={index === 0 ? 'mb-1' : ''}>{step}</li>
              ))}
            </ol>
            <button
              className="font-semibold px-7 py-3 rounded-full text-lg transition mb-6 w-fit border-2"
              style={{
                backgroundColor: '#ffffff',
                color: config.installButtonBgColor || '#279ACB',
                borderColor: config.installButtonBgColor || '#279ACB',
                boxShadow: `0 12px 28px ${config.installButtonShadowColor || 'rgba(39,154,203,0.28)'}`,
              }}
              onClick={handleInstallClick}
            >
              {config.buttonLabel}
            </button>
            <div className="bg-transparent text-white text-sm md:text-base mb-4">
              {config.footerText}
            </div>
            <div className="flex flex-row gap-3 mb-2">
              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
              <img src="https://get.microsoft.com/images/en-us%20dark.svg" alt="Microsoft Store" className="h-10 object-contain" />
            </div>
          </div>
          <div className="hidden md:flex flex-col items-start h-full absolute right-12 bottom-0 z-10">
            <div className="relative flex flex-col items-start">
              <img
                src={config.printerImg || "/hp-printer-software.png"}
                alt={`${config.displayName || 'Printer'} Printer Software`}
                className="h-[170px] w-auto max-w-none drop-shadow-xl"
                style={{ marginTop: '200px' }}
              />
              <span className="absolute left-1/2 -translate-x-1/2 bottom-2 text-white text-xs font-normal drop-shadow bg-black/30 px-2 rounded whitespace-nowrap">
                {config.displayName || 'Printer'} Printer Software
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between mt-12 px-4 mb-12">
        <div className="flex-1 mb-8 md:mb-0">
          <p className="text-lg text-gray-800 mb-4">Install {config.displayName} software and drivers on each device you want to print from.</p>
          <p className="text-lg text-gray-800">Need additional help? Visit <a href="#" className="text-blue-600 underline hover:text-blue-800">{config.displayName} Support</a></p>
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          {config.logo && (
            <img src={config.logo} alt={`${config.displayName} Logo`} style={{ width: '160px', height: '60px', objectFit: 'contain', background: 'none', borderRadius: 0 }} />
          )}
        </div>
      </div>

      {brand && <BrandFooter brand={brand} />}
    </div>
  );
}

export default CompleteSetup;
