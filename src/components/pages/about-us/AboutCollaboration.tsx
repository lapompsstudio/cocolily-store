"use client";

import React, { useState } from "react";

import MarqueeItem from "./MarqueeItem";
import useSplitTextAnimation from "@/app/hooks/useSplitTextAnimation";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";

import { CollaborationResponse } from "@/types/api";

const AboutCollaboration = () => {
  const [isHovering, setIsHovering] = useState(false);
  useSplitTextAnimation({
    selector: ".collaboration-split-text",
  });

  const { data } = useQuery<CollaborationResponse>({
    queryKey: ["collaborations-query"],
    queryFn: async () => {
      const res = await fetch("/api/collaborations");
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  const collaborationImages = React.useMemo(() => {
    if (!data?.data || !Array.isArray(data.data) || data.data.length === 0) {
      // Return empty array if no collaborations data
      return [];
    }

    // Map through available collaboration images
    const images = data.data
      .filter((item) => item.featured_images?.url)
      .map((item) => item.featured_images.url);

    // Ensure we have exactly 5 items by repeating if necessary
    if (images.length === 0) {
      return [];
    } else {
      // Create an array of exactly 5 items by repeating the available images
      return Array.from({ length: 5 }, (_, i) => images[i % images.length]);
    }
  }, [data?.data]);

  return (
    <div className="min-h-screen bg-pale-sky-blue pt-120d">
      <div>
        <h2 className="text-center text-128d text-ruby-red font-abc uppercase">
          COLLABORATION
        </h2>
        <div className="grid md:landscape:grid-cols-12 gap-5">
          <p
            className={clsx(
              "md:landscape:col-start-8 md:landscape:col-span-3 mt-16 text-12d leading-1.4 text-ruby-red",
              "collaboration-split-text"
            )}
          >
            Our network of local, independent business partnerships extend into
            an exciting variety of industries. We are tied together by our
            curiosity and commitment to building each other up, collaborating
            with intention.
          </p>
        </div>
      </div>

      <div className="mt-110d overflow-hidden relative">
        <div className="marquee flex w-full overflow-hidden gap-20d">
          <div
            className="marquee-content flex gap-20d"
            style={{
              animation: "marquee 30s linear infinite",
              animationPlayState: isHovering ? "paused" : "running",
            }}
          >
            {[...collaborationImages, ...collaborationImages].map(
              (src, index) => (
                <MarqueeItem
                  key={`item1-${index}`}
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL + src}`}
                  index={index}
                  setIsHovering={setIsHovering}
                />
              )
            )}
          </div>

          <div
            className="marquee-content flex gap-20d"
            style={{
              animation: "marquee 30s linear infinite",
              animationPlayState: isHovering ? "paused" : "running",
            }}
          >
            {[...collaborationImages, ...collaborationImages].map(
              (src, index) => (
                <MarqueeItem
                  key={`item2-${index}`}
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL + src}`}
                  index={index}
                  setIsHovering={setIsHovering}
                />
              )
            )}
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default AboutCollaboration;
