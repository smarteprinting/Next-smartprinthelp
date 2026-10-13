"use client";

import React, { useState, useEffect } from "react";
import { Headphones } from "lucide-react";
import { openSetupChat } from "./chatSupport";

export default function SetupCTA() {
  // Fetch chatEnabled setting from DB on mount
  const [chatEnabled, setChatEnabled] = useState(false);

  useEffect(() => {
    fetch("/api/smart-printer-setup/settings")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.chatEnabled === "boolean") {
          setChatEnabled(data.chatEnabled);
        }
      })
      .catch(() => {
        // Fail closed — if API unreachable, keep chat disabled
        setChatEnabled(false);
      });
  }, []);

  const handleChatClick = () => {
    // Always open chat (setting OFF just skips the modal, chat still works)
    openSetupChat();
  };
  return (
    <section className="bg-[#0b1329] px-6 py-16 md:px-10 lg:px-16 overflow-hidden">
      <div className="mx-auto max-w-7xl rounded-[32px] border border-[#1e2b45] bg-gradient-to-br from-[#0f172a] via-[#122448] to-[#0d1b38] shadow-2xl p-8 md:p-12 lg:p-14 relative">
        
        {/* Background glow effects */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#2564e5]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#20bf55]/10 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-12 items-center relative z-10">
          
          {/* Left Column: Content & CTA */}
          <div className="flex flex-col justify-center">

            {/* Main Heading */}
            <h2 className="text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl lg:text-[42px] leading-[1.15]">
              Need More Help with Your Printer?
            </h2>

            <p className="mt-4 text-[15px] sm:text-[16px] text-[#94a3b8] leading-relaxed max-w-xl">
              Having trouble setting up an HP printer, joining it to WiFi, adding it to your computer, or getting it back online?
              <br /><br />
              Find guidance for new printer installation, wireless and computer connections, offline messages, printing failures, driver setup, and scanner issues.
            </p>

            {/* Single Button */}
            <div className="mt-8 flex flex-col sm:flex-row">
              <button
                type="button"
                onClick={handleChatClick}
                className="inline-flex h-[52px] items-center justify-center rounded-xl bg-white px-8 text-[15px] font-semibold text-[#0f172a] shadow-lg transition-all duration-200 hover:bg-[#ebf2ff] hover:shadow-white/10"
              >
                Explore Printer Help
              </button>
            </div>

          </div>

          {/* Right Column: Support Image */}
          <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[400px] rounded-2xl overflow-hidden border border-[#2e406b] shadow-2xl group">
            
            {/* Support Image */}
            <img
              src="/contttt.webp"
              alt="Support representative ready to help with printer questions"
              className="h-full w-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient overlay for blending */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/20 to-transparent" />

          </div>

        </div>

      </div>
    </section>
  );
}