"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const SetupContent = () => {
  const router = useRouter();
  const triggerAssistance = () => {
    router.push('/printer-setup-troubleshooting/model-search');
  };

  return (
    <div className="w-full bg-white divide-y divide-gray-100 text-black">
      {/* 1. HP Printer Setup */}
      <section id="hp-printer-setup" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-8">
        <div className="border-l-4 border-[#024bd8] pl-4 sm:pl-6 mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight">
            HP Printer Setup
          </h2>
        </div>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 max-w-5xl">
          Setting up a new HP printer usually involves a few basic steps: preparing the printer, connecting it to WiFi or your computer, installing the appropriate software, and completing a test print.
        </p>

        <div className="bg-gradient-to-br from-white via-gray-50/50 to-gray-50 border border-gray-200/80 rounded-3xl p-6 sm:p-10 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-black mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#024bd8]/10 text-[#024bd8] flex items-center justify-center font-semibold text-sm">✓</div>
            Set Up Your HP Printer
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base text-gray-700">
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Remove the printer packaging and protective materials.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Connect the power cable and turn on the printer.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Install the ink cartridges or toner when required.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Load paper into the input tray.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Connect the printer to WiFi or your computer.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Install the appropriate HP software or printer driver.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs md:col-span-2">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Add the printer to your device and print a test page.</span>
            </li>
          </ul>
        </div>

        <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-5xl">
          The exact setup process can vary by printer model. Follow the instructions displayed on your printer and use official HP resources when downloading HP software or drivers.
        </p>

        <button
          onClick={triggerAssistance}
          className="px-8 py-4 rounded-xl bg-[#024bd8] hover:bg-[#023fb5] active:scale-95 text-white font-semibold text-base transition-all shadow-lg shadow-[#024bd8]/20 cursor-pointer flex items-center gap-2"
        >
          <span>Start HP Printer Setup</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </section>

      {/* 2. HP Smart Setup */}
      <section id="hp-smart-setup" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-8">
        <div className="border-l-4 border-[#024bd8] pl-4 sm:pl-6 mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight">
            HP Smart Setup
          </h2>
        </div>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 max-w-5xl">
          Trying to set up your printer with HP Smart? For supported HP printers, HP Smart can help with initial printer setup, connecting the printer, printing, scanning, and basic printer management.
        </p>

        <div className="bg-gradient-to-br from-white via-gray-50/50 to-gray-50 border border-gray-200/80 rounded-3xl p-6 sm:p-10 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-black mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#024bd8]/10 text-[#024bd8] flex items-center justify-center font-semibold text-sm">ℹ</div>
            Before starting, make sure:
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base text-gray-700">
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Your HP printer is turned on.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>WiFi is enabled on the printer.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Your computer or mobile device has an active network connection.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>The printer is within a reliable range of your wireless router.</span>
            </li>
          </ul>
        </div>

        <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-5xl">
          If HP Smart cannot find your printer, check that the printer and your device are using the appropriate network. You can also restart the printer and router before trying the setup again.
        </p>

        <button
          onClick={triggerAssistance}
          className="px-8 py-4 rounded-xl bg-[#024bd8] hover:bg-[#023fb5] active:scale-95 text-white font-semibold text-base transition-all shadow-lg shadow-[#024bd8]/20 cursor-pointer flex items-center gap-2"
        >
          <span>Start HP Smart Setup</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </section>

      {/* 3. Install HP Smart */}
      <section id="install-hp-smart" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-8">
        <div className="border-l-4 border-[#024bd8] pl-4 sm:pl-6 mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight">
            Install HP Smart
          </h2>
        </div>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-3 max-w-5xl">
          If you're looking to install HP Smart or install the HP app, first confirm that your printer supports the application and that you're using a compatible computer or mobile device.
        </p>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 max-w-5xl">
          For security, use an official HP source or your device's official app store when obtaining HP Smart.
        </p>

        <div className="bg-gradient-to-br from-white via-gray-50/50 to-gray-50 border border-gray-200/80 rounded-3xl p-6 sm:p-10 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-black mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#024bd8]/10 text-[#024bd8] flex items-center justify-center font-semibold text-sm">↓</div>
            After installation:
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base text-gray-700">
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Open HP Smart.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Turn on your printer.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Make sure wireless connectivity is enabled.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Choose the option to add or set up a printer.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Select your printer when it appears.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Follow the on-screen instructions to complete setup.</span>
            </li>
          </ul>
        </div>

        <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-5xl">
          If your printer does not appear, check the WiFi connection and restart the printer before trying again.
        </p>

        <button
          onClick={triggerAssistance}
          className="px-8 py-4 rounded-xl bg-[#024bd8] hover:bg-[#023fb5] active:scale-95 text-white font-semibold text-base transition-all shadow-lg shadow-[#024bd8]/20 cursor-pointer flex items-center gap-2"
        >
          <span>Get Started With HP Smart</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </section>

      {/* 4. Looking for 123.hp.com/setup? */}
      <section id="123-hp-setup" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-8">
        <div className="border-l-4 border-[#024bd8] pl-4 sm:pl-6 mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight">
            Looking for 123.hp.com/setup?
          </h2>
        </div>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4 max-w-5xl">
          If you searched for 123.hp.com/setup, you're probably trying to set up an HP printer, connect your printer, install HP software, or find the appropriate driver for your model.
        </p>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4 max-w-5xl">
          You can begin by identifying your exact HP printer model and deciding how you want to connect it - WiFi, USB, or another supported connection.
        </p>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 max-w-5xl">
          For HP software and driver downloads, use official HP resources and verify that the software matches your printer model and operating system.
        </p>

        <button
          onClick={triggerAssistance}
          className="px-8 py-4 rounded-xl bg-[#024bd8] hover:bg-[#023fb5] active:scale-95 text-white font-semibold text-base transition-all shadow-lg shadow-[#024bd8]/20 cursor-pointer flex items-center gap-2"
        >
          <span>Continue Printer Setup</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </section>

      {/* 5. HP Printer Not Connecting? */}
      <section id="hp-printer-not-connecting" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-8">
        <div className="border-l-4 border-[#024bd8] pl-4 sm:pl-6 mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight">
            HP Printer Not Connecting?
          </h2>
        </div>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 max-w-5xl">
          If your HP printer is not connecting, first determine where the connection is failing. The problem may be between the printer and your WiFi network or between the printer and your computer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-white via-gray-50/50 to-gray-50 border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-black mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#024bd8]/10 text-[#024bd8] flex items-center justify-center font-semibold text-sm">📶</div>
              HP Printer Not Connecting to WiFi
            </h3>
            <ul className="space-y-3 text-sm sm:text-base text-gray-700">
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Make sure WiFi is enabled on the printer.</span>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Confirm that you're selecting the correct wireless network.</span>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Re-enter the WiFi password carefully.</span>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Move the printer closer to the router if the signal is weak.</span>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Check whether the printer is still configured for an old network.</span>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Restart the printer and router before reconnecting.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-white via-gray-50/50 to-gray-50 border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-black mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#024bd8]/10 text-[#024bd8] flex items-center justify-center font-semibold text-sm">💻</div>
              HP Printer Not Connecting to Computer
            </h3>
            <ul className="space-y-3 text-sm sm:text-base text-gray-700">
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Make sure the printer is turned on and ready.</span>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Check whether your computer can detect the printer.</span>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Verify the WiFi, USB, or network connection.</span>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Open Printers &amp; Scanners and check whether the printer has been added.</span>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Make sure the appropriate printer software or driver is installed.</span>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Remove and add the printer again if necessary.</span>
              </li>
            </ul>
          </div>
        </div>

        <button
          onClick={triggerAssistance}
          className="px-8 py-4 rounded-xl bg-[#024bd8] hover:bg-[#023fb5] active:scale-95 text-white font-semibold text-base transition-all shadow-lg shadow-[#024bd8]/20 cursor-pointer flex items-center gap-2"
        >
          <span>Troubleshoot HP Printer Connection</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </section>

      {/* 6. HP Printer Offline? */}
      <section id="hp-printer-offline" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-8">
        <div className="border-l-4 border-[#024bd8] pl-4 sm:pl-6 mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight">
            HP Printer Offline?
          </h2>
        </div>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 max-w-5xl">
          Seeing HP printer offline does not necessarily mean something is wrong with the printer itself. It often means the computer is currently unable to communicate with the printer.
        </p>

        <div className="bg-gradient-to-br from-white via-gray-50/50 to-gray-50 border border-gray-200/80 rounded-3xl p-6 sm:p-10 shadow-sm mb-8">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base text-gray-700">
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Make sure the HP printer is turned on and ready.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Check for an error or warning on the printer.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Verify the WiFi, USB, or network connection.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Make sure the printer and computer are connected appropriately.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Open the print queue and clear stuck print jobs.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Confirm that the correct HP printer is selected.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Restart the printer and computer.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Reconnect the printer if your WiFi network recently changed.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs md:col-span-2">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Check that the appropriate HP printer software or driver is installed.</span>
            </li>
          </ul>
        </div>

        <button
          onClick={triggerAssistance}
          className="px-8 py-4 rounded-xl bg-[#024bd8] hover:bg-[#023fb5] active:scale-95 text-white font-semibold text-base transition-all shadow-lg shadow-[#024bd8]/20 cursor-pointer flex items-center gap-2"
        >
          <span>Fix HP Printer Offline Issues</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </section>

      {/* 7. Connect Printer to WiFi */}
      <section id="connect-printer-wifi" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-8">
        <div className="border-l-4 border-[#024bd8] pl-4 sm:pl-6 mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight">
            Connect Printer to WiFi
          </h2>
        </div>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 max-w-5xl">
          Want to connect your printer to WiFi? Before starting, keep your wireless network name and password available and make sure the printer is within a reliable range of your router.
        </p>

        <div className="bg-gradient-to-br from-white via-gray-50/50 to-gray-50 border border-gray-200/80 rounded-3xl p-6 sm:p-10 shadow-sm mb-8">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base text-gray-700">
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Turn on the printer.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Open its Wireless or Network settings.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Choose the available wireless setup option.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Select your WiFi network.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Enter the WiFi password.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Wait for the printer to confirm the connection.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs md:col-span-2">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Add the printer to your computer or device.</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#024bd8]/5 border border-[#024bd8]/20 rounded-3xl p-6 sm:p-10 mb-8">
          <h3 className="text-xl font-bold text-black mb-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#024bd8] text-white flex items-center justify-center font-semibold text-sm">?</div>
            Printer Not Connecting to WiFi?
          </h3>
          <p className="text-base text-gray-700 leading-relaxed">
            Double-check the WiFi network and password first. If your printer was previously connected to another network, you may need to update its wireless settings. Restarting the printer and router can also resolve temporary connection problems.
          </p>
        </div>

        <button
          onClick={triggerAssistance}
          className="px-8 py-4 rounded-xl bg-[#024bd8] hover:bg-[#023fb5] active:scale-95 text-white font-semibold text-base transition-all shadow-lg shadow-[#024bd8]/20 cursor-pointer flex items-center gap-2"
        >
          <span>Connect Printer to WiFi</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </section>

      {/* 8. Add Printer to Computer */}
      <section id="add-printer-computer" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-8">
        <div className="border-l-4 border-[#024bd8] pl-4 sm:pl-6 mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight">
            Add Printer to Computer
          </h2>
        </div>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 max-w-5xl">
          If you need to add a printer to your computer, make sure the printer is turned on and connected through WiFi, USB, Ethernet, or another supported connection.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-white via-gray-50/50 to-gray-50 border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-black mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#024bd8]/10 text-[#024bd8] flex items-center justify-center font-semibold text-sm">🪟</div>
              Add Printer to Windows
            </h3>
            <ul className="space-y-3 text-sm sm:text-base text-gray-700">
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Open Settings.</span>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Go to Bluetooth &amp; devices.</span>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Select Printers &amp; scanners.</span>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Choose Add device.</span>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Select your printer when it appears.</span>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Follow the prompts to finish setup.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-white via-gray-50/50 to-gray-50 border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-black mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#024bd8]/10 text-[#024bd8] flex items-center justify-center font-semibold text-sm">🍎</div>
              Add Printer to Mac
            </h3>
            <ul className="space-y-3 text-sm sm:text-base text-gray-700">
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Open System Settings.</span>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Select Printers &amp; Scanners.</span>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Choose Add Printer, Scanner, or Fax.</span>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Select your printer.</span>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
                <span>Follow the available setup instructions.</span>
              </li>
            </ul>
          </div>
        </div>

        <button
          onClick={triggerAssistance}
          className="px-8 py-4 rounded-xl bg-[#024bd8] hover:bg-[#023fb5] active:scale-95 text-white font-semibold text-base transition-all shadow-lg shadow-[#024bd8]/20 cursor-pointer flex items-center gap-2"
        >
          <span>Add Printer to Computer</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </section>

      {/* 9. Why Is My Printer Offline? */}
      <section id="printer-offline" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-8">
        <div className="border-l-4 border-[#024bd8] pl-4 sm:pl-6 mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight">
            Why Is My Printer Offline?
          </h2>
        </div>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 max-w-5xl">
          If your printer is showing offline, your computer may be having trouble communicating with it.
        </p>

        <div className="bg-gradient-to-br from-white via-gray-50/50 to-gray-50 border border-gray-200/80 rounded-3xl p-6 sm:p-10 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-black mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#024bd8]/10 text-[#024bd8] flex items-center justify-center font-semibold text-sm">⚠</div>
            Common causes include:
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base text-gray-700">
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Lost WiFi connection</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Changed wireless network</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Loose USB connection</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Incorrect printer selected</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Stuck print jobs</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Printer temporarily unavailable</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Network communication problems</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Driver or software issues</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#024bd8]/5 border border-[#024bd8]/20 rounded-3xl p-6 sm:p-10 mb-8">
          <h3 className="text-xl font-bold text-black mb-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#024bd8] text-white flex items-center justify-center font-semibold text-sm">🔧</div>
            Printer Offline Fix
          </h3>
          <p className="text-base text-gray-700 leading-relaxed">
            Start with the simplest checks before reinstalling anything. Make sure the printer is powered on, verify the connection, clear any stuck print jobs, confirm that the correct printer is selected, and restart both the printer and computer. If the printer still appears offline, remove it from Printers &amp; Scanners and add it again.
          </p>
        </div>

        <button
          onClick={triggerAssistance}
          className="px-8 py-4 rounded-xl bg-[#024bd8] hover:bg-[#023fb5] active:scale-95 text-white font-semibold text-base transition-all shadow-lg shadow-[#024bd8]/20 cursor-pointer flex items-center gap-2"
        >
          <span>Troubleshoot Printer Offline</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </section>

      {/* 10. Printer Not Printing? */}
      <section id="printer-not-printing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-8">
        <div className="border-l-4 border-[#024bd8] pl-4 sm:pl-6 mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight">
            Printer Not Printing?
          </h2>
        </div>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 max-w-5xl">
          Is your printer connected but still not printing? Before reinstalling software, check the basic printer status and print queue.
        </p>

        <div className="bg-gradient-to-br from-white via-gray-50/50 to-gray-50 border border-gray-200/80 rounded-3xl p-6 sm:p-10 shadow-sm mb-8">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base text-gray-700">
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Check for printer errors or warning messages.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Make sure paper is loaded correctly.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Check ink or toner levels.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Confirm that the correct printer is selected.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Clear stuck or paused print jobs.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Verify the WiFi, USB, or network connection.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Restart the printer and computer.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Check the printer software or driver if the problem continues.</span>
            </li>
          </ul>
        </div>

        <button
          onClick={triggerAssistance}
          className="px-8 py-4 rounded-xl bg-[#024bd8] hover:bg-[#023fb5] active:scale-95 text-white font-semibold text-base transition-all shadow-lg shadow-[#024bd8]/20 cursor-pointer flex items-center gap-2"
        >
          <span>Troubleshoot Printer Not Printing</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </section>

      {/* 11. Install Printer Drivers */}
      <section id="printer-driver" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-8">
        <div className="border-l-4 border-[#024bd8] pl-4 sm:pl-6 mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight">
            Install Printer Drivers
          </h2>
        </div>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 max-w-5xl">
          The printer driver helps your computer communicate with your printer.
        </p>

        <div className="bg-gradient-to-br from-white via-gray-50/50 to-gray-50 border border-gray-200/80 rounded-3xl p-6 sm:p-10 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-black mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#024bd8]/10 text-[#024bd8] flex items-center justify-center font-semibold text-sm">📥</div>
            Before installing a driver:
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base text-gray-700">
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Find the exact printer model.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Check your computer's operating system and version.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Use the printer manufacturer's official website or another official software source.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Download the appropriate driver for your model and operating system.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Follow the manufacturer's installation instructions.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#024bd8] mt-2 shrink-0"></span>
              <span>Add the printer and run a test print.</span>
            </li>
          </ul>
        </div>

        <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-5xl">
          For HP printers, use an official HP source when obtaining HP drivers or software.
        </p>

        <button
          onClick={triggerAssistance}
          className="px-8 py-4 rounded-xl bg-[#024bd8] hover:bg-[#023fb5] active:scale-95 text-white font-semibold text-base transition-all shadow-lg shadow-[#024bd8]/20 cursor-pointer flex items-center gap-2"
        >
          <span>Printer Driver Help</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </section>

      {/* 12. Scanner Not Working? */}
      <section id="scanner-help" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-8">
        <div className="border-l-4 border-[#024bd8] pl-4 sm:pl-6 mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight">
            Scanner Not Working?
          </h2>
        </div>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 max-w-5xl">
          If your printer works but the scanner does not, first check whether your computer can detect the scanner. Make sure the printer or scanner is powered on, verify its USB or network connection, open the appropriate scanning software, and confirm that the correct device is selected. Restart the printer and computer before reinstalling scanner software or drivers.
        </p>

        <button
          onClick={triggerAssistance}
          className="px-8 py-4 rounded-xl bg-[#024bd8] hover:bg-[#023fb5] active:scale-95 text-white font-semibold text-base transition-all shadow-lg shadow-[#024bd8]/20 cursor-pointer flex items-center gap-2"
        >
          <span>Troubleshoot Scanner</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </section>
    </div>
  );
};

export default SetupContent;