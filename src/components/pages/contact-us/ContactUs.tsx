"use client";

import React, { useEffect } from "react";

import ContactUsHero from "./ContactUsHero";
import ContactUsForm from "./ContactUsForm";
import ContactUsSocial from "./ContactUsSocial";
import Footer from "@/components/layout/footer";
import { useFooterStore } from "@/store/footerStore";
import useColorStore from "@/store/colorStore";

const ContactUs = () => {
  const { isRenderFooter, initFooter } = useFooterStore();
  const { setColor } = useColorStore();

  useEffect(() => {
    setColor(4);
    initFooter();
  }, [setColor, initFooter]);

  return (
    <div className="bg-ivory-blush">
      <ContactUsHero />
      <ContactUsForm />
      <ContactUsSocial />
      {isRenderFooter && <Footer />}
    </div>
  );
};

export default ContactUs;
