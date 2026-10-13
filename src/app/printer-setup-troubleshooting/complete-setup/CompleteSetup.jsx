"use client";
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';


import SetupProgressModal from './SetupProgressModal1';

function CompleteSetup({ showCompleteSetup }) {
  
  const pathname = usePathname() || '/complete-setup/';
  const canonicalUrl = `https://www.smartprinthelp.com${pathname}`;
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '');
  // Use local state for printerModel, initialize from localStorage
  const [printerModel, setPrinterModel] = useState(() => localStorage.getItem('printerModel') || '');

  if (showModal) {
    return <div className="fixed inset-0 z-50 bg-white flex items-center justify-center"><SetupProgressModal open={showModal} onClose={() => setShowModal(false)} user={userName} printer={printerModel} onError={() => router.push('/printer-setup-troubleshooting/installation-failed')} /></div>;
  }
  

  return (
    <>
      <Helmet>
        <title>Complete 123.hp.com/setup Steps | HP Printer Setup, Offline Fix & Troubleshooting</title>
        <meta name="description" content="Visit 123.hp.com/setup for HP printer setup help, fix HP printer offline issues, and troubleshoot HP printer errors with step-by-step guidance from Smart Print Help." />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="preload" as="image" href="/hero_background_image.webp" fetchPriority="high" />
      </Helmet>
      <div className="w-full min-h-screen bg-white flex flex-col">
        {/* Top blue section */}
        <section
          className="w-full min-h-[560px] flex items-start justify-center relative px-[6%] overflow-hidden"
          style={{
            height: '560px',
            backgroundImage: 'url(/hero_background_image.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-start justify-between relative h-full">
            <div className="flex flex-col justify-center h-full w-full max-w-[700px] pt-8">
              <h1 className="text-white text-3xl md:text-[2.6rem] font-bold mb-8 leading-tight drop-shadow-lg">Complete setup using HP Smart App</h1>
              <p className="text-white text-lg md:text-xl mb-6 font-normal drop-shadow whitespace-normal">
                HP Smart App will connect the printer to your computer, install print drivers, and set up scanning features (if applicable)
              </p>
              <ol className="text-white text-lg mb-6 pl-6 list-decimal font-medium">
                <li className="mb-1">Make sure your printer is powered on</li>
                <li>Install HP Smart App to complete setup</li>
              </ol>
              <button
                className="bg-white text-blue-700 font-bold px-8 py-3.5 rounded-full text-lg shadow-xl hover:bg-blue-50 transition-all mb-6 w-fit transform hover:scale-105"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Install HP Smart App
              </button>
              <div className="bg-transparent text-white text-sm md:text-base mb-4 font-medium">
                <span className="font-bold">To use all available printer features</span>, you must install the HP Smart app on a mobile device or the latest version of Windows or macOS. Available on:
              </div>
              <div className="flex flex-row gap-4 mb-2">
                <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10 hover:opacity-80 transition cursor-pointer" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10 hover:opacity-80 transition cursor-pointer" />
                <img src="https://get.microsoft.com/images/en-us%20dark.svg" alt="Microsoft Store" className="h-10 object-contain hover:opacity-80 transition cursor-pointer" />
              </div>
            </div>
            <div className="hidden md:flex flex-col items-center h-full absolute right-0 bottom-0 z-10">
              <div className="relative flex flex-col items-center">
                <img
                  src="/hp-printer-software.png"
                  alt="HP Printer Software"
                  className="h-[180px] w-auto max-w-none drop-shadow-2xl"
                  style={{ marginTop: '220px' }}
                />

                <span className="absolute left-1/2 -translate-x-1/2 bottom-2 text-white text-xs font-bold drop-shadow bg-black/40 px-3 py-1 rounded-full whitespace-nowrap">
                  HP Printer Software
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Lower white section */}
        <div className="w-full max-w-[1200px] mx-auto mt-16 px-4 md:px-0">
          <div className="flex flex-col w-full max-w-[900px]">
            <div className="flex md:flex-row flex-col md:items-center items-start mb-3 gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-print text-blue-600 text-xl"></i>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Set up scanning from a control panel (if applicable):</h2>
            </div>
            <div className="text-gray-600 md:mb-6 mb-4 md:ml-12 ml-0 text-base leading-relaxed">
              Set up additional scanning features (Windows only). Get started by selecting <span className="font-bold text-blue-600">Install HP Smart App</span> above.<br />
              <span className="text-gray-500 italic mt-2 block">Note: To scan from a macOS computer, install the HP Smart app.</span>
            </div>
            
            <div className="border-b border-gray-100 my-8" />
            
            <div className="space-y-6 md:ml-12 ml-0">
              <div className="flex items-center gap-4 group cursor-pointer">
                <i className="fa-solid fa-circle-question text-blue-500 text-2xl group-hover:scale-110 transition-transform"></i>
                <span className="text-gray-700 text-base md:text-lg">Need help troubleshooting during printer setup? <a href="#" className="text-blue-600 font-bold hover:underline ml-1">Solve Setup Issues</a></span>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <i className="fa-solid fa-circle-info text-blue-500 text-2xl group-hover:scale-110 transition-transform"></i>
                <span className="text-gray-700 text-base md:text-lg">Find additional setup information and videos <a href="#" className="text-blue-600 font-bold hover:underline ml-1">Visit HP Support</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompleteSetup;
