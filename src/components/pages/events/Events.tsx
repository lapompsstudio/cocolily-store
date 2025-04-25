import React from "react";

import EventsHero from "./EventsHero";
import EventsList from "./EventsList";
import Footer from "@/components/layout/footer";
import CursorFollow from "@/components/ui/CursorFollow";

const Events = () => {
  return (
    <>
      <CursorFollow />
      <EventsHero />
      <EventsList />
      <Footer />
    </>
  );
};

export default Events;
