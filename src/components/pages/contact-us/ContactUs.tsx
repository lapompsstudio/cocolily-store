"use client";

import React, { useEffect } from "react";

import ContactUsHero from "./ContactUsHero";
import ContactUsForm from "./ContactUsForm";
import ContactUsSocial from "./ContactUsSocial";
import Footer from "@/components/layout/footer";
import { useFooterStore } from "@/store/footerStore";

const ContactUs = () => {
  const { isRenderFooter, initFooter } = useFooterStore();

  useEffect(() => {
    initFooter();
  }, [initFooter]);

  return (
    <>
      <ContactUsHero />
      <ContactUsForm />
      <ContactUsSocial />
      {isRenderFooter && <Footer />}
    </>
  );
};

export default ContactUs;
