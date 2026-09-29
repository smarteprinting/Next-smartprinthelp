"use client";
import React, { useState } from 'react';

const faqs = [
  {
    question: 'How do I set up my HP printer?',
    answer:
      'Prepare the printer, connect it to WiFi or your computer, install the appropriate HP software or driver from an official HP source, add the printer in your device settings, and run a test print.',
  },
  {
    question: 'How do I set up my printer with HP Smart?',
    answer:
      'Turn on the supported HP printer, enable wireless networking, open HP Smart on a compatible device, choose the option to add or set up a printer, and follow the on-screen instructions.',
  },
  {
    question: 'How do I install HP Smart?',
    answer:
      'Use an official HP source or your device\'s official app store, install HP Smart on a compatible device, open it, and follow the prompts to add or set up your supported printer.',
  },
  {
    question: "Why can't HP Smart find my printer?",
    answer:
      'Check that the printer is powered on, wireless networking is enabled, and the printer and your device are using the appropriate network. Restart the printer and router before trying again.',
  },
  {
    question: 'How do I connect my HP printer to WiFi?',
    answer:
      'Open the printer\'s wireless or network settings, select your WiFi network, enter the network password, and wait for the printer to confirm the connection.',
  },
  {
    question: 'Why is my HP printer not connecting?',
    answer:
      'Identify whether the problem is with WiFi or the computer connection. Check the network, password, USB or network connection, printer status, and appropriate printer software.',
  },
  {
    question: 'Why is my HP printer offline?',
    answer:
      'Check the printer\'s power, WiFi or USB connection, print queue, selected printer, and installed software. A network change can also cause a previously connected printer to appear offline.',
  },
  {
    question: 'How do I fix a printer offline issue?',
    answer:
      'Check the connection, restart the printer and computer, clear stuck print jobs, confirm the correct printer is selected, and reconnect the printer if necessary.',
  },
  {
    question: 'How do I connect a printer to my computer?',
    answer:
      'Connect the printer through WiFi, USB, Ethernet, or another supported method, then open Printers & Scanners and add the printer.',
  },
  {
    question: 'How do I add a printer to my computer?',
    answer:
      'Open your computer\'s Printers & Scanners settings, choose Add Printer or Add Device, select the printer, and follow the setup prompts.',
  },
  {
    question: 'How do I install an HP printer driver?',
    answer:
      'Identify your exact HP printer model and operating system, then use an official HP resource to obtain the appropriate software or driver and follow the installation instructions.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faqs" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-8 bg-white">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                isOpen
                  ? 'border-[#024bd8]/30 shadow-md shadow-[#024bd8]/5 bg-white'
                  : 'border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
              >
                <h3
                  className={`font-semibold text-base sm:text-lg transition-colors ${
                    isOpen ? 'text-[#024bd8]' : 'text-slate-900'
                  }`}
                >
                  {faq.question}
                </h3>
                <span
                  className={`shrink-0 p-1.5 rounded-full transition-colors ${
                    isOpen ? 'bg-[#024bd8]/10 text-[#024bd8]' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100 pb-5 px-6' : 'grid-rows-[0fr] opacity-0 px-6'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2 border-t border-slate-100">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;