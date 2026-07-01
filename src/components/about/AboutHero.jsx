import React from "react";

const AboutHero = () => {
  return (
    <section className="w-full">
      <div className="relative w-full overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <img
          src="/home-banner.webp"
          alt="About Smart Print Help"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gray-950/70"></div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-5 sm:px-8 md:px-12 py-16 sm:py-20 md:py-28">

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-white">
            Smart Printing Solutions <br />
            That Work for You
          </h1>

          <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl">
            <b>Reliable printers and supplies designed for everyday performance and long-term efficiency</b>
          </p>
          <br />
          <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl">
            Built on a commitment to clarity, reliability, and customer satisfaction, Smart Print Help delivers dependable printing solutions for homes, offices, and professionals across the United States and Canada.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
