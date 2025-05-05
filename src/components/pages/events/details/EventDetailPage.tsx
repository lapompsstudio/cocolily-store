"use client";

import React, { useEffect } from "react";

import useColorStore from "@/store/colorStore";
import { useFooterStore } from "@/store/footerStore";

import EventDetailHero from "./EventDetailHero";
import EventDetailHighlight from "./EventDetailHighlight";
import EventDetailExperience from "./EventDetailExperience";
import EventDetailGallery from "./EventDetailGallery";
import EventDetailSummary from "./EventDetailSummary";
import Footer from "@/components/layout/footer";

const EventDetailPage = () => {
  const { isRenderFooter, initFooter } = useFooterStore();
  const { setColor } = useColorStore();

  useEffect(() => {
    setColor(4);
    initFooter();
  }, [setColor, initFooter]);

  return (
    <div className="bg-ivory-blush">
      <EventDetailHero />
      <EventDetailHighlight />
      <EventDetailExperience />
      <EventDetailGallery />
      <EventDetailSummary />
      {isRenderFooter && <Footer />}
    </div>
  );
};

export default EventDetailPage;
