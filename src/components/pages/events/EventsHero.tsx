"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import ArrowButton from "@/components/ui/ArrowButton";

const data = [
  {
    title: "Cocolily Country Club",
    image: "/events/carousel1.png",
    logo: "/events/logo.png",
    tags: ["COCOA BAR", "MERCH BAR", "SELF STUDIO"],
    icons: [
      {
        url: "/footer/ornament1_crop.png",
      },
      {
        url: "/footer/ornament2_crop.png",
      },
      {
        url: "/footer/ornament3_crop.png",
      },
      {
        url: "/footer/ornament4_crop.png",
      },
    ],
  },
  {
    title: "Backyard x Cocolily",
    image: "/events/carousel2.png",
    logo: "/events/logo.png",
    tags: ["COCOA BAR", "MERCH BAR", "SELF STUDIO"],
    icons: [
      {
        url: "/footer/ornament5_crop.png",
      },
      {
        url: "/footer/ornament6_crop.png",
      },
      {
        url: "/footer/ornament7_crop.png",
      },
      {
        url: "/footer/ornament1_crop.png",
      },
    ],
  },
  {
    title: "Cocolily Cabana at Flat 12",
    image: "/events/carousel3.png",
    logo: "/events/logo.png",
    tags: ["COCOA BAR", "MERCH BAR", "SELF STUDIO"],
    icons: [
      {
        url: "/footer/ornament2_crop.png",
      },
      {
        url: "/footer/ornament3_crop.png",
      },
      {
        url: "/footer/ornament4_crop.png",
      },
      {
        url: "/footer/ornament5_crop.png",
      },
    ],
  },
];

const EventsHero = () => {
  const sliderRef = useRef<any>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Define gradient colors for each slide (will repeat after 3)
  const gradientColors = useMemo(() => ["#C9D9E3", "#D0B0D8", "#F2ECCB"], []);

  useEffect(() => {
    // Set initial gradient color when component mounts
    const initialColor = gradientColors[0];
    document
      .querySelector(".hero-events-bg")
      ?.setAttribute(
        "style",
        `background-image: linear-gradient(to bottom, rgba(255,255,255,0) 0%, ${initialColor} 100%)`
      );
  }, [gradientColors]);

  const animateOutNext = (onComplete?: () => void) => {
    setIsAnimating(true);

    const outNextTl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    outNextTl
      .to(".circle-swiper-anim", {
        width: "254px",
        height: "254px",
        duration: 1.2,
        ease: "power1.inOut",
      })
      .to(
        ".reveal-swiper-anim",
        {
          yPercent: 100,
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".hero-events-bg",
        {
          backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)`,
          duration: 1.2,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".button-prev",
        {
          xPercent: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".button-next",
        {
          xPercent: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".ornament-swiper1",
        {
          scale: 0.5,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".ornament-swiper2",
        {
          scale: 0.5,
          bottom: "50%",
          left: "50%",
          transform: "translate(-50%, 50%)",
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".ornament-swiper3",
        {
          scale: 0.5,
          top: "50%",
          right: "50%",
          transform: "translate(50%, -50%)",
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".ornament-swiper4",
        {
          scale: 0.5,
          bottom: "50%",
          right: "50%",
          transform: "translate(50%, 50%)",
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      );
  };

  const animateOutPrev = (onComplete?: () => void) => {
    setIsAnimating(true);
    const outPrevTl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    outPrevTl
      .to(".circle-swiper-anim", {
        width: "254px",
        height: "254px",
        duration: 1.2,
        ease: "power1.inOut",
      })
      .to(
        ".reveal-swiper-anim",
        {
          yPercent: 100,
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".hero-events-bg",
        {
          backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)`,
          duration: 1.2,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".button-prev",
        {
          xPercent: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".button-next",
        {
          xPercent: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".ornament-swiper1",
        {
          scale: 0.5,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".ornament-swiper2",
        {
          scale: 0.5,
          bottom: "50%",
          left: "50%",
          transform: "translate(-50%, 50%)",
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".ornament-swiper3",
        {
          scale: 0.5,
          top: "50%",
          right: "50%",
          transform: "translate(50%, -50%)",
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".ornament-swiper4",
        {
          scale: 0.5,
          bottom: "50%",
          right: "50%",
          transform: "translate(50%, 50%)",
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      );
  };

  const animateInNext = () => {
    // Get the new active index directly from the swiper
    const newIndex = sliderRef.current?.swiper.realIndex || 0;
    // Use the newIndex for setting state (for future reference)
    setActiveIndex(newIndex);

    // Get the color using the newIndex directly instead of relying on state
    const currentColor = gradientColors[newIndex % gradientColors.length];

    const computedLeftRight = () => {
      const bw = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--bw")
      );
      return `${(120 / bw) * 100}vw`;
    };

    const computedBottom = () => {
      const bw = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--bw")
      );
      return `${(-60 / bw) * 100}vw`;
    };

    const inNextTl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      },
    });

    inNextTl
      .to(".circle-swiper-anim", {
        width: "926px",
        height: "480px",
        duration: 1.2,
        ease: "power1.inOut",
      })
      .fromTo(
        ".reveal-swiper-anim",
        {
          yPercent: 100,
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.8,
          ease: "power1.inOut",
        },
        {
          yPercent: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".hero-events-bg",
        {
          backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, ${currentColor} 100%)`,
          duration: 1.2,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".button-prev",
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".button-next",
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      )
      // Return each ornament to its original position
      .to(".ornament-swiper1", {
        scale: 1,
        top: computedBottom(),
        left: computedLeftRight(),
        transform: "none",
        duration: 0.8,
        ease: "elastic.out(1, 0.9)",
      })
      .to(
        ".ornament-swiper2",
        {
          scale: 1,
          bottom: "0",
          left: computedLeftRight(),
          transform: "none",
          duration: 0.8,
          ease: "elastic.out(1, 0.9)",
        },
        "<"
      )
      .to(
        ".ornament-swiper3",
        {
          scale: 1,
          top: computedBottom(),
          right: computedLeftRight(),
          transform: "none",
          duration: 0.8,
          ease: "elastic.out(1, 0.9)",
        },
        "<"
      )
      .to(
        ".ornament-swiper4",
        {
          scale: 1,
          bottom: "0",
          right: computedLeftRight(),
          transform: "none",
          duration: 0.8,
          ease: "elastic.out(1, 0.9)",
        },
        "<"
      );
  };

  const animateInPrev = () => {
    // Get the new active index directly from the swiper
    const newIndex = sliderRef.current?.swiper.realIndex || 0;

    // Use the newIndex for setting state (for future reference)
    setActiveIndex(newIndex);

    // Get the color using the newIndex directly instead of relying on state
    const currentColor = gradientColors[newIndex % gradientColors.length];

    // Before animation, calculate the value
    const computedLeftRight = () => {
      const bw = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--bw")
      );
      return `${(120 / bw) * 100}vw`;
    };

    const computedBottom = () => {
      const bw = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--bw")
      );
      return `${(-60 / bw) * 100}vw`;
    };

    const inPrevTl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      },
    });

    inPrevTl
      .to(".circle-swiper-anim", {
        width: "926px",
        height: "480px",
        duration: 1.2,
        ease: "power1.inOut",
      })
      .fromTo(
        ".reveal-swiper-anim",
        {
          yPercent: 100,
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.8,
          ease: "power1.inOut",
        },
        {
          yPercent: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".hero-events-bg",
        {
          backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, ${currentColor} 100%)`,
          duration: 1.2,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".button-prev",
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".button-next",
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      )
      // Return each ornament to its original position
      .to(".ornament-swiper1", {
        scale: 1,
        top: computedBottom(),
        left: computedLeftRight(),
        transform: "none",
        duration: 0.8,
        ease: "elastic.out(1, 0.9)",
      })
      .to(
        ".ornament-swiper2",
        {
          scale: 1,
          bottom: "0",
          left: computedLeftRight(),
          transform: "none",
          duration: 0.8,
          ease: "elastic.out(1, 0.9)",
        },
        "<"
      )
      .to(
        ".ornament-swiper3",
        {
          scale: 1,
          top: computedBottom(),
          right: computedLeftRight(),
          transform: "none",
          duration: 0.8,
          ease: "elastic.out(1, 0.9)",
        },
        "<"
      )
      .to(
        ".ornament-swiper4",
        {
          scale: 1,
          bottom: "0",
          right: computedLeftRight(),
          transform: "none",
          duration: 0.8,
          ease: "elastic.out(1, 0.9)",
        },
        "<"
      );
  };

  const handleSlide = (direction: "next" | "prev") => () => {
    if (isAnimating) return;

    if (direction === "next") {
      animateOutNext(() => {
        if (sliderRef.current && sliderRef.current.swiper) {
          sliderRef.current.swiper.slideNext();
        }
      });
    } else {
      animateOutPrev(() => {
        if (sliderRef.current && sliderRef.current.swiper) {
          sliderRef.current.swiper.slidePrev();
        }
      });
    }
  };

  return (
    <div className="hero-events-bg min-h-screen text-ruby-red text-96d pt-115d bg-gradient-to-b from-white to-pale-sky-blue relative">
      <p className="absolute top-115d left-20d font-abc font-bold uppercase text-16d">
        Our Events
      </p>
      {/* carousel */}
      <div className="relative">
        <Swiper
          ref={sliderRef}
          slidesPerView={1}
          speed={800}
          spaceBetween={140}
          loop={true}
          centeredSlides={true}
          onSlideNextTransitionEnd={animateInNext}
          onSlidePrevTransitionEnd={animateInPrev}
          draggable={false}
          allowTouchMove={false}
        >
          {data.map((item, index) => {
            return (
              <SwiperSlide
                key={`hero-${index}`}
                className="!flex flex-col gap-32d"
              >
                <div className="relative">
                  <h1 className="reveal-swiper-anim text-center text-96d font-bold font-span leading-none pb-16d">
                    {item.title}
                  </h1>
                  <div className="reveal-swiper-anim flex justify-center items-center gap-20d mt-12d">
                    {item.tags.map((tag, index) => {
                      return (
                        <div
                          key={`tag-${index}`}
                          className="border border-ruby-red rounded-full px-12d py-8d text-10d whitespace-nowrap"
                        >
                          {tag}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="h-480d flex relative">
                  <Image
                    className="ornament-swiper ornament-swiper1 absolute -top-60d left-120d"
                    width={144}
                    height={144}
                    src={item.icons[0].url}
                    alt="ornament"
                  />
                  <Image
                    className="ornament-swiper ornament-swiper2 absolute bottom-0 left-120d"
                    width={144}
                    height={144}
                    src={item.icons[1].url}
                    alt="ornament"
                  />
                  <Image
                    className="ornament-swiper ornament-swiper3 absolute -top-60d right-120d"
                    width={144}
                    height={144}
                    src={item.icons[2].url}
                    alt="ornament"
                  />
                  <Image
                    className="ornament-swiper ornament-swiper4 absolute bottom-0 right-120d"
                    width={144}
                    height={144}
                    src={item.icons[3].url}
                    alt="ornament"
                  />
                  <div className="circle-swiper-anim w-926d h-480d relative rounded-full overflow-hidden m-auto">
                    <Image
                      className="h-full w-full object-cover"
                      fill
                      src={item.image}
                      alt="Event Image"
                    />
                    <Image
                      className="object-contain"
                      fill
                      src={item.logo}
                      alt="Event logo"
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div
          className="absolute left-230d bottom-230d z-10 cursor-pointer button-prev"
          onClick={handleSlide("prev")}
        >
          <ArrowButton variant="secondary" icon="arrow-left" />
        </div>
        <div
          className="absolute right-230d bottom-230d z-10 cursor-pointer button-next"
          onClick={handleSlide("next")}
        >
          <ArrowButton variant="secondary" />
        </div>
      </div>
    </div>
  );
};

export default EventsHero;
