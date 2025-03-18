"use client";

import Image from "next/image";
import { useRef } from "react";

import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

gsap.registerPlugin(SplitText);

const item = [
  "/homepage/hero/swiper/Event 1.png",
  "/homepage/hero/swiper/Event 2.png",
  "/homepage/hero/swiper/Event 3.png",
  "/homepage/hero/swiper/Event 3.png",
];

const Hero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const chocolate = new SplitText(".chocolate", { type: "lines" });
      const sweetMoments = new SplitText(".sweet-moments", { type: "lines" });

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

      const tl = gsap.timeline({});

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
        );
    },
    { scope: containerRef }
  );

  return (
    <div className={clsx("min-h-screen ", "relative")} ref={containerRef}>
      <div className="absolute md:landscape:top-82d left-1/2 -translate-x-1/2 w-full ">
        <div className="relative">
          <div
            className={clsx(
              "absolute top-33d left-20d flex md:landscape:gap-x-124d md:landscape:text-16d",
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

      <div className="w-full md:landscape:pt-350d  flex flex-nowrap">
        {item.map((item) => (
          <div
            className="md:landscape:w-672d md:landscape:h-672d rounded-full relative flex-none
          "
          >
            <Image
              src={item}
              alt=""
              fill
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* <div className="w-full md:landscape:pt-350d overflow-hidden">
        <div className="w-full  -translate-x-290d">
          <Swiper slidesPerView={"auto"} loop className="!overflow-visible">
            {item.map((item) => (
              <SwiperSlide className="!flex-1">
                <div className="md:landscape:w-672d md:landscape:h-672d rounded-full flex-1">
                  <Image
                    src={item}
                    alt=""
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div> */}
    </div>
  );
};

export default Hero;
