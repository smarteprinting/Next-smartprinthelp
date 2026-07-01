"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  const handleViewCollection = () => {
    router.push("/shop");
  };

  return (
    <section className="relative w-full h-[88vh] min-h-[650px] overflow-hidden">
      {/* Background Image */}
      <img
        src="/home-banner.webp"
        alt="Printing background"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-5 sm:px-8 md:px-12">

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white mb-6">
          Reliable Printers for Home
          <br />
          & Business – Delivered with
          <br />
          Confidence
        </h1>

        <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mb-8">
          Shop a curated selection of printers, ink, toner, and accessories
          from trusted brands. Enjoy fast shipping, secure checkout,
          competitive pricing, and dependable customer support for all your
          printing needs.
        </p>

        <button
          onClick={handleViewCollection}
          className="bg-[#EF4056] text-white px-8 py-3 rounded-full font-bold text-sm sm:text-base uppercase tracking-wider hover:bg-[#d93548] transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
        >
          Explore The Collection
        </button>

      </div>
    </section>
  );
};

export default Hero;