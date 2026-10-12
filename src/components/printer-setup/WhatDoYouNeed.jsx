"use client";

import React from "react";
import {
  ArrowRight,
  Download,
  Laptop,
  Printer,
  ScanLine,
  Wifi,
  Wrench,
} from "lucide-react";

const helpTopics = [
  {
    title: "Set Up a New Printer",
    description:
      "Follow the essential steps to install your printer, configure settings, connect it to your device, and complete a test print.",
    Icon: Printer,
  },
  {
    title: "Connect Printer to Computer",
    description:
      "Add your printer to a Windows PC or Mac using a supported USB or wireless connection and compatible drivers.",
    Icon: Laptop,
  },
  {
    title: "Connect Printer to WiFi",
    description:
      "Select your wireless network, verify connectivity, and troubleshoot common wireless setup problems.",
    Icon: Wifi,
  },
  {
    title: "Fix Printer Offline Issues",
    description:
      "Find common reasons for offline status and restore communication between your printer and computer.",
    Icon: Wrench,
  },
  {
    title: "Install Printer Drivers",
    description:
      "Identify your model, find compatible software from the manufacturer’s official website, and complete installation.",
    Icon: Download,
  },
  {
    title: "Set Up Printer & Scanner",
    description:
      "Configure printing and scanning functions and verify that both work correctly.",
    Icon: ScanLine,
  },
];

function WhatDoYouNeed() {
  const openJivoChat = () => {
    const tryOpenChat = () => {
      if (window.jivo_api && typeof window.jivo_api.open === "function") {
        window.jivo_api.open();
        return true;
      }

      return false;
    };

    if (tryOpenChat()) return;

    const timeoutAt = Date.now() + 10000;
    const intervalId = window.setInterval(() => {
      if (tryOpenChat()) {
        window.clearInterval(intervalId);
      } else if (Date.now() >= timeoutAt) {
        window.clearInterval(intervalId);
        window.alert("Chat support is currently unavailable.");
      }
    }, 100);
  };

  return (
    <section
      aria-labelledby="what-do-you-need-heading"
      className="w-full bg-slate-50 px-4 py-14 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="what-do-you-need-heading"
          className="mb-8 text-center text-2xl font-extrabold tracking-tight text-slate-900 sm:mb-10 sm:text-3xl"
        >
          What Do You Need Help With?
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {helpTopics.map(({ title, description, Icon }) => (
            <article
              key={title}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                {description}
              </p>
              <button
                type="button"
                onClick={openJivoChat}
                className="mt-5 inline-flex items-center gap-2 self-start text-sm font-bold text-blue-700 transition hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                Explore {title}
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatDoYouNeed;