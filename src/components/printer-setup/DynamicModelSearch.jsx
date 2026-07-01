"use client";
import React from "react";
import { useParams } from 'next/navigation';
import ModelSearch from "./ModelSearch";

const brandConfigs = {
  HP: {
    logo: "/hp-bg.png",
    placeholder: 'e.g. "OfficeJet 9010"',
    bgImage: "/hero_background_image.jpg",
    searchButtonBgColor: "bg-blue-600",
    searchButtonTextColor: "text-white",
    searchButtonHoverColor: "bg-blue-700",

  },
  Brother: {
    logo: "/brother-bg.png",
    placeholder: 'e.g. "HL-L2350DW"',
    bgImage: "/hero_background_image.jpg",
     searchButtonBgColor: "bg-blue-900",
    searchButtonTextColor: "text-white",
    searchButtonHoverColor: "bg-blue-800",
  },
  EPSON: {
    logo: "/epson-bg.png",
    placeholder: 'e.g. "EcoTank L3150"',
    bgImage: "/hero_background_image.jpg",
     searchButtonBgColor: "bg-blue-950",
    searchButtonTextColor: "text-white",
    searchButtonHoverColor: "bg-blue-800",
  },
  Canon: {
    logo: "/canon-bg.png",
    placeholder: 'e.g. "PIXMA G3000"',
    bgImage: "/canon-gemini2.jpeg",
     searchButtonBgColor: "bg-red-700",
    searchButtonTextColor: "text-white",
    searchButtonHoverColor: "bg-red-600",
  },
};

const DynamicModelSearch = () => {
  const { brand } = useParams();
  const config = brandConfigs[brand] || {};
  return (
    <ModelSearch
      brand={brand}
      logo={config.logo}
      placeholder={config.placeholder}
      bgImage={config.bgImage}
      searchButtonBgColor={config.searchButtonBgColor}
      searchButtonTextColor={config.searchButtonTextColor}
      searchButtonHoverColor={config.searchButtonHoverColor}
    />
  );
};

export default DynamicModelSearch;
