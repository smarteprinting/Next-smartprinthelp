import React from "react";

const WhoWeAre = () => {
  return (
    <section className="w-full bg-[#f6eced] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative flex min-h-[520px] lg:min-h-[600px]">
          {/* Left Image */}
          <div className="w-full lg:w-[75%] relative rounded-2xl overflow-hidden">
            <img
              src="/bg-image-home.webp"
              alt="Who We Are"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Right Background */}
          <div className="hidden lg:block lg:w-[25%] bg-[#f6eced]"></div>

          {/* Floating Card */}
          <div className="absolute top-1/2 right-4 lg:right-[6%] -translate-y-1/2 w-[92%] sm:w-[70%] lg:w-[42%] xl:w-[38%] z-10">
            <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-10">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Who We Are
              </h2>

              <div className="space-y-8 text-gray-700 leading-8 text-lg">
                <p>
                  <span className="font-semibold text-gray-900">
                    Smart Print Help
                  </span>{" "}
                  is an independent eCommerce retailer based in Torrance,
                  California, United States, focused exclusively on printers and
                  essential printing supplies.
                </p>

                <p>
                  We serve customers across the United States and Canada,
                  providing reliable solutions for home users, businesses, and
                  professionals who depend on consistent and efficient printing.
                </p>

                <p>
                  Our goal is simple:{" "}
                  <span className="font-semibold text-gray-900">
                    to make buying printers online clear, reliable, and
                    straightforward.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;