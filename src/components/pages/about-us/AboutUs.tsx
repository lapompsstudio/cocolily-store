import React from "react";
import AboutHero from "./AboutHero";
import AboutProductGrid from "./AboutProductGrid";
import AboutPurpose from "./AboutPurpose";
import WeCareSection from "./WeCareSection";
import AboutWhatDone from "./AboutWhatDone";
import AboutCollaboration from "./AboutCollaboration";
import Footer from "@/components/layout/footer";

const AboutUs = () => {
  return (
    <>
      <AboutHero />
      <AboutProductGrid />
      <AboutPurpose />
      <WeCareSection />
      <AboutWhatDone />
      <AboutCollaboration />
      <Footer />
    </>
  );
};

export default AboutUs;
