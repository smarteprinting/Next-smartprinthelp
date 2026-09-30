"use client";

import React from "react";

const issueCards = [
  {
    title: "HP Printer Setup",
    description:
      "Set up a new HP printer and get it ready for printing.",
    anchorId: "hp-printer-setup",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
        />
      </svg>
    ),
  },
  {
    title: "HP Smart Setup",
    description:
      "Get guidance for setting up a supported printer with HP Smart.",
    anchorId: "hp-smart-setup",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Install HP Smart",
    description:
      "Learn where to get HP Smart and how to begin printer setup.",
    anchorId: "install-hp-smart",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
    ),
  },
  {
    title: "HP Printer Not Connecting",
    description:
      "Troubleshoot WiFi, computer and printer connection problems.",
    anchorId: "hp-printer-not-connecting",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3"
        />
      </svg>
    ),
  },
  {
    title: "HP Printer Offline",
    description:
      "Check common reasons an HP printer may appear offline.",
    anchorId: "hp-printer-offline",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Connect Printer to WiFi",
    description:
      "Connect your printer to your home or office wireless network.",
    anchorId: "connect-printer-wifi",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
        />
      </svg>
    ),
  },
  {
    title: "Add Printer to Computer",
    description:
      "Add and connect your printer to a Windows PC or Mac.",
    anchorId: "add-printer-computer",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2zM12 9h.01M12 12h.01"
        />
      </svg>
    ),
  },
  {
    title: "Install Printer Drivers",
    description:
      "Find and install the appropriate software or driver for your printer.",
    anchorId: "printer-driver",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
];

const IssueSelectionCards = () => {
  const handleCardClick = (anchorId) => {
    const el = document.getElementById(anchorId);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="issue-selection"
      className="
        bg-white
        px-4
        sm:px-6
        lg:px-8
        pt-8
        sm:pt-10
        lg:pt-12
        pb-12
        sm:pb-14
        lg:pb-16
        scroll-mt-6
      "
    >
      <div className="max-w-7xl mx-auto">

        {/* SECTION HEADER */}
        <div className="text-center mb-8 sm:mb-10">

          <h2
            className="
              text-2xl
              sm:text-3xl
              lg:text-[30px]
              font-bold
              tracking-tight
              text-black
              leading-tight
            "
          >
            Select Your Printer Issue
          </h2>

          <div className="w-10 h-[2px] bg-[#024bd8] mx-auto mt-4" />
        </div>

        {/* CARDS */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4
            lg:gap-5
          "
        >
          {issueCards.map((card) => (
            <div
              key={card.anchorId}
              onClick={() => handleCardClick(card.anchorId)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCardClick(card.anchorId);
                }
              }}
              className="
                group
                bg-white
                border
                border-gray-200
                rounded-xl
                px-5
                py-5
                sm:py-6
                min-h-[190px]
                flex
                flex-col
                items-center
                text-center
                cursor-pointer
                transition-all
                duration-200
                hover:border-[#024bd8]
                hover:-translate-y-0.5
                focus:outline-none
                focus:ring-2
                focus:ring-[#024bd8]/20
              "
            >
              {/* ICON */}
              <div
                className="
                  w-12
                  h-12
                  rounded-xl
                  bg-[#024bd8]/5
                  border
                  border-[#024bd8]/10
                  flex
                  items-center
                  justify-center
                  text-[#024bd8]
                  mb-4
                  transition-all
                  duration-200
                  group-hover:bg-[#024bd8]
                  group-hover:text-white
                  group-hover:border-[#024bd8]
                "
              >
                {card.icon}
              </div>

              {/* CONTENT */}
              <h3
                className="
                  text-[15px]
                  sm:text-base
                  font-bold
                  text-black
                  leading-snug
                  mb-2
                  transition-colors
                  duration-200
                  group-hover:text-[#024bd8]
                "
              >
                {card.title}
              </h3>

              <p
                className="
                  text-[13px]
                  sm:text-sm
                  text-gray-600
                  leading-relaxed
                  max-w-[250px]
                "
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IssueSelectionCards;