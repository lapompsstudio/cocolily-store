"use client";

import React, { useState } from "react";

import MarqueeItem from "./MarqueeItem";

const AboutCollaboration = () => {
  const collaborationImages = Array(5).fill("/about-us/collaboration1.png");
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="min-h-screen bg-pale-sky-blue pt-120d">
      <div>
        <h2 className="text-center text-128d text-ruby-red font-abc uppercase">
          COLLABORATION
        </h2>
        <div className="grid md:landscape:grid-cols-12 gap-5">
          <p className="md:landscape:col-start-8 md:landscape:col-span-3 mt-16 text-12d leading-1.4 text-ruby-red">
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
                  src={src}
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
                  src={src}
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
