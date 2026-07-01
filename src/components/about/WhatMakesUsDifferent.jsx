import React from "react";

const WhatMakesUsDifferent = () => {
  return (
    <section className="w-full bg-white">
      <div className="relative flex min-h-[500px] md:min-h-[620px]">
        {/* Left Side - Black background (~50%) */}
        <div className="w-full sm:w-[50%] bg-black flex items-center">
          <div className="px-10 sm:px-16 lg:px-20 py-12 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-8">
              What Makes Us Different
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
              Unlike large marketplaces with multiple sellers, Smart Print Help
              operates as a{" "}
              <span className="font-semibold text-white">
                single, accountable retailer.
              </span>
            </p>

            <p className="text-white text-sm sm:text-base mb-5">
              Every product listed on our platform is:
            </p>

            <ul className="space-y-2 text-gray-300 text-sm sm:text-base list-disc pl-5 mb-8">
              <li>Sourced through verified and trusted distribution channels</li>
              <li>Managed directly under our operational control</li>
              <li>Presented with accurate and clear product information</li>
            </ul>

            <p className="text-white text-sm sm:text-base mb-5">
              This ensures consistency in:
            </p>

            <ul className="space-y-2 text-gray-300 text-sm sm:text-base list-disc pl-5 mb-8">
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

        {/* Right Side - Image (~50%) */}
        <div className="hidden sm:block sm:w-[50%] relative">
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