import React from "react";

import AboutHero from "@/components/pages/about-us/AboutHero";
import AboutProductGrid from "@/components/pages/about-us/AboutProductGrid";
import AboutProductHighlight from "@/components/pages/about-us/AboutProductHighlight";
import AboutPurpose from "@/components/pages/about-us/AboutPurpose";
import AboutWhatDone from "@/components/pages/about-us/AboutWhatDone";
import AboutCollaboration from "@/components/pages/about-us/AboutCollaboration";
import Footer from "@/components/layout/footer";
import WeCareSection from "@/components/pages/about-us/WeCareSection";

const AboutUsPage = () => {
  return (
    <>
      <AboutHero />
      <AboutProductGrid />
      <AboutProductHighlight />
      <AboutPurpose />
      <WeCareSection />
      <AboutWhatDone />
      <AboutCollaboration />
      <Footer />
    </>
  );
};

export default AboutUsPage;
