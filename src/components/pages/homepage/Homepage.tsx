"use client";

import React, { useEffect, useState } from "react";
import OurMission from "./OurMission";
import Footer from "@/components/layout/footer";
import EventsHomepage from "./EventsHomepage";
import ShopOurProducts from "./ShopOurProducts";
import Hero from "./Hero";

const Homepage = () => {
  const [isRenderFooter, setIsRenderFooter] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsRenderFooter(true);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <Hero />
      <OurMission />
      <ShopOurProducts />
      <EventsHomepage />
      {isRenderFooter && <Footer />}
    </>
  );
};

export default Homepage;
