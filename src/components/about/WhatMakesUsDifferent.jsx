import React from "react";

const WhatMakesUsDifferent = () => {
  return (
    <section className="w-full bg-white">
      <div className="flex flex-col lg:flex-row min-h-[500px] md:min-h-[620px]">
        {/* Left Side - Black background */}
        <div className="w-full lg:w-1/2 bg-black flex items-center">
          <div className="px-6 sm:px-10 lg:px-20 py-10 sm:py-12 lg:py-16 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-6 lg:mb-8">
              What Makes Us Different
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 lg:mb-8">
              Unlike large marketplaces with multiple sellers, Smart Print Help
              operates as a{" "}
              <span className="font-semibold text-white">
                single, accountable retailer.
              </span>
            </p>

            <p className="text-white text-sm sm:text-base mb-4">
              Every product listed on our platform is:
            </p>

            <ul className="space-y-2 text-gray-300 text-sm sm:text-base list-disc pl-5 mb-6 lg:mb-8">
              <li>Sourced through verified and trusted distribution channels</li>
              <li>Managed directly under our operational control</li>
              <li>Presented with accurate and clear product information</li>
            </ul>

            <p className="text-white text-sm sm:text-base mb-4">
              This ensures consistency in:
            </p>

            <ul className="space-y-2 text-gray-300 text-sm sm:text-base list-disc pl-5 mb-6 lg:mb-8">
              <li>Product quality</li>
              <li>Availability</li>
              <li>Pricing transparency</li>
              <li>Order fulfillment</li>
            </ul>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              You always know who you are buying from—
              <span className="font-semibold text-white">
                {" "}
                one reliable source you can trust.
              </span>
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-full h-[260px] sm:h-[340px] lg:w-1/2 lg:h-auto relative">
          <img
            src="/whatmakesus.webp"
            alt="What Makes Us Different"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default WhatMakesUsDifferent;