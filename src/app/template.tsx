import React from "react";
import { ReactLenis } from "lenis/react";

const Template = ({ children }: { children: React.ReactNode }) => {
  return <ReactLenis root>{children}</ReactLenis>;
};

export default Template;
