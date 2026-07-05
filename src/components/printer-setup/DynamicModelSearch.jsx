"use client";
import React from "react";
import { useParams } from 'next/navigation';
import ModelSearch from "./ModelSearch";

function normalizeBrand(value) {
  const normalizedValue = (value || '').toString().trim().toLowerCase();

  if (['canon', 'canon print', 'canon printer'].includes(normalizedValue)) {
    return 'Canon';
  }

  if (['epson', 'epson printer'].includes(normalizedValue)) {
    return 'EPSON';
  }

  if (['brother', 'brother printer'].includes(normalizedValue)) {
    return 'Brother';
  }

  if (['hp', 'hp smart', 'hp smart app'].includes(normalizedValue)) {
    return 'HP';
  }

  return 'HP';
}

const brandConfigs = {
  HP: {
    logo: "/hp-bg.png",
    placeholder: 'e.g. "OfficeJet 9010"',
    bgImage: "/hero_background_image.jpg",
    searchButtonBgColor: "#279ACB",
    searchButtonTextColor: "text-white",
    searchButtonHoverColor: "#1f7fb4",
    searchButtonShadowColor: "rgba(39, 154, 203, 0.35)",
  },
  Brother: {
    logo: "/brother-bg.png",
    placeholder: 'e.g. "HL-L2350DW"',
    bgImage: "/brother-bg-setup.webp",
    searchButtonBgColor: "#3751A9",
    searchButtonTextColor: "text-white",
    searchButtonHoverColor: "#2d4290",
    searchButtonShadowColor: "rgba(55, 81, 169, 0.35)",
  },
  EPSON: {
    logo: "/epson-bg.png",
    placeholder: 'e.g. "EcoTank L3150"',
    bgImage: "/epson-bg-setup.webp",
    searchButtonBgColor: "#3751A9",
    searchButtonTextColor: "text-white",
    searchButtonHoverColor: "#2d4290",
    searchButtonShadowColor: "rgba(55, 81, 169, 0.35)",
  },
  Canon: {
    logo: "/canon-bg.png",
    placeholder: 'e.g. "PIXMA G3000"',
    bgImage: "/canon-bg-setup.webp",
    searchButtonBgColor: "#8D3343",
    searchButtonTextColor: "text-white",
    searchButtonHoverColor: "#6c2735",
    searchButtonShadowColor: "rgba(141, 51, 67, 0.35)",
  },
};

const DynamicModelSearch = () => {
  const { brand } = useParams();
  const resolvedBrand = normalizeBrand(brand);
  const config = brandConfigs[resolvedBrand] || brandConfigs.HP;
  return (
    <ModelSearch
      brand={brand}
      logo={config.logo}
      placeholder={config.placeholder}
      bgImage={config.bgImage}
      searchButtonBgColor={config.searchButtonBgColor}
      searchButtonTextColor={config.searchButtonTextColor}
      searchButtonHoverColor={config.searchButtonHoverColor}
      searchButtonShadowColor={config.searchButtonShadowColor}
    />
  );
};

export default DynamicModelSearch;
