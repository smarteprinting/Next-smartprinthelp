"use client";

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqSections = [
  {
    title: "General Information",
    questions: [
      {
        question: "What is Smart Print Help?",
        answer: "Smart Print Help is an independent online retailer specializing in printers and printing supplies. We serve customers across the United States and Canada with a focus on reliable products, transparent pricing, and a simple shopping experience.",
      },
      {
        question: "Are you a marketplace or multi-seller platform?",
        answer: "No. We operate as a single, independent retailer. All products are sourced through verified distribution channels and managed directly by us.",
      },
      {
        question: "Are you affiliated with printer brands or manufacturers?",
        answer: `No. Smart Print Help is an independent retailer and is not affiliated with, authorized by, or an official partner of any printer brand or manufacturer unless explicitly stated.

         All brand names, logos, and trademarks belong to their respective owners.`,
      },
    ],
  },
  {
    title: "Orders & Payments",
    questions: [
      {
        question: "How do I place an order?",
        answer: "Browse products, select the item you need, and proceed to checkout. The process is secure and straightforward.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept standard online payment methods, including major credit and debit cards. Available options are shown at checkout.",
      },
      {
        question: "Can I cancel or modify my order?",
        answer: "If your order has not yet been processed or shipped, you may request changes by contacting our support team as soon as possible.",
      },
    ],
  },
  {
    title: "Shipping & Delivery",
    questions: [
      {
        question: "Do you offer free shipping?",
        answer: "Yes. We offer free shipping across the United States and Canada.",
      },
      {
        question: "How long does delivery take?",
        answer: "Delivery times vary by location. Estimated timelines are provided during checkout and via order tracking.",
      },
      {
        question: "Will I receive tracking information?",
        answer: "Yes. Tracking details are shared once your order is shipped.",
      },
    ],
  },
  {
    title: "Products & Availability",
    questions: [
      {
        question: "Are your products genuine?",
        answer: "Yes. All products are sourced through verified and trusted distribution channels.",
      },
      {
        question: "Do printers include ink or toner?",
        answer: "Most printers include starter cartridges. Please check the product description for exact details.",
      },
      {
        question: "Do you sell replacement ink and toner?",
        answer: "Yes. We offer compatible ink and toner supplies for ongoing use.",
      },
    ],
  },
  {
    title: "Support & Assistance",
    questions: [
      {
        question: "Do you provide product support?",
        answer: `Yes. We provide general support and guidance to help our customers with:

Printer setup
Troubleshooting
Driver installation and updates
Offline and connectivity issues`,
      },
      {
        question: "Is your support an official manufacturer service?",
        answer: "No. Our support is independent guidance only and is not affiliated with or a substitute for manufacturer support services.",
      },
      {
        question: "Where can I find official manufacturer support?",
        answer: "For product-specific issues, warranty claims, or advanced technical assistance, we recommend visiting the official website of the printer brand or contacting the manufacturer directly.",
      },
      {
        question: "Does your support affect my product warranty?",
        answer: "No. Our guidance is general in nature and does not replace or interfere with manufacturer warranty terms. Warranty-related services are handled directly by the product manufacturer.",
      },
    ],
  },
  {
    title: "Warranty & Returns",
    questions: [
      {
        question: "Do your products come with a warranty?",
        answer: "Yes. All products are backed by a manufacturer warranty, as provided by the respective brand.",
      },
      {
        question: "Who handles warranty claims?",
        answer: "Warranty claims are handled directly by the manufacturer, not by Smart Print Help.",
      },
      {
        question: "What if I receive a damaged or defective product?",
        answer: "If your order arrives damaged or defective, please contact us promptly. We will assist you with the next steps in accordance with our policies.",
      },
      {
        question: "Can I return a product?",
        answer: "Return eligibility depends on our return policy. Please refer to the Return Policy page or contact support for assistance.",
      },
    ],
  },
];

const FAQContent = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (id) => {
    setActiveIndex(activeIndex === id ? null : id);
  };

  return (
    <section className="bg-gray-50 pt-16 pb-10">
      <div className="max-w-5xl mx-auto px-4">


        {faqSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-10">
            {/* Section Heading */}
            <h3 className="text-2xl font-bold text-gray-900 mb-5 border-l-4 border-[#EF4056] pl-4">
              {section.title}
            </h3>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              {section.questions.map((faq, questionIndex) => {
                const id = `${sectionIndex}-${questionIndex}`;

                return (
                  <div
                    key={id}
                    className="border-b last:border-b-0 border-gray-200"
                  >
                    <button
                      onClick={() => toggleAnswer(id)}
                      className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-gray-50 transition"
                    >
                      <span className="font-semibold text-gray-800 text-lg">
                        {faq.question}
                      </span>

                      {activeIndex === id ? (
                        <FaChevronUp className="text-[#EF4056]" />
                      ) : (
                        <FaChevronDown className="text-[#EF4056]" />
                      )}
                    </button>

                    {activeIndex === id && (
                      <div className="px-6 pb-5 text-gray-600 leading-7">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQContent;