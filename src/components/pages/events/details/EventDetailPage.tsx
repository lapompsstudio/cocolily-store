"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";

import useColorStore from "@/store/colorStore";
import { useFooterStore } from "@/store/footerStore";
import { useQuery } from "@tanstack/react-query";

import EventDetailHero from "./EventDetailHero";
import EventDetailHighlight from "./EventDetailHighlight";
import EventDetailExperience from "./EventDetailExperience";
import EventDetailGallery from "./EventDetailGallery";
import EventDetailSummary from "./EventDetailSummary";
import Footer from "@/components/layout/footer";
import EventDetailHighlightDesc from "./EventDetailHighlightDesc";
import { EventDetail } from "@/types/api";

const EventDetailPage = () => {
  const { isRenderFooter, initFooter } = useFooterStore();
  const { setColor } = useColorStore();
  const params = useParams();

  const { data } = useQuery<EventDetail>({
    queryKey: ["event-details"],
    queryFn: async () => {
      const res = await fetch("/api/event-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ documentId: params.handle }),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  useEffect(() => {
    setColor(4);
    initFooter();
  }, [setColor, initFooter]);

  return (
    <div className="bg-ivory-blush">
      <EventDetailHero />
      <EventDetailHighlight />
      <EventDetailHighlightDesc />
      {data && <EventDetailExperience data={data} />}
      <EventDetailGallery />
      <EventDetailSummary />
      {isRenderFooter && <Footer />}
    </div>
  );
};

export default EventDetailPage;
