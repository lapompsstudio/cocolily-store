import React from "react";

import EventsHero from "./EventsHero";
import EventsList from "./EventsList";
import Footer from "@/components/layout/footer";

const Events = () => {
  return (
    <>
      <EventsHero />
      <EventsList />
      <Footer />
    </>
  );
};

export default Events;
