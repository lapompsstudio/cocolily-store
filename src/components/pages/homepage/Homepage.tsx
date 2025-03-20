"use client";

import React, { useEffect, useState } from "react";
import OurMission from "./OurMission";
import Footer from "@/components/layout/footer";
import useColorStore from "@/store/colorStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import EventsHomepage from "./EventsHomepage";
import ShopOurProducts from "./ShopOurProducts";

const Homepage = () => {
  const [isRenderFooter, setIsRenderFooter] = useState<boolean>(false);
  const { currentColor, setColor } = useColorStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsRenderFooter(true);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useGSAP(() => {
    gsap.to(".test-bg", {
      backgroundColor: currentColor,
      duration: 1,
      ease: "power2.inOut",
    });
  }, [currentColor]);

  return (
    <>
      <OurMission />
      <ShopOurProducts />
      <EventsHomepage />
      {isRenderFooter && <Footer />}
    </>
  );
};

export default Homepage;
