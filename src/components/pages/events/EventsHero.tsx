"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";

import "swiper/css";

import ArrowButton from "@/components/ui/ArrowButton";
import { APIResponse } from "@/types/events-eventspage";
import clsx from "clsx";
import useColorStore from "@/store/colorStore";

const EventsHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<any>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement }>({});
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const slideRefs = useRef<{ [key: number]: HTMLDivElement }>({});
  const { setCustomColor } = useColorStore();

  const { data: apiResponse } = useQuery<APIResponse>({
    queryKey: ["events-eventpages"],
    queryFn: async () => {
      const res = await fetch("/api/events-eventpages");
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  // Transform API data to the expected format
  const transformedData = useMemo(() => {
    if (!apiResponse?.data?.events) return [];

    return apiResponse.data.events.map((event, index) => {
      // Determine if file is a video based on mime type or extension
      const isVideo =
        event.file?.mime?.includes("video") ||
        event.file?.ext?.toLowerCase().includes(".mp4") ||
        event.file?.url?.toLowerCase().endsWith(".mp4");

      return {
        title: event.eventName,
        image: event.file?.url
          ? process.env.NEXT_PUBLIC_STRAPI_URL + "/" + event.file.url
          : "",
        isVideo,
        logo: event.logo?.url
          ? process.env.NEXT_PUBLIC_STRAPI_URL + "/" + event.logo.url
          : "",
        tags: event.buttons?.map((button) => button.label) || [],
      };
    });
  }, [apiResponse]);

  // Define gradient colors for each slide (will repeat after 3)
  const gradientColors = useMemo(() => ["#C9D9E3", "#D0B0D8", "#F2ECCB"], []);

  // Function to save slide reference
  const setSlideRef = useCallback(
    (index: number, el: HTMLDivElement | null) => {
      if (el) {
        slideRefs.current[index] = el;
      }
    },
    []
  );

  useEffect(() => {
    // Set initial gradient color when component mounts
    const initialColor = gradientColors[0];
    document
      .querySelector(".hero-events-bg")
      ?.setAttribute(
        "style",
        `background-image: linear-gradient(to bottom, rgba(255,255,255,0) 0%, ${initialColor} 100%)`
      );

    // Initialize first video to play if it's a video
    if (
      transformedData.length > 0 &&
      transformedData[0].isVideo &&
      videoRefs.current[0]
    ) {
      videoRefs.current[0]
        .play()
        .catch((err) => console.log("Autoplay prevented:", err));
    }

    // Set initial sizes for all slides
    Object.entries(slideRefs.current).forEach(([indexStr, slideEl]) => {
      const index = parseInt(indexStr);
      if (index === 0) {
        // Active slide (initial)
        gsap.set(slideEl, { width: "926px", height: "480px" });
      } else {
        // Inactive slides
        gsap.set(slideEl, { width: "254px", height: "254px" });
      }
    });
  }, [gradientColors, transformedData]);

  // Control video playback when active index changes
  useEffect(() => {
    // Pause all videos first
    Object.values(videoRefs.current).forEach((videoEl) => {
      if (videoEl && !videoEl.paused) {
        videoEl.pause();
      }
    });

    // Play only the active video if it exists
    const activeVideo = videoRefs.current[activeIndex];
    if (activeVideo && transformedData[activeIndex]?.isVideo) {
      activeVideo.play().catch((err) => {
        console.log("Autoplay prevented:", err);
      });
    }
  }, [activeIndex, transformedData]);

  const animateOutNext = (onComplete?: () => void) => {
    setIsAnimating(true);
    const currentIndex = sliderRef.current?.swiper.realIndex || 0;
    const nextIndex = (currentIndex + 1) % transformedData.length;

    const currentSlide = slideRefs.current[currentIndex];
    const buttonPrev = document.querySelector(".button-prev");
    const buttonNext = document.querySelector(".button-next");
    const revealElements = document.querySelectorAll(".reveal-swiper-anim");

    const outNextTl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    outNextTl
      .to(currentSlide, {
        width: "254px",
        height: "254px",
        duration: 1.2,
        ease: "power1.inOut",
      })
      .to(
        revealElements,
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
          onStart: () => {
            setCustomColor("#FFFFFF");
          },
        },
        "<"
      )
      .to(
        buttonPrev,
        {
          xPercent: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        buttonNext,
        {
          xPercent: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      );
  };

  const animateOutPrev = (onComplete?: () => void) => {
    setIsAnimating(true);
    const currentIndex = sliderRef.current?.swiper.realIndex || 0;
    const prevIndex =
      (currentIndex - 1 + transformedData.length) % transformedData.length;

    const currentSlide = slideRefs.current[currentIndex];
    const buttonPrev = document.querySelector(".button-prev");
    const buttonNext = document.querySelector(".button-next");
    const revealElements = document.querySelectorAll(".reveal-swiper-anim");

    const outPrevTl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    outPrevTl
      .to(currentSlide, {
        width: "254px",
        height: "254px",
        duration: 1.2,
        ease: "power1.inOut",
      })
      .to(
        revealElements,
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
          onStart: () => {
            setCustomColor("#FFFFFF");
          },
        },
        "<"
      )
      .to(
        buttonPrev,
        {
          xPercent: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        buttonNext,
        {
          xPercent: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      );
  };

  const animateInNext = () => {
    // Get the new active index directly from the swiper
    const newIndex = sliderRef.current?.swiper.realIndex || 0;
    setActiveIndex(newIndex);

    // Get the color using the newIndex directly instead of relying on state
    const currentColor = gradientColors[newIndex % gradientColors.length];

    // Get the new active slide element
    const newActiveSlide = slideRefs.current[newIndex];
    const buttonPrev = document.querySelector(".button-prev");
    const buttonNext = document.querySelector(".button-next");
    const revealElements = document.querySelectorAll(".reveal-swiper-anim");

    const inNextTl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      },
    });

    inNextTl
      .to(newActiveSlide, {
        width: "926px",
        height: "480px",
        duration: 1.2,
        ease: "power1.inOut",
      })
      .fromTo(
        revealElements,
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
          onStart: () => {
            setCustomColor(currentColor);
          },
        },
        "<"
      )
      .to(
        buttonPrev,
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        buttonNext,
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      );
  };

  const animateInPrev = () => {
    // Get the new active index directly from the swiper
    const newIndex = sliderRef.current?.swiper.realIndex || 0;
    setActiveIndex(newIndex);

    // Get the color using the newIndex directly instead of relying on state
    const currentColor = gradientColors[newIndex % gradientColors.length];

    // Get the new active slide element
    const newActiveSlide = slideRefs.current[newIndex];
    const buttonPrev = document.querySelector(".button-prev");
    const buttonNext = document.querySelector(".button-next");
    const revealElements = document.querySelectorAll(".reveal-swiper-anim");

    const inPrevTl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      },
    });

    inPrevTl
      .to(newActiveSlide, {
        width: "926px",
        height: "480px",
        duration: 1.2,
        ease: "power1.inOut",
      })
      .fromTo(
        revealElements,
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
          onStart: () => {
            setCustomColor(currentColor);
          },
        },
        "<"
      )
      .to(
        buttonPrev,
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        buttonNext,
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power1.inOut",
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

  // Function to save video reference
  const setVideoRef = useCallback(
    (index: number, el: HTMLVideoElement | null) => {
      if (el) {
        videoRefs.current[index] = el;
      }
    },
    []
  );

  // Show loading state or return empty div if data isn't loaded yet
  if (!transformedData.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-transparent border-ruby-red rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="hero-events-bg min-h-screen text-ruby-red text-96d pt-115d bg-gradient-to-b from-white to-pale-sky-blue relative"
    >
      <p className="absolute top-115d left-20d font-abc font-bold uppercase text-16d">
        Our Events
      </p>
      {/* carousel */}
      <div className="relative">
        <Swiper
          ref={sliderRef}
          slidesPerView={1}
          speed={800}
          spaceBetween={-700}
          loop={true}
          centeredSlides={true}
          onSlideNextTransitionEnd={animateInNext}
          onSlidePrevTransitionEnd={animateInPrev}
          draggable={false}
          allowTouchMove={false}
        >
          {[...transformedData, ...transformedData].map((item, index) => {
            return (
              <SwiperSlide
                key={`hero-${index}`}
                className="!flex flex-col gap-32d"
              >
                <div className="relative">
                  <h1 className="reveal-swiper-anim text-center text-96d font-bold font-span leading-none pb-16d">
                    {item.title}
                  </h1>
                  <div className="reveal-swiper-anim flex justify-center items-center gap-20d mt-12d min-h-33d">
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
                  <div
                    ref={(el) => setSlideRef(index, el)}
                    className={clsx(
                      "relative rounded-full overflow-hidden m-auto",
                      "cursor-follow-active"
                    )}
                    style={{
                      width: index === 0 ? "926px" : "254px",
                      height: index === 0 ? "480px" : "254px",
                    }}
                  >
                    {item.isVideo ? (
                      <video
                        ref={(el) => setVideoRef(index, el)}
                        className="h-full w-full object-cover"
                        src={item.image}
                        playsInline
                        loop
                        muted
                        controls={false}
                      />
                    ) : (
                      <Image
                        className="h-full w-full object-cover"
                        fill
                        src={item.image}
                        alt="Event Image"
                      />
                    )}
                    {item.logo && (
                      <Image
                        className="object-contain"
                        fill
                        src={item.logo}
                        alt="Event logo"
                      />
                    )}
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
