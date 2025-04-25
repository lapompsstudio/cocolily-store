import React from "react";

import EventsHero from "./EventsHero";
import EventsList from "./EventsList";
import Footer from "@/components/layout/footer";
import CursorFollow from "@/components/ui/CursorFollow";

const Events = () => {
  return (
    <>
      <CursorFollow
        title={"SEE DETAIL"}
        isOneElement={false}
        isManyElement={true}
      />
      <EventsHero />
      <EventsList />
      <Footer />
    </>
  );
};

export default Events;
