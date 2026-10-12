"use client"
import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I connect my printer to my computer?",
    answer:
      "Turn on your printer and connect it using a USB cable or Wi-Fi. Open your computer's printer settings, select the available device, and follow the on-screen instructions to complete the setup.",
  },
  {
    question: "Why is my printer offline even though it is connected?",
    answer:
      "Your computer may have lost communication with the printer because of network issues, a stuck print queue, an incorrect printer selection, or driver problems. Check the connection and make sure the printer is set as online.",
  },
  {
    question: "How do I fix printer offline status on Windows?",
    answer:
      "Verify the printer connection, clear any stuck print jobs, disable the Use Printer Offline option if enabled, select the correct printer, and check for driver or connectivity issues.",
  },
  {
    question: "How do I add a wireless printer to Windows 11?",
    answer:
      "Open Settings, navigate to Bluetooth & devices, and select Printers & scanners. Choose Add device and follow the instructions. Make sure your printer and computer are connected to the appropriate network.",
  },
  {
    question: "Why is my printer not connecting to Wi-Fi?",
    answer:
      "Common causes include an incorrect Wi-Fi password, a weak wireless signal, incompatible network settings, or a router connection problem. Verify your network credentials and check your printer's wireless status.",
  },
  {
    question: "Can I install a printer without a CD?",
    answer:
      "Yes. Most printers can be installed using your operating system's built-in setup tools or by downloading compatible drivers and software from the manufacturer's official support website.",
  },
  {
    question: "How do I connect a printer to my Mac?",
    answer:
      "Open System Settings and select Printers & Scanners. Click Add Printer, Scanner, or Fax, choose your available printer, and follow the setup instructions. Some models may require additional software.",
  },
  {
    question: "Why is my printer connected but not printing?",
    answer:
      "Check for paused or stuck print jobs, paper jams, low ink or toner, error messages, and incorrect printer selection. Restarting the printer and computer may also help restore communication.",
  },
  {
    question: "How can I install printer drivers?",
    answer:
      "Identify your printer's exact model and visit the manufacturer's official support website. Download the driver compatible with your operating system, run the installer, and follow the setup instructions.",
  },
  {
    question: "Can I connect a printer to Wi-Fi without a computer?",
    answer:
      "Many printers support wireless setup directly through their control panel, WPS where supported, or a manufacturer's mobile app. Available methods depend on the printer model and network configuration.",
  },
  {
    question: "What should I do if my printer is not detected?",
    answer:
      "Confirm that the printer is powered on, check its USB or Wi-Fi connection, and ensure your computer is using compatible drivers. For wireless printers, verify that the printer is connected to the correct network.",
  },
  {
    question: "Where can I get additional setup help?",
    answer:
      "Consult your printer manufacturer's official documentation for model-specific instructions. You can also contact Smart Print Help through its available support options for additional setup guidance.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? -1 : index
    );
  };

  return (
    <section
      id="faqs"
      className="w-full bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="mb-10 text-center sm:mb-12">
          <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
            <HelpCircle size={18} aria-hidden="true" />
            <span>HELP CENTER</span>
          </div>

          <h2
            id="faq-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
            Find answers to common printer setup, connectivity, driver
            installation, and troubleshooting questions.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;
            const questionId = `faq-question-${index}`;

            return (
              <div key={faq.question} className="w-full">
                <h3>
                  <button
                    id={questionId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600 sm:py-6"
                  >
                    <span
                      className={`text-base font-semibold leading-7 sm:text-lg ${
                        isOpen ? "text-blue-700" : "text-gray-900"
                      }`}
                    >
                      {faq.question}
                    </span>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-600">
                      {isOpen ? (
                        <Minus size={17} aria-hidden="true" />
                      ) : (
                        <Plus size={17} aria-hidden="true" />
                      )}
                    </span>
                  </button>
                </h3>

                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  hidden={!isOpen}
                  className="pb-5 sm:pb-6"
                >
                  <p className="max-w-3xl pr-2 text-sm leading-7 text-gray-600 sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
