"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import ArrowButton from "@/components/ui/ArrowButton";
import CircleLayout from "@/components/ui/CircleLayout";
import CircleSlider from "./CircleSlider";

gsap.registerPlugin(SplitText);

const item = [
  "/homepage/hero/swiper/Event 1.png",
  "/homepage/hero/swiper/Event 2.png",
  "/homepage/hero/swiper/Event 3.png",
  "/homepage/hero/swiper/Event 4.png",
];

function getVisibleItems(
  array: Array<string>,
  currentIndex: number,
  itemsPerView = 3
) {
  return array.slice(currentIndex, currentIndex + itemsPerView);
}

const Hero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<any>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [arraySlice, setArraySlice] = useState<any[][]>([]);
  const [rotation, setRotation] = useState(0); // Simpan rotasi saat ini

  function getVisibleItems(array: any[], startIndex: number, itemsPerView = 5) {
    return Array.from(
      { length: itemsPerView },
      (_, i) => array[(startIndex + i) % array.length]
    );
  }

  useEffect(() => {
    const tempArray: number[][] = [];

    for (let i = 0; i < item.length; i++) {
      tempArray.push(getVisibleItems(item, i));
    }

    setArraySlice(tempArray);
  }, []);

  useEffect(() => {
    console.log({ arraySlice });
  }, [arraySlice]);

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

  const nextSlide = () => {
    gsap.to(
      `.circle-container`,

      {
        rotate: -51,

        duration: 2,
        ease: "power1.inOut",

        onComplete: () => {
          gsap.set(".circle-container", {
            rotate: 0,
          });
          // setRotation(rotation - 12);
          setCurrentIndex(currentIndex + 1);
        },
      }
    );
  };

  const prevSlide = () => {
    gsap.to(
      `.circle-container`,

      {
        rotate: 51,

        duration: 2,
        ease: "power1.inOut",

        onComplete: () => {
          gsap.set(".circle-container", {
            rotate: 0,
          });
          // setRotation(rotation - 12);
          setCurrentIndex(currentIndex - 1);
        },
      }
    );
  };

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

      {/* <div
        className={clsx(
          "w-672d h-672d rounded-full  absolute top-0 left-1/2 -translate-x-1/2 bg-red-500 z-10 mt-350d"
        )}
      >
        <div className="w-full h-full relative"></div>
      </div> */}

      {/* <div
        className="w-2223d h-2223d relative bg-red-300 rounded-full mt-350d -translate-x-[17.5%] circle-container "
        key={currentIndex}
      >
        {currentIndex !== 0 && arraySlice[currentIndex - 1] && (
          <div
            className={clsx(
              "w-672d h-672d rounded-full absolute top-0 left-1/2 -translate-x-[140.8%] mt-290d -rotate-[51deg]"
            )}
          >
            <div className="w-672d h-672d relative rounded-full">
              <Image
                src={arraySlice[currentIndex - 1][0]}
                alt="image"
                fill
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {arraySlice[currentIndex] &&
          arraySlice[currentIndex].map((item, index) => (
            <div
              className={clsx(
                "w-672d h-672d rounded-full absolute top-0 left-1/2 -translate-x-1/2 overflow-hidden",
                {
                  "mt-290d translate-x-[39.5%] rotate-[51deg]": index === 1,
                  "mt-935d translate-x-[64.5%] rotate-90": index === 2,
                  hidden: index === 3 || index === 4,
                }
              )}
              key={index}
            >
              <div className="w-672d h-672d relative rounded-full overflow-hidden">
                <Image
                  src={item}
                  alt="image"
                  fill
                  className="w-full h-full object-contain object-center"
                />
              </div>
            </div>
          ))}

        {arraySlice[arraySlice.length - 1] && currentIndex === 0 && (
          <div
            className={clsx(
              "w-672d h-672d rounded-full absolute top-0 left-1/2 -translate-x-[140.8%] mt-290d"
            )}
          >
            <div className="w-672d h-672d relative rounded-full">
              <Image
                src={
                  arraySlice[arraySlice.length - 1][
                    arraySlice[arraySlice.length - 1].length - 1
                  ]
                }
                alt="image"
                fill
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div> */}

      {/* <div className="overflow-hidden relative">
        <div
          className="w-full md:landscape:mt-350d h-1100d relative "
          key={currentIndex}
        >
          {currentIndex !== 0 && (
            <div
              className={clsx(
                "absolute top-0 left-1/2 -translate-x-1/2",
                `container-image-0 mt-290d left-[8%]`
              )}
            >
              <div
                className={clsx(
                  "md:landscape:w-672d md:landscape:h-672d rounded-full relative flex-none flex justify-center "
                )}
              >
                <Image
                  src={arraySlice[currentIndex - 1][0]}
                  alt="image"
                  fill
                  className="w-full h-full object-cover"
                />

                <div className="w-537d h-537d relative">
                  <Image
                    src={"/homepage/hero/logo.png"}
                    alt="logo"
                    fill
                    className={"w-full h-full object-contain"}
                  />
                </div>
              </div>
            </div>
          )}

          {arraySlice[currentIndex] &&
            arraySlice[currentIndex].map((item, index) => (
              <div
                className={clsx(
                  "absolute top-0 left-1/2 -translate-x-1/2",
                  `container-image-${index}`,
                  {
                    "mt-290d left-[91.9%]": index === 1 && !isAnimating,
                    // "mt-290d left-[8%]":
                    //   index === 4 && !isAnimating && currentIndex !== 0,

                    hidden:
                      (index === 4 && !isAnimating) ||
                      (index === 3 && !isAnimating),

                    "mt-643d left-[131.6%]": index === 2 && !isAnimating,

                    // "mt-643d ": index === 3 && !isAnimating,

                    // "mt-290d ": index === 4 && !isAnimating,
                  }
                )}
                key={index}
              >
                <div
                  className={clsx(
                    "md:landscape:w-672d md:landscape:h-672d rounded-full relative flex-none flex justify-center "
                  )}
                >
                  <Image
                    src={item}
                    alt="image"
                    fill
                    className="w-full h-full object-cover"
                  />

                  <div className="w-537d h-537d relative">
                    <Image
                      src={"/homepage/hero/logo.png"}
                      alt="logo"
                      fill
                      className={"w-full h-full object-contain"}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div> */}

      <div className="w-217d absolute left-141d top-510d z-10 flex flex-col gap-y-20d">
        <div className="uppercase font-sans text-10d text-ruby-red">
          Cocolily sweet moments
        </div>

        <div className="uppercase font-abc font-bold text-16d text-ruby-red">
          Cocolily country club
        </div>
      </div>

      {/* <div className="w-full md:landscape:pt-350d overflow-hidden">
        <div className="w-full  ">
          <Swiper
            ref={swiperRef}
            centeredSlides={true}
            loop={true}
            slidesPerView={"auto"}
            navigation
            className="mySwiper !h-1100d"
          >
            {item.map((item, index) => (
              <SwiperSlide className="!flex-1 !translate-y-1/2">
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

      {/* gradient */}

      {/* <CircleLayout /> */}

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
