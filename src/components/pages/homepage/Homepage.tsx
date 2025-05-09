"use client";

import React, { useEffect, useState } from "react";
import OurMission from "./OurMission";
import Footer from "@/components/layout/footer";
import EventsHomepage from "./EventsHomepage";
import ShopOurProducts from "./ShopOurProducts";
import Hero from "./Hero";
import CursorFollow from "@/components/ui/CursorFollow";
import useScrollAndLenis from "@/app/hooks/useScrollAndLenis";
import Preloader from "@/components/preloader";
import { useFooterStore } from "@/store/footerStore";

const Homepage = () => {
  const { isRenderFooter, initFooter } = useFooterStore();
  const [isPreloaderShow, setIsPreloaderShow] = useState<boolean>(false);

  useEffect(() => {
    // Check if running in browser environment
    if (typeof window !== "undefined") {
      const preloaderShown = localStorage.getItem("PreloaderShown");

      if (preloaderShown !== null && preloaderShown !== "") {
        // Parse the stored timestamp
        const lastShownTime = parseInt(preloaderShown, 10);
        const currentTime = new Date().getTime();

        // Calculate difference in milliseconds
        const timeDifference = currentTime - lastShownTime;
        const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        // Show preloader if more than 24 hours have passed
        if (timeDifference > twentyFourHours) {
          setIsPreloaderShow(true);
        } else {
          setIsPreloaderShow(false);
        }
      } else {
        // No timestamp stored, show preloader
        setIsPreloaderShow(true);
      }
    }
  }, []);

  useScrollAndLenis(isPreloaderShow ? 11000 : 500);

  useEffect(() => {
    initFooter();
  }, [initFooter]);

  return (
    <>
      {isPreloaderShow && <Preloader />}
      <CursorFollow
        title={"LEARN MORE"}
        isOneElement={true}
        isManyElement={false}
      />
      <Hero />
      {/* <OurMission />
      <ShopOurProducts />
      <EventsHomepage />
      {isRenderFooter && <Footer />} */}
    </>
  );
};

export default Homepage;
