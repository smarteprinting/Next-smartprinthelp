import React from "react";
import AboutHero from "./AboutHero";
import WhoWeAre from "./WhoWeAre";
import WhatMakesUsDifferent from "./WhatMakesUsDifferent";
import MissionVision from "./MissionVision";
import SEO from '../common/SEO';
import HowItWorks from "../home/HowItWorks";

const AboutMain = () => {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Smart Print Help — your trusted source for affordable printers, ink, and toner cartridges. Quality products with expert support."
        canonical="/about"
      />
      <AboutHero />

      <WhoWeAre />
      <WhatMakesUsDifferent />
      <HowItWorks />
      <MissionVision />
    </>
  );
};

export default AboutMain;
