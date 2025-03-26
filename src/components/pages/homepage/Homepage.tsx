"use client";

import React, { useEffect, useState } from "react";
import OurMission from "./OurMission";
import Footer from "@/components/layout/footer";
import EventsHomepage from "./EventsHomepage";
import ShopOurProducts from "./ShopOurProducts";
import Hero from "./Hero";
import CursorFollow from "@/components/ui/CursorFollow";
import useScrollAndLenis from "@/app/hooks/useScrollAndLenis";

const Homepage = () => {
  const [isRenderFooter, setIsRenderFooter] = useState<boolean>(false);
  useScrollAndLenis(11000);

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
      <CursorFollow />
      <Hero />
      <OurMission />
      <ShopOurProducts />
      <EventsHomepage />
      {isRenderFooter && <Footer />}
    </>
  );
};

export default Homepage;
