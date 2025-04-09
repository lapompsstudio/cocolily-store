"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import "swiper/css";

import CircleSlider from "./CircleSlider";

gsap.registerPlugin(SplitText);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [animationDelay, setAnimationDelay] = useState(0);

  useEffect(() => {
    // Check if running in browser environment
    if (typeof window !== "undefined") {
      const preloaderShown = localStorage.getItem("PreloaderShown");
      if (preloaderShown !== null && preloaderShown !== "") {
        // if preloader skipped
        setAnimationDelay(0.5);
      } else {
        // if preloader shown
        setAnimationDelay(7.5);
      }
    }
  }, []);

  useGSAP(
    () => {
      if (animationDelay > 0) {
        const chocolate = new SplitText(".chocolate", {
          type: "lines",
          linesClass: "clipped",
        });
        const sweetMoments = new SplitText(".sweet-moments", {
          type: "lines",
          linesClass: "clipped",
        });
        const descCircle0 = new SplitText(".desc-circle-0", {
          type: "lines",
        });

        gsap.set(".desc-circle-0", {
          opacity: 1,
        });

        gsap.set(".chocolate", {
          opacity: 1,
        });

        gsap.set(".sweet-moments", {
          opacity: 1,
        });

        gsap.set(".button-next", {
          opacity: 1,
        });

        gsap.set(".button-prev", {
          opacity: 1,
        });

        const tl = gsap.timeline({
          delay: animationDelay,
        });

        tl.to(".alphabet", {
          y: "0%",
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power1.inOut",
          stagger: 0.1,
          duration: 0.8,
        })
          .to(chocolate.lines, {
            y: "0%",
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power1.inOut",
            stagger: 0.3,
            duration: 0.8,
          })
          .to(
            sweetMoments.lines,
            {
              y: "0%",
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
          .to(
            ".title-desc",
            {
              transform: "translateY(0%)",
              clipPath: "inset(0% 0% 0% 0%)",
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
      }
    },
    { scope: containerRef, dependencies: [animationDelay] }
  );

  return (
    <div
      className={clsx("h-1269d overflow-hidden bg-white z-10", "relative")}
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
            <span className="chocolate opacity-0">More than Chocolate</span>
            <span className="sweet-moments opacity-0">
              it&apos;s a celebration of <br />
              sweet moments
            </span>
          </div>
          <div className="w-full flex justify-center items-end">
            <div
              className={clsx(
                "relative md:landscape:w-200d md:landscape:h-230d",
                "alphabet clipped"
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
                "alphabet clipped"
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
                "alphabet clipped"
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
                "alphabet clipped"
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
                "alphabet clipped"
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
                "alphabet clipped"
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
                "alphabet clipped"
              )}
            >
              <Image
                src={"/homepage/hero/L.png"}
                alt="L"
                fill
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:landscape:translate-y-113d">
              <div
                className={clsx(
                  "relative md:landscape:w-221d md:landscape:h-353d   md:landscape:ml-30d",
                  "alphabet clipped"
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
