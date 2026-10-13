"use client"

import React, { useState } from 'react'

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "What are the steps to get an HP printer set up?",
      answer: "Power on the printer and load its ink or toner and paper. Connect it to your computer or WiFi, install software or a driver that matches your model, add it to your device, and print a test page."
    },
    {
      question: "How can I get my HP printer onto a WiFi network?",
      answer: "From the printer's wireless or network menu, choose your WiFi name and enter its password. Follow any remaining prompts until the printer confirms it is connected."
    },
    {
      question: "How can I link my printer with a computer?",
      answer: "Use WiFi, USB, or another connection supported by the printer. Then open Printers & Scanners on your computer, choose the option to add a device, and follow the setup prompts."
    },
    {
      question: "Where do I add a printer on my computer?",
      answer: "Go to your computer's Printers & Scanners settings, start adding a printer or device, select your printer when it appears, and finish the on-screen instructions."
    },
    {
      question: "What makes a printer show as offline?",
      answer: "The computer may have lost contact with the printer. This can happen because of a WiFi, USB, or network interruption, a stalled print queue, the selected printer, or a configuration issue."
    },
    {
      question: "What should I try when my printer is offline?",
      answer: "Inspect its connection, restart the printer and computer, make sure the correct device is selected, and clear any stuck jobs. If it remains offline, remove and add the printer again."
    },
    {
      question: "Why does my HP printer say it's offline?",
      answer: "An HP printer may show offline if the computer cannot reach it. Check that the printer is powered on and connected, review the print queue and selected device, and verify its software."
    },
    {
      question: "Why won't my printer connect?",
      answer: "A wrong WiFi password, a network change, a faulty USB connection, printer configuration, or driver and software problems can interrupt the connection."
    },
    {
      question: "What can I check if my HP printer won't connect?",
      answer: "Confirm the HP printer is using the right WiFi network or computer connection. Review its settings, restart the printer and computer, and make sure software for your model is installed."
    },
    {
      question: "How can I get the right driver for an HP printer?",
      answer: "Find your printer's exact model and your computer's operating system. Use HP's official resources to get the matching driver or software, then follow the installation steps."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 uppercase tracking-wider">
            Need an Answer?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Printer Setup Questions and Answers
          </h2>
          <p className="text-slate-600 text-base max-w-xl mx-auto">
            Browse helpful answers about setting up printers, connecting to WiFi, and resolving common issues.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="font-semibold text-slate-900 text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm transition-transform duration-200 ${isOpen ? 'rotate-45 bg-blue-50 text-blue-600' : ''}`}>
                    +
                  </span>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default FAQSection