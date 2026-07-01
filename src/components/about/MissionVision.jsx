import React from "react";

const MissionVision = () => {
  return (
    <section className="w-full bg-gray-50 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Purpose, Your <br />
            Productivity
          </h2>

          <p className="text-gray-500 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            At Smart Print Help, everything we do is centered around helping you print <br /> smarter, faster, and more efficiently.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Mission Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-10 sm:p-12 text-center shadow-sm hover:shadow-md transition-shadow">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 bg-[#EF4056] rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-5">
              Our Mission
            </h3>

            <p className="text-gray-600 text-sm sm:text-base leading-8">
              To provide reliable, high-quality printers and supplies through a transparent and easy-to-use online platform, helping individuals and businesses meet their everyday printing needs with confidence.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-10 sm:p-12 text-center shadow-sm hover:shadow-md transition-shadow md:mt-12">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 bg-[#EF4056] rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 3l14 9-14 9V3z"
                  />
                </svg>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-5">
              Our Vision
            </h3>

            <p className="text-gray-600 text-sm sm:text-base leading-8">
              To become a trusted destination for printing solutions across the United States and Canada by delivering consistent quality, clear communication, and dependable customer support—setting a higher standard for online printer retail.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;