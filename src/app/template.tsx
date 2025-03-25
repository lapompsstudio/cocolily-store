import React from "react";
import { ReactLenis } from "lenis/react";
import { Navbar } from "@/components/layout/navbar";
import Preloader from "@/components/preloader";

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis root>
      {/* <Preloader /> */}
      <Navbar />
      <main>{children}</main>
    </ReactLenis>
  );
};

export default Template;
