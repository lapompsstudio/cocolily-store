"use client";

import Image from "next/image";
import { useRef } from "react";

import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import "swiper/css";

import CircleSlider from "./CircleSlider";

gsap.registerPlugin(SplitText);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const chocolate = new SplitText(".chocolate", { type: "lines" });
      const sweetMoments = new SplitText(".sweet-moments", { type: "lines" });
      const descCircle0 = new SplitText(".desc-circle-0", { type: "lines" });

      gsap.set(".alphabet", {
        yPercent: 100,
        clipPath: "inset(0% 0% 100% 0%)",
      });

      gsap.set(chocolate.lines, {
        yPercent: 100,
        clipPath: "inset(0% 0% 100% 0%)",
      });

      gsap.set(sweetMoments.lines, {
        yPercent: 100,
        clipPath: "inset(0% 0% 100% 0%)",
      });

      const tl = gsap.timeline({
        delay: 7.5,
      });

      tl.to(".alphabet", {
        yPercent: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "power1.inOut",
        stagger: 0.1,
        duration: 0.8,
      })
        .to(chocolate.lines, {
          yPercent: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power1.inOut",
          stagger: 0.3,
          duration: 0.8,
        })
        .to(
          sweetMoments.lines,
          {
            yPercent: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power1.inOut",
            stagger: 0.3,
            duration: 0.8,
          },
          "<"
        )
        .from(
          ".circle-slider-container",
          {
            rotate: 90,
            translateY: "40%",
            duration: 2,
            ease: "power1.inOut",
          },
          "<"
        )
        .from(".button-prev", {
          xPercent: 50,
          opacity: 0,
          ease: "power1.inOut",
          duration: 0.5,
        })
        .from(
          ".button-next",
          {
            xPercent: -50,
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.5,
          },
          "<"
        )
        .from(
          ".title-desc",
          {
            yPercent: 100,
            clipPath: "inset(0 0 100% 0)",
          },
          "<"
        )
        .from(
          descCircle0.lines,
          {
            yPercent: 100,
            clipPath: "inset(0 0 100% 0)",
          },
          "<"
        );
    },
    { scope: containerRef }
  );

  return (
    <div
      className={clsx("h-1269d overflow-hidden", "relative")}
      ref={containerRef}
    >
      <div className="absolute md:landscape:top-82d left-1/2 -translate-x-1/2 w-full z-[100]">
        <div className="relative">
          <div
            className={clsx(
              "absolute top-33d left-20d flex md:landscape:gap-x-124d md:landscape:text-16d ",
              "font-abc font-bold uppercase leading-none text-ruby-red"
            )}
          >
            <span className="chocolate">More than Chocolate</span>
            <span className="sweet-moments">
              it’s a celebration of <br />
              sweet moments
            </span>
          </div>
          <div className="w-full flex justify-center items-end">
            <div
              className={clsx(
                "relative md:landscape:w-200d md:landscape:h-230d",
                "alphabet"
              )}
            >
              <Image
                src={"/homepage/hero/C.png"}
                alt="C"
                fill
                className="w-full h-full object-contain"
              />
            </div>
            <div
              className={clsx(
                "relative md:landscape:w-224d md:landscape:h-231d",
                "alphabet"
              )}
            >
              <Image
                src={"/homepage/hero/O.png"}
                alt="O"
                fill
                className="w-full h-full object-contain"
              />
            </div>
            <div
              className={clsx(
                "relative md:landscape:w-200d md:landscape:h-230d md:landscape:ml-18d",
                "alphabet"
              )}
            >
              <Image
                src={"/homepage/hero/C.png"}
                alt="C"
                fill
                className="w-full h-full object-contain"
              />
            </div>
            <div
              className={clsx(
                "relative md:landscape:w-224d md:landscape:h-231d",
                "alphabet"
              )}
            >
              <Image
                src={"/homepage/hero/O.png"}
                alt="O"
                fill
                className="w-full h-full object-contain"
              />
            </div>
            <div
              className={clsx(
                "relative md:landscape:w-29d md:landscape:h-334d md:landscape:ml-60d",
                "alphabet"
              )}
            >
              <Image
                src={"/homepage/hero/L.png"}
                alt="L"
                fill
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={clsx(
                "relative md:landscape:w-29d md:landscape:h-315d md:landscape:ml-67d",
                "alphabet"
              )}
            >
              <Image
                src={"/homepage/hero/I.png"}
                alt="I"
                fill
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={clsx(
                "relative md:landscape:w-29d md:landscape:h-334d md:landscape:ml-67d",
                "alphabet"
              )}
            >
              <Image
                src={"/homepage/hero/L.png"}
                alt="L"
                fill
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div
                className={clsx(
                  "relative md:landscape:w-221d md:landscape:h-353d  md:landscape:translate-y-113d md:landscape:ml-30d",
                  "alphabet"
                )}
              >
                <Image
                  src={"/homepage/hero/Y.png"}
                  alt="Y"
                  fill
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-278d">
        <CircleSlider />
      </div>

      {/* gradient */}

      <div className="w-full  absolute h-264d bottom-0">
        <div className="w-full h-full relative">
          <Image
            src={"/homepage/hero/gradient.png"}
            alt="gradient"
            fill
            className={"w-full h-full object-cover"}
          />
        </div>
      </div>

      {/* gradient */}
    </div>
  );
};

export default Hero;
