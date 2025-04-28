"use client";

import React, { useEffect } from "react";

import EventsHero from "./EventsHero";
import EventsList from "./EventsList";
import Footer from "@/components/layout/footer";
import CursorFollow from "@/components/ui/CursorFollow";
import { useFooterStore } from "@/store/footerStore";

const Events = () => {
  const { isRenderFooter, initFooter } = useFooterStore();

  useEffect(() => {
    initFooter();
  }, [initFooter]);

  return (
    <>
      <CursorFollow
        title={"SEE DETAIL"}
        isOneElement={false}
        isManyElement={true}
      />
      <EventsHero />
      <EventsList />
      {isRenderFooter && <Footer />}
    </>
  );
};

export default Events;
