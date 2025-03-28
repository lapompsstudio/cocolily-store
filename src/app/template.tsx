"use client";

import React, { useEffect } from "react";
import { ReactLenis } from "lenis/react";
import { Navbar } from "@/components/layout/navbar";
import Preloader from "@/components/preloader";
import { globalStore } from "@/store/globalStore";

const Template = ({ children }: { children: React.ReactNode }) => {
  const { fetchGlobalData, isGlobalFetched } = globalStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isGlobalFetched) {
      fetchGlobalData();
    }
  }, [fetchGlobalData, isGlobalFetched]);

  return (
    <ReactLenis root>
      <Preloader />
      <Navbar />
      <main>{children}</main>
    </ReactLenis>
  );
};

export default Template;
