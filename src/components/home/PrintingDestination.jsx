import React from "react";

const PrintingDestination = () => {
  return (
    <section className="w-full bg-white">
      <div className="relative h-[700px] overflow-hidden">

        {/* Left Image */}
        <div className="absolute left-0 top-0 w-full lg:w-[74%] h-full">
          <img
            src="/bg-image-home.webp"
            alt="People discussing printers"
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        </div>

        {/* Right Background */}
        <div className="hidden lg:block absolute right-0 top-0 w-[26%] h-full bg-[#F7EFEF]"></div>

        {/* Floating Card */}
        <div className="absolute top-1/2 right-6 lg:right-[10%] -translate-y-1/2 z-10 w-[92%] sm:w-[70%] lg:w-[34%]">
          <div className="bg-white rounded-[32px] shadow-2xl p-8 lg:p-12">

            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-6">
              A Better Way to Buy Printers Online
            </h2>

            <p className="text-gray-600 text-lg leading-8 mb-8">
              We are an independent eCommerce retailer focused exclusively on
              printing solutions. Every product is sourced through verified
              distribution channels and managed directly by us—ensuring
              accuracy, consistency, and accountability.
            </p>

            <ul className="space-y-4 text-gray-700 text-lg leading-8">
              <li>
                • <strong>Curated Selection</strong> – Only relevant and
                reliable products
              </li>

              <li>
                • <strong>Clear Information</strong> – No confusion, just
                accurate details
              </li>

              <li>
                • <strong>Transparent Pricing</strong> – No hidden costs
              </li>

              <li>
                • <strong>Streamlined Shopping</strong> – Simple browsing and
                checkout
              </li>

              <li>
                • <strong>Reliable Fulfillment</strong> – Direct delivery across
                the US & Canada
              </li>
            </ul>

          </div>
        </div>

      </div>
    </section>
  );
};

export default PrintingDestination;