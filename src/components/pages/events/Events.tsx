"use client";

import React, { useEffect } from "react";

import EventsHero from "./EventsHero";
import EventsList from "./EventsList";
import Footer from "@/components/layout/footer";
import CursorFollow from "@/components/ui/CursorFollow";
import { useFooterStore } from "@/store/footerStore";
import useColorStore from "@/store/colorStore";

const Events = () => {
  const { isRenderFooter, initFooter } = useFooterStore();
  const { setColor } = useColorStore();

  useEffect(() => {
    setColor(4);
    initFooter();
  }, [setColor, initFooter]);

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
