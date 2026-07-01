import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Browse Products",
      description: "Find printers and supplies based on your needs",
      icon: (
        <svg
          className="w-6 h-6 text-[#EF4056]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 7h-3V6a4 4 0 10-8 0v1H5a1 1 0 00-1 1v11a2 2 0 002 2h12a2 2 0 002-2V8a1 1 0 00-1-1zM10 6a2 2 0 114 0v1h-4V6zm8 13H6V9h12v10z" />
        </svg>
      ),
    },
    {
      title: "Place Your Order",
      description: "Easy and secure checkout process",
      icon: (
        <svg
          className="w-6 h-6 text-[#EF4056]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7 18a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4zM7.17 14h9.94a2 2 0 001.94-1.52L21 7H6.21l-.3-2H2v2h2l2.6 10h12.4v-2H7.17z" />
        </svg>
      ),
    },
    {
      title: "Fast Delivery",
      description: "Free shipping with tracking included",
      icon: (
        <svg
          className="w-6 h-6 text-[#EF4056]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20 8h-3V4H3v13h2a3 3 0 106 0h2a3 3 0 106 0h2v-5l-3-4zM8 18a1 1 0 110 2 1 1 0 010-2zm10 0a1 1 0 110 2 1 1 0 010-2zm-1-6V10h2.48L21 12h-4z" />
        </svg>
      ),
    },
    {
      title: "Ongoing Support",
      description: "Assistance available whenever you need it",
      icon: (
        <svg
          className="w-6 h-6 text-[#EF4056]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2a8 8 0 00-8 8v5a3 3 0 003 3h1v-7H6v-1a6 6 0 1112 0v1h-2v7h1a3 3 0 003-3v-5a8 8 0 00-8-8z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-[#F9ECEC] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] mb-3">
            How It Works
          </h2>

          <p className="text-gray-600 text-sm sm:text-base">
            Simple. Clear. Reliable.
          </p>
        </div>

        {/* White Card */}
        <div className="bg-white rounded-[24px] border border-gray-200 px-6 py-10">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 px-6 py-4 ${index !== steps.length - 1
                    ? "lg:border-r border-gray-200"
                    : ""
                  }`}
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-full border-2 border-[#EF4056] flex items-center justify-center flex-shrink-0">
                  {step.icon}
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-8">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;