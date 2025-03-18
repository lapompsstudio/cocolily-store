import React from "react";
import { ReactLenis } from "lenis/react";
import Footer from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis root>
      <Navbar />
      <main>{children}</main>
    </ReactLenis>
  );
};

export default Template;
