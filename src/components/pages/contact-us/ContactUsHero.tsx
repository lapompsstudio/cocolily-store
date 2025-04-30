"use client";

import React, { useRef } from "react";
import Image from "next/image";

import clsx from "clsx";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/src/all";

gsap.registerPlugin(SplitText);

const ContactUsHero = () => {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (marqueeRef.current) {
        gsap.to(".text-running-container", {
          transform: "translateY(0)",
          duration: 1,
          ease: "power1.inOut",
          onComplete: () => {
            const width = marqueeRef.current!.scrollWidth / 2; // karena ada 2 teks
            gsap.fromTo(
              marqueeRef.current,
              { x: 0 },
              {
                delay: 0.2,
                x: -width,
                duration: 10,
                repeat: -1,
                ease: "linear",
              }
            );
          },
        });
      }
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      gsap.to(".ornament", {
        delay: 1.5,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power1.inOut",
      });

      gsap.to(".contact-us", {
        transform: "translateY(0)",
        clipPath: "inset(0% 0% 0% 0%)",

        duration: 1,
        ease: "power1.inOut",
      });

      gsap.to(".desc", {
        transform: "translateY(0)",
        duration: 1,
        ease: "power1.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      className="text-ruby-red font-bold overflow-hidden relative bg-ivory-blush"
      ref={containerRef}
    >
      <div
        className={clsx(
          "md:landscape:px-20d md:landscape:mt-115d md:landscape:text-16d uppercase font-bold translate-y-full",
          "contact-us"
        )}
        style={{
          clipPath: "inset(0% 0% 100% 0%)",
        }}
      >
        Contact us
      </div>
      <div
        className={clsx(
          "absolute top-266d left-208d z-10 scale-150 opacity-0",
          "ornament"
        )}
      >
        <div className="w-200d h-200d relative">
          <Image
            src="/footer/ornament5_crop.png"
            alt="ornament"
            className="w-full h-full object-cover"
            fill
          />
        </div>
      </div>

      <div
        className={clsx(
          "absolute top-90d right-219d z-10 scale-150 opacity-0",
          "ornament"
        )}
      >
        <div className="w-200d h-200d relative">
          <Image
            src="/footer/ornament6_crop.png"
            alt="ornament"
            className="w-full h-full object-cover"
            fill
          />
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className={clsx(
            "md:landscape:mt-80d flex translate-y-full",
            "text-running-container"
          )}
          ref={marqueeRef}
        >
          <div className="font-abc md:landscape:text-128d uppercase whitespace-nowrap pr-400d">
            Slide Into Our Inbox
          </div>
          <div className="font-abc md:landscape:text-128d uppercase whitespace-nowrap pr-400d">
            Slide Into Our Inbox
          </div>
        </div>
      </div>

      <div className="md:landscape:mt-60d w-full flex justify-end px-20d font-sans md:landscape:text-12d">
        <div className="overflow-hidden">
          <div className="w-454d desc translate-y-full">
            A little hello or a big idea—we’re here for both.
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsHero;
