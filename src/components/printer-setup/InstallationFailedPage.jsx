"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const brandSupportNumbers = {
  HP: "+1 (855) 618-4642",
  Brother: "+1 (855) 618-4642",
  EPSON: "+1 (855) 618-4642",
  Canon: "+1 (855) 618-4642",
};

const brandThemes = {
  HP: {
    overlayStart: "rgba(0,92,145,.78)",
    overlayEnd: "rgba(0,56,92,.82)",
    bgImage: "/hero_background_image.jpg",
  },
  Brother: {
    overlayStart: "rgba(55,81,169,.82)",
    overlayEnd: "rgba(29,45,93,.84)",
    bgImage: "/brother-bg-setup.webp",
  },
  EPSON: {
    overlayStart: "rgba(55,81,169,.82)",
    overlayEnd: "rgba(29,45,93,.84)",
    bgImage: "/epson-bg-setup.webp",
  },
  Canon: {
    overlayStart: "rgba(141,51,67,.82)",
    overlayEnd: "rgba(89,30,42,.84)",
    bgImage: "/canon-bg-setup.webp",
  },
};

function normalizeBrand(value) {
  const normalized = (value || "").toString().trim().toLowerCase();

  if (["canon", "canon printer"].includes(normalized)) return "Canon";
  if (["epson", "epson printer"].includes(normalized)) return "EPSON";
  if (["brother", "brother printer"].includes(normalized)) return "Brother";
  if (["hp", "hp smart", "hp smart app"].includes(normalized)) return "HP";

  return "HP";
}

export default function InstallationFailedPage() {
  const { brand } = useParams();

  const resolvedBrand = normalizeBrand(brand);
  const brandName = resolvedBrand === "EPSON" ? "Epson" : resolvedBrand;

  const supportNumber =
    brandSupportNumbers[resolvedBrand] || brandSupportNumbers.HP;

  const theme = brandThemes[resolvedBrand] || brandThemes.HP;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        backgroundImage: `linear-gradient(135deg, ${theme.overlayStart}, ${theme.overlayEnd}), url('${theme.bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-5xl rounded-[28px] bg-white px-6 md:px-12 py-8 md:py-10 shadow-[0_20px_60px_rgba(0,0,0,.25)]">

        <div className="flex flex-col items-center text-center">

        {/* Warning Icon */}
<div className="mb-6 flex justify-center">
  <Image
    src="/warning-icon.png"
    alt="Warning"
    width={95}
    height={95}
    priority
    className="drop-shadow-[0_8px_16px_rgba(239,68,68,0.25)]"
  />
</div>

          {/* Title */}
          <h1 className="text-[28px] md:text-[34px] font-extrabold text-[#1E293B]">
            Printer Driver Installation Error
          </h1>

          {/* Error Message */}
          <p className="mt-5 text-red-600 font-bold text-lg md:text-[19px] max-w-4xl leading-8">
            We encountered an issue completing the{" "}
            {brandName} printer driver installation due to error{" "}
            <span className="font-extrabold">1603.</span>
          </p>

          {/* Contact */}
          <h2 className="mt-8 text-[28px] md:text-[40px] font-extrabold text-black">
            Contact {brandName} Support to Resolve this Issue
          </h2>

          {/* Phone */}
          <p className="mt-4 text-xl md:text-[22px] text-gray-700">
            Toll-Free (USA/CA):{" "}
            <span className="font-extrabold text-black">
              {supportNumber}
            </span>
          </p>

          {/* Chat Button */}
          <button
            type="button"
            onClick={() => {
              if (
                window.jivo_api &&
                typeof window.jivo_api.open === "function"
              ) {
                window.jivo_api.open();
              } else {
                alert("Chat support is not available yet.");
              }
            }}
            className="mt-6 px-12 py-4 rounded-2xl bg-[#2F63E8] hover:bg-[#2358DD] text-white text-xl font-bold transition-all duration-300 shadow-[0_12px_25px_rgba(47,99,232,.35)]"
          >
            Chat Now <span className="ml-2">»</span>
          </button>

          {/* Bottom Note */}
          <p className="mt-8 max-w-3xl text-center text-red-600 font-bold text-base md:text-lg leading-7">
            Note: For best results, avoid repeatedly attempting the
            installation without proper guidance, as it may not resolve
            the issue. Our experts are here to help you complete the
            setup correctly.
          </p>

        </div>
      </div>
    </div>
  );
}