"use client";
import GradientImage from "@/components/ui/GradientImage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutProductGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".container-anim-scroll",
            start: "-60% 50%",
            end: "60% 50%",
            scrub: 1,
            // markers: true,
          },
        })
        .to(".anim-scroll-3", {
          y: "15%",
          ease: "none",
        })
        .to(
          ".anim-scroll-2",
          {
            y: "-5%",
            ease: "none",
          },
          "<"
        )
        .to(
          ".anim-scroll-1",
          {
            y: "10%",
            ease: "none",
          },
          "<"
        );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".container-anim-scroll",
            start: "top 30%",
            end: "200% 30%",
            scrub: 1,
            // markers: true,
          },
        })
        .to(".content-anim-scroll", {
          y: "70%",
          ease: "none",
        });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".container-anim-scroll",
            start: "-10% 90%",
            end: "90% 90%",
            scrub: 1,
            // markers: true,
          },
        })
        .to(".image-grid", {
          scale: 1,
          ease: "none",
        });
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <div ref={containerRef}>
      <div className="relative h-screen overflow-hidden bg-baby-pink w-full place-content-center font-bold text-ruby-red container-anim-scroll">
        <div className="absolute top-0 w-full h-[40vh] z-10 bg-gradient-to-b from-ruby-red"></div>
        <div className="grid grid-cols-3 gap-20d px-20d content-anim-scroll">
          <div className="w-full relative anim-scroll-1">
            <div className="w-full flex flex-col gap-20d translate-y-[-40%]">
              <div className="relative w-full h-[70vh] rounded-32d overflow-hidden">
                <GradientImage
                  className="scale-125 image-grid"
                  src="/product-grid/1.png"
                  fitVariant="cover"
                />
              </div>
              <div className="relative w-full h-[70vh] rounded-32d overflow-hidden">
                <GradientImage
                  className="scale-125 image-grid"
                  src="/product-grid/4.png"
                  fitVariant="cover"
                />
              </div>
            </div>
          </div>
          <div className="w-full relative anim-scroll-2">
            <div className="w-full flex flex-col gap-20d translate-y-[-30%]">
              <div className="relative w-full h-[70vh] rounded-32d overflow-hidden">
                <GradientImage
                  className="scale-125 image-grid"
                  src="/product-grid/2.png"
                  fitVariant="cover"
                />
              </div>
              <div className="relative w-full h-[70vh] rounded-32d overflow-hidden">
                <GradientImage
                  className="scale-125 image-grid"
                  src="/product-grid/5.png"
                  fitVariant="cover"
                />
              </div>
              <div className="relative w-full h-[70vh] rounded-32d overflow-hidden">
                <GradientImage
                  className="scale-125 image-grid"
                  src="/product-grid/7.png"
                  fitVariant="cover"
                />
              </div>
            </div>
          </div>
          <div className="w-full relative anim-scroll-3">
            <div className="w-full flex flex-col gap-20d translate-y-[-40%]">
              <div className="relative w-full h-[70vh] rounded-32d overflow-hidden">
                <GradientImage
                  className="scale-125 image-grid"
                  src="/product-grid/3.png"
                  fitVariant="cover"
                />
              </div>
              <div className="relative w-full h-[70vh] rounded-32d overflow-hidden">
                <GradientImage
                  className="scale-125 image-grid"
                  src="/product-grid/6.png"
                  fitVariant="cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-[40vh] z-10 bg-gradient-to-t from-ruby-red"></div>
      </div>
    </div>
  );
};

export default AboutProductGrid;
