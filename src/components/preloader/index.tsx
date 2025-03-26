"use client";

import React, { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import LogoPreloader from "./LogoPreloader";
import CircularPreloader from "./CircularPreloader";

gsap.registerPlugin(useGSAP);

const Preloader = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const preloaderText = gsap.utils.toArray(".preloader-text").reverse();
      const tl = gsap.timeline({});

      tl.to(preloaderText, {
        clipPath: "inset(0% 0% 0% 0%)",
        y: 0,
        stagger: 0.0125,
        duration: 0.6,
        ease: "power1.inOut",
      })
        .to(
          ".background-cirlce",
          {
            scale: 1,
            duration: 1.8,
            ease: "power1.inOut",
          },
          "-=1"
        )
        .from(
          ".circle-wrapper svg",
          {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            stagger: 0.0175,
            duration: 1.8,
            ease: "power1.inOut",
          },
          "<"
        )
        .to(
          ".circle-wrapper svg",
          {
            scale: 1,
            duration: 1.8,
            ease: "power1.inOut",
          },
          "<"
        )
        .to(
          ".circle-outter",
          {
            rotate: 0,
            duration: 1.8,
            ease: "power1.inOut",
          },
          "<"
        );

      // Add counter animation after the previous animations
      const counterTl = gsap.timeline({ delay: 0.2 });

      // Set initial values
      gsap.set(".hundreds span", { y: 0 });
      gsap.set(".tens span", { y: 0 });
      gsap.set(".numbers span", { y: 0 });

      // First sequence: 000%
      counterTl
        .add("start")

        // Second sequence: 047%
        .to(
          ".circle-outter",
          { rotate: 136, duration: 2, ease: "power1.inOut" },
          "start+=0.5"
        )
        .to(
          ".tens span",
          { y: "-400%", duration: 0.8, ease: "power1.inOut" },
          "<"
        )
        .to(
          ".numbers span",
          { y: "-700%", duration: 0.8, ease: "power1.inOut" },
          "<"
        )

        // Third sequence: 089%
        .to(".circle-outter", {
          rotate: 270,
          duration: 1.2,
          ease: "power1.inOut",
        })
        .to(
          ".tens span",
          { y: "-800%", duration: 0.8, ease: "power1.inOut" },
          "<"
        )
        .to(
          ".numbers span",
          { y: "-900%", duration: 0.8, ease: "power1.inOut" },
          "<"
        )

        // Final sequence: 100%
        .to(".circle-outter", {
          rotate: 360,
          duration: 0.8,
          delay: 0.5,
          ease: "power1.inOut",
        })
        .to(
          ".hundreds span",
          { y: "-100%", duration: 0.8, ease: "power1.inOut" },
          "<"
        )
        .to(
          ".tens span",
          { y: "-1000%", duration: 0.8, ease: "power1.inOut" },
          "<"
        )
        .to(
          ".numbers span",
          { y: "-1000%", duration: 0.8, ease: "power1.inOut" },
          "<"
        )
        .to([".preloader-top-sheet", ".circular-wrapper"], {
          y: "-175%",
          duration: 1.2,
          ease: "power1.inOut",
        })
        .to(
          ".preloader-bottom-sheet",
          {
            y: "175%",
            duration: 1.2,
            ease: "power1.inOut",
          },
          "<"
        )
        .to(containerRef.current, {
          display: "none",
        });

      // Chain the counter timeline after the main timeline
      tl.add(counterTl, ">");
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="preloader fixed top-0 left-0 flex flex-col w-screen h-screen z-preloader isolate"
    >
      <div className="preloader-top-sheet flex-1 bg-ruby-red relative z-20 isolate">
        <LogoPreloader />
      </div>

      <div className="circular-wrapper absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        <CircularPreloader />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-45d h-45d bg-ruby-red rounded-full z-20"></div>
      </div>

      <div className="preloader-bottom-sheet flex-1 bg-ruby-red relative z-10">
        <div className="h-full w-full bg-gradient-to-b from-[#700A21] from-0% via-[#700A21]/0 via-[33%] to-transparent to-100%"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center space-y-32d">
          <p className="preloader-text clipped text-white font-abc text-16d font-bold">
            LOADING SWEET CELEBRATION
          </p>
          <div className="preloader-text clipped flex justify-center text-white font-abc text-16d font-bold pb-55d">
            <p className="counter-digit hundreds flex flex-col h-20d overflow-hidden">
              <span>0</span>
              <span>1</span>
            </p>
            <p className="counter-digit tens flex flex-col h-20d overflow-hidden">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>0</span>
            </p>
            <p className="counter-digit numbers flex flex-col h-20d overflow-hidden">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>0</span>
            </p>
            <p className="flex flex-col">%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
