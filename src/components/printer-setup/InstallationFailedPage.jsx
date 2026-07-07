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
      className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-4 sm:py-6"
      style={{
        backgroundImage: `linear-gradient(135deg, ${theme.overlayStart}, ${theme.overlayEnd}), url('${theme.bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-4xl rounded-[28px] bg-white/95 px-5 py-6 md:px-10 md:py-8 shadow-[0_18px_48px_rgba(0,0,0,.22)] backdrop-blur-sm">
        <div className="flex flex-col items-center text-center gap-4">

<div className="mb-4 flex justify-center">
            <Image
              src="/warning-icon.png"
              alt="Warning"
              width={64}
              height={64}
              priority
              className="drop-shadow-[0_8px_16px_rgba(239,68,68,0.22)]"
            />
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold text-[#1E293B]">
            Printer Driver Installation Error
          </h1>

          <p className="mt-3 text-red-600 font-semibold text-sm sm:text-base max-w-3xl leading-6">
            We encountered an issue completing the {brandName} printer driver installation due to error <span className="font-extrabold">1603.</span>
          </p>

          <h2 className="mt-4 text-lg sm:text-2xl font-extrabold text-black">
            Contact {brandName} Support to Resolve this Issue
          </h2>

          <p className="mt-3 text-base sm:text-lg text-gray-700">
            Toll-Free (USA/CA): <span className="font-bold text-black text-lg sm:text-xl">{supportNumber}</span>
          </p>

          <button
            type="button"
            onClick={() => {
              if (window.jivo_api && typeof window.jivo_api.open === "function") {
                window.jivo_api.open();
              } else {
                alert("Chat support is not available yet.");
              }
            }}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-[26px] bg-[#2563EB] px-10 py-3 text-white text-base font-semibold shadow-[0_14px_30px_rgba(37,99,235,0.25)] transition duration-200 hover:bg-[#1d4ed8]"
          >
            Chat Now <span className="text-xl leading-none">»</span>
          </button>

          <p className="mt-4 max-w-2xl text-center text-red-600 font-semibold text-sm leading-5">
            Note: For best results, avoid repeatedly attempting the installation without proper guidance, as it may not resolve the issue. Our experts are here to help you complete the setup correctly.
          </p>

        </div>
      </div>
    </div>
  );
}