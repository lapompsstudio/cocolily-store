import useRevealAnimation from "@/app/hooks/useRevealAnimation";
import useSplitTextAnimation from "@/app/hooks/useSplitTextAnimation";
import Maroon from "@/components/icons/Maroon";
import React from "react";

export default function EventDetailHighlightDesc() {
  useSplitTextAnimation({
    selector: ".event-detail-highlight-anim-text-2",
    // markers: true,
  });
  useRevealAnimation({
    selector: ".event-detail-highlight-anim-icon",
    startMd: "top bottom",
    markers: true,
  });
  return (
    <>
      <div className="bg-ruby-red w-full h-[90vh] flex flex-col items-center text-center text-white container-2-event-detail-highlight relative">
        <p className="font-bold font-abc uppercase mt-[20vh] event-detail-highlight-anim-text-2">
          at cocolily COUNTRY CLUB
        </p>
        <h4 className="font-bold uppercase font-abc w-1137d mt-[11vh] event-detail-highlight-anim-text-2">
          WE reimagined a historic space into a bold, modern experience. By
          blending timeless charm with fresh energy, we created a vibrant hub
          that speaks to a new generation To EXPLORE OUR CHOCOLATE-INFUSED that
          speaks to a new EXPERIENCES IN true Dubai style.
        </h4>
        <div className="mt-[19vh] event-detail-highlight-anim-icon">
          <Maroon />
        </div>
      </div>
      <div className="w-full h-264d z-10 bg-gradient-to-b from-ruby-red to-transparent"></div>
    </>
  );
}
