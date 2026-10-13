"use client";

import React, { useState, useEffect } from "react";
import { openSetupChat } from "./chatSupport";

function ButtomContent1() {
  const [allowStartNow, setAllowStartNow] = useState(true);

  useEffect(() => {
    fetch("/api/hp-setup/settings")
      .then((res) => res.json())
      .then((data) => setAllowStartNow(data.allowStartNow !== false))
      .catch(() => setAllowStartNow(true));
  }, []);

  const handleOpenChat = () => {
    if (!allowStartNow) {
      openSetupChat();
      return;
    }

    if (
      typeof window !== "undefined" &&
      window.LiveChatWidget &&
      typeof window.LiveChatWidget.call === "function"
    ) {
      window.LiveChatWidget.call("maximize");
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Section 1: HP Printer Setup & Installation Guide */}
        <div className="mb-12 pb-12 border-b border-slate-200">
          <div className="space-y-6">
            <div className="border-l-4 border-[#2462e8] pl-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                Get Your HP Printer Set Up
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                To get a new HP printer ready, prepare the hardware, connect it
                to your computer or WiFi, and install software or a driver that
                matches your model. Use this guide to work through the setup.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2462e8] text-white rounded-lg flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Get Your HP Printer Ready</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Unpack the device and take off any shipping or protective
                      materials. Plug it in and power it on, then fit the supplied
                      ink or toner and place paper in the input tray.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2462e8] text-white rounded-lg flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Join Your WiFi Network</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Make sure the printer and router are on. From the printer's
                      Wireless or Network Settings, choose your network and enter
                      its password when asked. Give the printer time to connect;
                      during setup, the printer and computer generally need to use
                      the same network.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2462e8] text-white rounded-lg flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Add the Printer to Your Computer</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      After connecting the printer to your network, go to Printers
                      & Scanners on your computer. Choose Add Printer or Device,
                      select your HP printer from the list, and complete the
                      displayed steps. You can also use USB if your model supports it.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2462e8] text-white rounded-lg flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Install the Matching HP Driver or Software</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Choose a driver or software package made for your specific HP
                      model and operating system. To ensure a safe, compatible
                      download, get it through HP's official website or another
                      authorized HP source.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow md:col-span-2">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2462e8] text-white rounded-lg flex items-center justify-center font-bold text-sm">
                    5
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Finish the Setup</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Follow the remaining software prompts to configure the
                      device. Then print a sample page to verify the computer
                      can communicate with the printer.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={handleOpenChat}
                className="px-8 py-3.5 bg-[#2462e8] hover:bg-[#1d53c4] text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Set Up an HP Printer
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: HP Smart Setup & Printer Connection */}
        <div className="mb-12 pb-12 border-b border-slate-200">
          <div className="space-y-6">
            <div className="border-l-4 border-[#2462e8] pl-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                Set Up Your Printer with HP Smart
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                On supported HP printers, HP Smart provides tools for setup,
                printing, scanning, and managing the device.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Check These Items Before Using HP Smart:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#2462e8] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-slate-700 text-sm">Confirm that the HP printer is powered on.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#2462e8] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-slate-700 text-sm">Make sure your computer or phone has internet access.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#2462e8] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-slate-700 text-sm">Check that WiFi is switched on at the printer.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#2462e8] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-slate-700 text-sm">Place the printer where it can reach your wireless router.</span>
                </div>
                <div className="flex items-start gap-3 md:col-span-2 lg:col-span-2">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#2462e8] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-slate-700 text-sm">Verify that your printer model is compatible with the software.</span>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mt-6">
                Use HP's official software and guidance to add your compatible
                printer and complete its configuration.
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl">
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Can't Find Your Printer in HP Smart?
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                When the printer doesn't appear, confirm that it and your
                computer or phone are using the correct network. If needed,
                restart the printer and router, then try adding the device again.
              </p>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={handleOpenChat}
                className="px-8 py-3.5 bg-[#2462e8] hover:bg-[#1d53c4] text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Begin Setup with HP Smart
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: 123.hp.com/setup - HP Printer Setup Information */}
        <div className="mb-12 pb-12 border-b border-slate-200">
          <div className="space-y-6">
            <div className="border-l-4 border-[#2462e8] pl-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                HP Printer Setup and 123.hp.com/setup
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                People looking up 123.hp.com/setup often need to prepare an HP
                printer, connect it, install its software, or find a suitable
                driver for their device.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Download HP drivers and software from HP's official site or
                resources, and check that the package supports your printer model
                and operating system.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  HP Printer Setup at a Glance
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-slate-700">
                  <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg">Get Printer Ready</span>
                  <span className="text-[#2462e8] text-xl">→</span>
                  <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg">Join WiFi</span>
                  <span className="text-[#2462e8] text-xl">→</span>
                  <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg">Add HP Software</span>
                  <span className="text-[#2462e8] text-xl">→</span>
                  <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg">Add It to Your Computer</span>
                  <span className="text-[#2462e8] text-xl">→</span>
                  <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg">Print a Test Page</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mt-4">
                  If an installed printer isn't behaving as expected, see the
                  troubleshooting topics further down this page.
                </p>
              </div>

             
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={handleOpenChat}
                className="px-8 py-3.5 bg-[#2462e8] hover:bg-[#1d53c4] text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Help Me Connect My Printer
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: Connect Printer to Computer */}
        <div className="mb-12 pb-12 border-b border-slate-200">
          <div className="space-y-6">
            <div className="border-l-4 border-[#2462e8] pl-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                Pair Printer with Your Computer
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Printers can usually connect to a computer over WiFi, USB,
                Ethernet, or another supported link. After connecting the
                devices, add the printer through your computer's settings.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-[#2462e8] transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-lg">
                    W
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Windows</h3>
                </div>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <span className="text-sm">Switch your printer on.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <span className="text-sm">Connect it using WiFi or a USB cable.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <span className="text-sm">Launch the Settings app.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <span className="text-sm">Navigate to Bluetooth & devices → Printers & scanners.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                    <span className="text-sm">Choose Add device to search.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold">6</span>
                    <span className="text-sm">Choose your printer from the results.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold">7</span>
                    <span className="text-sm">Complete the on-screen steps.</span>
                  </li>
                </ol>
              </div>

              <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-[#2462e8] transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-lg">
                    M
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Mac</h3>
                </div>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <span className="text-sm">Power on the printer and connect it.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <span className="text-sm">Launch System Settings.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <span className="text-sm">Open Printers & Scanners.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <span className="text-sm">Click Add Printer, Scanner, or Fax.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                    <span className="text-sm">Choose your device from the list.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold">6</span>
                    <span className="text-sm">Follow the prompts to finish setup.</span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={handleOpenChat}
                className="px-8 py-3.5 bg-[#2462e8] hover:bg-[#1d53c4] text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Add a Printer to Your Computer
              </button>
            </div>
          </div>
        </div>

        {/* Section 5: Connect Printer to WiFi */}
        <div className="mb-12 pb-12 border-b border-slate-200">
          <div className="space-y-6">
            <div className="border-l-4 border-[#2462e8] pl-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                Join a Printer to WiFi
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                A WiFi connection lets your computer and other compatible
                devices send jobs to the printer through your local network.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Steps for Connecting a Printer to WiFi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                  <div className="w-10 h-10 bg-[#2462e8] text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-3">
                    1
                  </div>
                  <p className="text-slate-700 text-sm">Switch the printer on.</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                  <div className="w-10 h-10 bg-[#2462e8] text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-3">
                    2
                  </div>
                  <p className="text-slate-700 text-sm">Go to the printer's network or wireless menu.</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                  <div className="w-10 h-10 bg-[#2462e8] text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-3">
                    3
                  </div>
                  <p className="text-slate-700 text-sm">Choose the wireless setup choice shown on its display.</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                  <div className="w-10 h-10 bg-[#2462e8] text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-3">
                    4
                  </div>
                  <p className="text-slate-700 text-sm">Pick your home or office WiFi network.</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                  <div className="w-10 h-10 bg-[#2462e8] text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-3">
                    5
                  </div>
                  <p className="text-slate-700 text-sm">Type in the network password.</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                  <div className="w-10 h-10 bg-[#2462e8] text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-3">
                    6
                  </div>
                  <p className="text-slate-700 text-sm">Wait until the printer confirms it is connected.</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 text-center md:col-span-2 lg:col-span-2">
                  <div className="w-10 h-10 bg-[#2462e8] text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-3">
                    7
                  </div>
                  <p className="text-slate-700 text-sm">Add the connected device on your computer.</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Having Trouble Joining WiFi?
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Verify the network name and password, ensure the printer is
                close enough to the router, and check that its wireless feature
                is enabled. Restart both devices if needed, then retry setup.
              </p>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={handleOpenChat}
                className="px-8 py-3.5 bg-[#2462e8] hover:bg-[#1d53c4] text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Set Up Printer WiFi
              </button>
            </div>
          </div>
        </div>

        {/* Section 6: Printer Offline Fix */}
        <div className="mb-12 pb-12 border-b border-slate-200">
          <div className="space-y-6">
            <div className="border-l-4 border-[#2462e8] pl-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                Bring an Offline Printer Back Online
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                An offline message usually means the computer cannot currently
                reach the printer. Possible causes include a lost network or USB
                link, choosing a different printer, a paused queue, a changed
                WiFi network, or a temporary communication interruption.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">
                Checks to Try When a Printer Appears Offline
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border-l-4 border-[#2462e8] p-6 rounded-r-xl shadow-sm">
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    Inspect the Printer Connection
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Confirm the printer is on and has no displayed error. Then
                    inspect its USB, Ethernet, or WiFi connection.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-[#2462e8] p-6 rounded-r-xl shadow-sm">
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    Verify the WiFi Network
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    With a wireless setup, check that the printer and computer
                    are on the intended network.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-[#2462e8] p-6 rounded-r-xl shadow-sm">
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    Power-Cycle the Printer
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Switch the printer off, pause for a moment, then turn it on
                    again. Restarting the computer and router can also clear
                    temporary connection faults.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-[#2462e8] p-6 rounded-r-xl shadow-sm">
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    Review Pending Print Jobs
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Open the queue and clear jobs that are stalled or no longer needed.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-[#2462e8] p-6 rounded-r-xl shadow-sm">
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    Confirm Printer Selection and Status
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Make sure the intended printer is selected and that it has
                    not been set to offline mode.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-[#2462e8] p-6 rounded-r-xl shadow-sm">
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    Remove and Set Up the Printer Again
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    If it remains offline, delete the printer from your computer
                    and add it again to re-establish communication.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={handleOpenChat}
                className="px-8 py-3.5 bg-[#2462e8] hover:bg-[#1d53c4] text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Help Bringing Your Printer Online
              </button>
            </div>
          </div>
        </div>

        {/* Section 7: HP Printer Offline? */}
        <div className="mb-12 pb-12 border-b border-slate-200">
          <div className="space-y-6">
            <div className="border-l-4 border-[#2462e8] pl-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                Is Your HP Printer Offline?
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Begin by confirming that the HP printer is powered on and linked
                to your computer, either directly or through your wireless network.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">
                Ways to Check an HP Printer That Appears Offline
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-sm font-bold text-slate-900 mb-2">
                    Review HP Printer Status
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Check that it is switched on and that its display shows no
                    active error.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-sm font-bold text-slate-900 mb-2">
                    Confirm the WiFi Link
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Make sure the HP device is joined to the intended wireless
                    network.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-sm font-bold text-slate-900 mb-2">
                    Restart the Printer
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Turn the printer off and back on, then reboot the computer.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-sm font-bold text-slate-900 mb-2">
                    Clear the Print Queue
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Remove jobs that are stuck and blocking new print requests.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-sm font-bold text-slate-900 mb-2">
                    Select the Intended Printer
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Confirm your HP device is chosen for the current print task.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-sm font-bold text-slate-900 mb-2">
                    Re-add the Printer
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If communication has stopped, remove the HP printer from
                    the computer and add it again.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-3">
                  <h4 className="text-sm font-bold text-slate-900 mb-2">
                    Check the Installed Driver
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Make sure the installed software or driver supports your
                    particular HP model.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={handleOpenChat}
                className="px-8 py-3.5 bg-[#2462e8] hover:bg-[#1d53c4] text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Help with an Offline HP Printer
              </button>
            </div>
          </div>
        </div>

        {/* Section 8: HP Printer Not Connecting? */}
        <div className="mb-12 pb-12 border-b border-slate-200">
          <div className="space-y-6">
            <div className="border-l-4 border-[#2462e8] pl-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                Can't Connect Your HP Printer?
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                If the HP printer won't connect to the computer or WiFi, identify
                which part of the connection is not working first.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  HP Printer WiFi Connection Checks
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-700 text-sm">
                    <span className="text-[#2462e8] font-bold flex-shrink-0">•</span>
                    <span>Confirm wireless mode is turned on at the printer.</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 text-sm">
                    <span className="text-[#2462e8] font-bold flex-shrink-0">•</span>
                    <span>Check that it has joined the intended WiFi network.</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 text-sm">
                    <span className="text-[#2462e8] font-bold flex-shrink-0">•</span>
                    <span>Make sure the network password was entered correctly.</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 text-sm">
                    <span className="text-[#2462e8] font-bold flex-shrink-0">•</span>
                    <span>Move it within a reliable distance of the router.</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 text-sm">
                    <span className="text-[#2462e8] font-bold flex-shrink-0">•</span>
                    <span>Verify that other devices can use the WiFi connection.</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 text-sm">
                    <span className="text-[#2462e8] font-bold flex-shrink-0">•</span>
                    <span>Check that it is not trying to use a previous network.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  HP Printer and Computer Connection Checks
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-700 text-sm">
                    <span className="text-[#2462e8] font-bold flex-shrink-0">•</span>
                    <span>Ensure the HP printer is switched on.</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 text-sm">
                    <span className="text-[#2462e8] font-bold flex-shrink-0">•</span>
                    <span>Check whether the computer recognizes the device.</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 text-sm">
                    <span className="text-[#2462e8] font-bold flex-shrink-0">•</span>
                    <span>Verify the USB cable or network link is working.</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 text-sm">
                    <span className="text-[#2462e8] font-bold flex-shrink-0">•</span>
                    <span>Confirm the correct printer is installed on the computer.</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 text-sm">
                    <span className="text-[#2462e8] font-bold flex-shrink-0">•</span>
                    <span>Check that compatible printer software is installed.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <p className="text-slate-600 text-base leading-relaxed">
                Once these points are checked, restart both devices and try to
                connect once more.
              </p>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={handleOpenChat}
                className="px-8 py-3.5 bg-[#2462e8] hover:bg-[#1d53c4] text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Connect Your HP Printer
              </button>
            </div>
          </div>
        </div>

        {/* Section 9: Printer Setup Help */}
        <div className="mb-12 pb-12 border-b border-slate-200">
          <div className="space-y-6">
            <div className="border-l-4 border-[#2462e8] pl-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                Get Help Setting Up a Printer
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                A new printer may need several steps beyond powering it on. The
                process can include joining a network, adding the device in your
                computer's settings, and installing compatible drivers or software.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                Setup guidance can help with tasks like these:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {[
                  "Preparing a new printer",
                  "Adding a printer on your computer",
                  "Pairing your computer and printer",
                  "Joining a WiFi network",
                  "Setting up a wireless printer",
                  "Connecting by USB",
                  "Finding the right printer driver",
                  "Choosing a default printer",
                  "Resolving offline status",
                  "Fixing printer connection problems",
                  "Configuring a scanner",
                  "Addressing common printing errors"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-[#2462e8] font-bold flex-shrink-0">✓</span>
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Printer Won't Connect?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                A failed connection can be related to WiFi, USB, the printer
                driver, computer preferences, or network settings. First check
                that the printer is on and review its connection status. For
                WiFi, confirm both devices use the same network. For USB,
                reconnect the cable or try another supported port. Restart the
                printer and computer before trying again.
              </p>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={handleOpenChat}
                className="px-8 py-3.5 bg-[#2462e8] hover:bg-[#1d53c4] text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Started with Printer Setup
              </button>
            </div>
          </div>
        </div>

        {/* Section 10: New Printer Setup */}
        <div className="mb-12 pb-12 border-b border-slate-200">
          <div className="space-y-6">
            <div className="border-l-4 border-[#2462e8] pl-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                Prepare a New Printer
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Have a new printer to install? Work through the main tasks to
                get it ready for everyday use.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Most new printer setups follow these steps:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <span className="inline-block px-3 py-1 bg-[#2462e8] text-white text-xs font-bold rounded-full mb-3">01</span>
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    Get the printer ready
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Turn on the device and finish its first-time setup.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <span className="inline-block px-3 py-1 bg-[#2462e8] text-white text-xs font-bold rounded-full mb-3">02</span>
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    Pick a connection type
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Choose a supported method, such as WiFi, Ethernet, or USB.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <span className="inline-block px-3 py-1 bg-[#2462e8] text-white text-xs font-bold rounded-full mb-3">03</span>
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    Link the devices
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Confirm the printer can communicate with your computer.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <span className="inline-block px-3 py-1 bg-[#2462e8] text-white text-xs font-bold rounded-full mb-3">04</span>
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    Add it on your computer
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Find the device in your Windows or macOS printer settings
                    and add it.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <span className="inline-block px-3 py-1 bg-[#2462e8] text-white text-xs font-bold rounded-full mb-3">05</span>
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    Install needed software
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Get a compatible driver or software from the manufacturer's
                    official source.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <span className="inline-block px-3 py-1 bg-[#2462e8] text-white text-xs font-bold rounded-full mb-3">06</span>
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    Run a printer test
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Print a sample page or document to check the setup.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Having Trouble Printing?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                A printer may be installed but still not print because it has
                lost its connection, has jobs waiting in its queue, is out of
                paper or ink/toner, is not selected, or has a software issue.
              </p>

              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Check These Common Causes:
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    "Check that the printer is switched on.",
                    "Look for warning or error messages.",
                    "Make sure paper and ink or toner are available.",
                    "Inspect the printer's network or cable connection.",
                    "Review the queue for stalled documents.",
                    "Select the printer you want to use.",
                    "Restart both the printer and computer.",
                    "If the issue remains, check the installed driver and software."
                  ].map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-700 text-sm">
                      <span className="text-red-500 font-bold flex-shrink-0">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={handleOpenChat}
                className="px-8 py-3.5 bg-[#2462e8] hover:bg-[#1d53c4] text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Fix a Printer That Won't Print
              </button>
            </div>
          </div>
        </div>

        {/* Section 11: Help With Common Printer Problems */}
        <div className="mb-12 pb-12 border-b border-slate-200">
          <div className="space-y-6">
            <div className="border-l-4 border-[#2462e8] pl-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                Solutions for Frequent Printer Issues
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                A printer can develop issues during setup or after working as
                expected for a while. Find guidance for problems such as:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  Printer Won't Connect
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Find out why the printer cannot communicate with your
                  computer or WiFi network.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  Printer Appears Offline
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Review the connection, device status, and computer options
                  that can cause an offline message.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  Print Jobs Not Coming Through
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Check the connection, queued jobs, chosen printer, and
                  related settings.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  Wireless Printer Issues
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Reconnect after a network name, router, or WiFi password has
                  changed.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  Printer Not Detected by Computer
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Check that the printer can be found and is properly linked
                  to your computer or network.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  Scanner Isn't Working
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Look into frequent scanning connection, setup, and software
                  problems.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Set Up the Printer Driver
              </h3>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                A driver helps your computer's operating system communicate
                with the printer. Whether setting up a device or fixing one
                already in use, choose software made for your specific model
                and operating system.
              </p>

              <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  How to Install a Printer Driver
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 bg-[#2462e8] text-white rounded-lg flex items-center justify-center font-bold text-xs">
                      1
                    </div>
                    <div>
                      <strong className="text-slate-900">Find the Printer Model:</strong>
                      <span className="text-slate-600 text-sm"> Note the precise
                      model name or number.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 bg-[#2462e8] text-white rounded-lg flex items-center justify-center font-bold text-xs">
                      2
                    </div>
                    <div>
                      <strong className="text-slate-900">Check Your Operating System:</strong>
                      <span className="text-slate-600 text-sm"> Find out if your
                      computer runs Windows, macOS, or another supported system.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 bg-[#2462e8] text-white rounded-lg flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <div>
                      <strong className="text-slate-900">Choose a Compatible Driver:</strong>
                      <span className="text-slate-600 text-sm"> Download through
                      the printer maker's official website or software channel.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 bg-[#2462e8] text-white rounded-lg flex items-center justify-center font-bold text-xs">
                      4
                    </div>
                    <div>
                      <strong className="text-slate-900">Install the Software:</strong>
                      <span className="text-slate-600 text-sm"> Use the
                      installation steps provided by the manufacturer.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 bg-[#2462e8] text-white rounded-lg flex items-center justify-center font-bold text-xs">
                      5
                    </div>
                    <div>
                      <strong className="text-slate-900">Connect and Check the Printer:</strong>
                      <span className="text-slate-600 text-sm"> Add it to your
                      computer, then print a test page.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={handleOpenChat}
                className="px-8 py-3.5 bg-[#2462e8] hover:bg-[#1d53c4] text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Select the Problem to Address
              </button>
            </div>
          </div>
        </div>

        {/* Section 12: How Printer Help Works */}
        <div className="mb-12">
          <div className="space-y-6">
            <div className="border-l-4 border-[#2462e8] pl-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                What to Expect from Printer Help
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Follow a few straightforward steps to get started.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 text-center hover:border-[#2462e8] transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2462e8] to-[#1d53c4] text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-2xl shadow-lg">
                  1
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  Choose a Printer Issue
                </h4>
                <p className="text-slate-600 text-sm">
                  Pick the problem that best describes what is happening.
                </p>
              </div>

              <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 text-center hover:border-[#2462e8] transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2462e8] to-[#1d53c4] text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-2xl shadow-lg">
                  2
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  Get Relevant Guidance
                </h4>
                <p className="text-slate-600 text-sm">
                  Find instructions related to the issue you selected.
                </p>
              </div>

              <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 text-center hover:border-[#2462e8] transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2462e8] to-[#1d53c4] text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-2xl shadow-lg">
                  3
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  Work Through the Fix
                </h4>
                <p className="text-slate-600 text-sm">
                  Follow the suggested checks one step at a time.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Describe whether you need help installing a printer, joining
                WiFi, fixing offline status, connecting to a computer, printing,
                scanning, or resolving another common issue. Then review the
                steps that apply to your situation.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Can't Scan a Document?
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  If printing works but scanning does not, first inspect the link
                  between the printer and computer. Confirm the scanner is
                  recognized, compatible scanning software is installed, and the
                  devices communicate over USB or WiFi. Restart both, then try
                  another scan.
                </p>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={handleOpenChat}
                className="px-8 py-3.5 bg-[#2462e8] hover:bg-[#1d53c4] text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Find Printer Assistance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ButtomContent1;
