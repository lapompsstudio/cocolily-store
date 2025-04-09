"use client";

import ArrowButton from "@/components/ui/ArrowButton";
import Button from "@/components/ui/button";
import GradientImage from "@/components/ui/GradientImage";
import IconMaroon from "@/components/ui/IconMaroon";
import useColorStore from "@/store/colorStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// Import Swiper components
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper type with a different name to avoid conflict
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import { useQuery } from "@tanstack/react-query";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Import API types from our type definition file
import { Button as APIButton, APIResponse } from "@/types/events-homepages";

// Register GSAP plugins once
gsap.registerPlugin(ScrollTrigger, SplitText);

// Define our internal Event interface for component state
interface InternalEvent {
  id: number;
  name: string;
  location: string;
  date: string;
  description: string;
  images: string[]; // Using only images array
  buttons: APIButton[];
}

// Define type for our content refs
interface ContentRefs {
  image: HTMLDivElement | null;
  locationDate: HTMLDivElement | null;
  name: HTMLHeadingElement | null;
  buttons: HTMLDivElement | null;
  description: HTMLParagraphElement | null;
  stats: HTMLDivElement | null;
  discoverBtn: HTMLDivElement | null;
  indicator: HTMLDivElement | null;
  upComing: HTMLParagraphElement | null;
  upImage: HTMLDivElement | null;
  upComingLocation: HTMLDivElement | null;
  upName: HTMLParagraphElement | null;
  upRecent: HTMLDivElement | null;
}

export default function EventsHomepage(): JSX.Element {
  const { data, isLoading, isSuccess } = useQuery<APIResponse>({
    queryKey: ["events-homepages"],
    queryFn: async () => {
      const res = await fetch("/api/events-homepages");
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  // Define a default event to use when data is undefined
  const DEFAULT_EVENT: InternalEvent = {
    id: 0,
    name: "Loading...",
    location: "TBD",
    date: "TBD",
    description: "Event details are loading...",
    images: ["/images/placeholder.jpg"],
    buttons: [],
  };

  // Function to format date from API (YYYY-MM-DD) to displayed format
  const formatDate = (dateString: string): string => {
    if (!dateString) return "TBD";

    try {
      const date = new Date(dateString);
      // Format to something like "25 Mar 2025"
      return date
        .toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        .toLowerCase();
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString; // Return the original string if formatting fails
    }
  };

  // Convert API data to our InternalEvent interface format
  const LIMITED_EVENTS_DATA: InternalEvent[] = useMemo(() => {
    if (data?.data?.events && data.data.events.length > 0) {
      // Map API events to our InternalEvent interface
      return data.data.events.slice(0, 4).map((apiEvent) => ({
        id: apiEvent.id,
        name: apiEvent.eventName, // Use eventName from API
        location: apiEvent.location,
        date: formatDate(apiEvent.date), // Format date
        description: apiEvent.description,
        // Combine all image sources with proper URL path
        images: [
          ...(apiEvent.images
            ? apiEvent.images.map(
                (img) => process.env.NEXT_PUBLIC_STRAPI_URL + img.url
              )
            : []),
        ],
        buttons: apiEvent.buttons || [],
      }));
    }
    return [DEFAULT_EVENT];
  }, [data?.data?.events]);

  const ITEM_HEIGHT = 9; // 9vh height for each item

  // Use Zustand store for color
  const { currentColor, setColor } = useColorStore();

  // State management
  const [selectedEvent, setSelectedEvent] = useState<InternalEvent | null>(
    null
  );
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isAnimatingTrigger, setIsAnimatingTrigger] = useState<boolean>(false);
  const [isDataReady, setIsDataReady] = useState<boolean>(false);

  // Update selected event when data changes
  useEffect(() => {
    if (LIMITED_EVENTS_DATA.length > 0 && LIMITED_EVENTS_DATA[0].id !== 0) {
      setSelectedEvent(LIMITED_EVENTS_DATA[0]);
      setIsDataReady(true);
    } else if (LIMITED_EVENTS_DATA.length > 0 && !selectedEvent) {
      setSelectedEvent(LIMITED_EVENTS_DATA[0]);
    }
  }, [LIMITED_EVENTS_DATA, selectedEvent]);

  // Swiper refs - properly typed for Swiper
  const swiperRef = useRef<SwiperType | null>(null);

  // Create refs using useRef
  const contentRefs = useRef<ContentRefs>({
    image: null,
    locationDate: null,
    name: null,
    buttons: null,
    description: null,
    stats: null,
    discoverBtn: null,
    indicator: null,
    upComing: null,
    upImage: null,
    upComingLocation: null,
    upName: null,
    upRecent: null,
  });

  // Event item refs
  const eventItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Memoize the selected event ID for comparison
  const selectedEventId = useMemo(() => selectedEvent?.id, [selectedEvent]);

  // Initialize event item refs
  useEffect(() => {
    eventItemRefs.current = eventItemRefs.current.slice(
      0,
      LIMITED_EVENTS_DATA.length
    );
  }, [LIMITED_EVENTS_DATA.length]);

  // Custom navigation handlers for Swiper
  const handleImageNavigation = useCallback(
    (direction: "prev" | "next") => {
      if (isAnimating || !swiperRef.current) return;

      if (direction === "prev") {
        swiperRef.current.slidePrev();
      } else {
        swiperRef.current.slideNext();
      }
    },
    [isAnimating]
  );

  // Split text helper function
  const createSplitText = useCallback((element: HTMLElement | null) => {
    if (!element) return { lines: [] };
    return new SplitText(element, { type: "lines" });
  }, []);

  // Animation helper function
  const animateLines = useCallback(
    (lines: any[], direction: "in" | "out", staggerAmount = 0.05) => {
      if (lines.length === 0) return;

      const config =
        direction === "in"
          ? { y: "0%", clipPath: "inset(0% 0% 0% 0%)" }
          : { y: "100%", clipPath: "inset(0% 0% 100% 0%)" };

      gsap.to(lines, {
        ...config,
        duration: 0.8,
        stagger: staggerAmount,
        ease: "power1.inOut",
      });
    },
    []
  );

  // Function to animate content on event change
  const animateContent = useCallback(
    (newEventId: number, index: number) => {
      if (isAnimating || selectedEventId === newEventId || !isDataReady) return;
      setIsAnimating(true);

      const event = LIMITED_EVENTS_DATA.find(
        (event) => event.id === newEventId
      );
      if (!event) {
        setIsAnimating(false);
        return;
      }

      // Update color in Zustand store based on index
      setColor(index);

      // Calculate the new top position for the indicator
      const newTop = index * ITEM_HEIGHT;

      // Animate the indicator
      if (contentRefs.current.indicator) {
        gsap.to(contentRefs.current.indicator, {
          top: `${newTop}vh`,
          duration: 0.5,
          ease: "power2.inOut",
        });
      }

      // Timeline for the animation
      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      // Animate the image with scaling effect
      if (contentRefs.current.image) {
        tl.to(
          contentRefs.current.image,
          {
            scale: 1.25,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          0
        );
        tl.to(
          ".button-navigation",
          {
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            onComplete: () => {
              if (swiperRef.current) {
                // Reset Swiper to first slide
                swiperRef.current.activeIndex = 0;
                swiperRef.current.update();
              }
            },
          },
          0
        );
      }

      // Animate each section separately with staggered timing
      const contentElements = [
        contentRefs.current.locationDate,
        contentRefs.current.buttons,
        contentRefs.current.discoverBtn,
      ].filter(Boolean);

      // Split text for specified elements
      const nameSplit = createSplitText(contentRefs.current.name);
      const descriptionSplit = createSplitText(contentRefs.current.description);

      const nameLines = nameSplit.lines;
      const descriptionLines = descriptionSplit.lines;

      // Animate name and description lines
      if (nameLines.length > 0) {
        tl.to(
          nameLines,
          {
            y: "100%",
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.8,
            stagger: 0.1,
            ease: "power1.inOut",
          },
          0
        );
      }

      if (descriptionLines.length > 0) {
        tl.to(
          descriptionLines,
          {
            y: "100%",
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.8,
            stagger: 0.05,
            ease: "power1.inOut",
          },
          0
        );
      }

      // Fade out and move down each element
      if (contentElements.length > 0) {
        tl.to(
          contentElements,
          {
            y: "100%",
            clipPath: "inset(0% 0% 100% 0%)",
            opacity: 0,
            duration: 0.7,
            stagger: 0.05,
            ease: "power2.out",
            onComplete: () => {
              // Update the content while it's invisible
              setSelectedEvent(event);
              setIsAnimatingTrigger(true);
            },
          },
          0
        );
      }

      // Return image to normal
      if (contentRefs.current.image) {
        tl.to(contentRefs.current.image, {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: "power2.inOut",
        });
        tl.to(
          ".button-navigation",
          {
            opacity: 1,
            duration: 0.7,
            ease: "power2.inOut",
          },
          "<"
        );
      }

      // Bring each element back up with staggered timing
      if (contentElements.length > 0) {
        tl.to(
          contentElements,
          {
            y: "0%",
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 0.7,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }
    },
    [
      isAnimating,
      selectedEventId,
      setColor,
      createSplitText,
      LIMITED_EVENTS_DATA,
      isDataReady,
    ]
  );

  // Handle click on event item
  const handleEventClick = useCallback(
    (eventId: number, index: number) => {
      animateContent(eventId, index);
    },
    [animateContent]
  );

  // Animation when event is changed
  useGSAP(() => {
    if (!isAnimatingTrigger || !isDataReady) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 0px)", () => {
      // Split text for specified elements
      const nameSplit = createSplitText(contentRefs.current.name);
      const descriptionSplit = createSplitText(contentRefs.current.description);

      const nameLines = nameSplit.lines;
      const descriptionLines = descriptionSplit.lines;
      const allLines = [...nameLines, ...descriptionLines];

      if (allLines.length > 0) {
        // Set initial state
        gsap.set(allLines, {
          y: "100%",
          clipPath: "inset(0% 0% 100% 0%)",
        });

        // Animate lines in
        animateLines(nameLines, "in", 0.1);
        animateLines(descriptionLines, "in", 0.05);
      }
    });

    return () => mm.revert();
  }, [
    selectedEvent,
    isAnimatingTrigger,
    createSplitText,
    animateLines,
    isDataReady,
  ]);

  // Reset animatingTrigger after animation completes
  useEffect(() => {
    if (isAnimatingTrigger) {
      const timer = setTimeout(() => {
        setIsAnimatingTrigger(false);
      }, 1000); // Match this with your animation duration
      return () => clearTimeout(timer);
    }
  }, [isAnimatingTrigger]);

  // Horizontal text animation
  useGSAP(() => {
    if (!isDataReady) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 0px)", () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".text-anim-cocolily-sweet-celebration",
            start: "top-=1100 30%",
            end: "bottom+=600 30%",
            scrub: 1,
          },
        })
        .to(".text-anim-cocolily-sweet-celebration", {
          x: "-70%",
          ease: "power1.inOut",
        });
    });

    return () => mm.revert();
  }, [isDataReady]);

  // Background color animation
  useGSAP(() => {
    if (!isDataReady) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 0px)", () => {
      // Animate background color change
      gsap.to(".events-background", {
        backgroundColor: currentColor,
        duration: 1,
        ease: "power2.inOut",
      });

      // Animate gradient color change
      gsap.to(".gradient-background", {
        backgroundImage: `linear-gradient(to top, ${currentColor}, transparent)`,
        duration: 1,
        ease: "power2.inOut",
      });
    });

    return () => mm.revert();
  }, [currentColor, isDataReady]);

  // Initial animation on page load
  useGSAP(() => {
    if (!isDataReady) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 0px)", () => {
      // Split text for specified elements
      const nameSplit = createSplitText(contentRefs.current.name);
      const descriptionSplit = createSplitText(contentRefs.current.description);
      const upNameSplit = createSplitText(contentRefs.current.upName);

      const nameLines = nameSplit.lines;
      const descriptionLines = descriptionSplit.lines;
      const upNameLines = upNameSplit.lines;
      const allTextLines = [...nameLines, ...descriptionLines, ...upNameLines];

      // Set initial state for the split lines
      if (allTextLines.length > 0) {
        gsap.set(allTextLines, {
          y: "100%",
          clipPath: "inset(0% 0% 100% 0%)",
        });
      }

      // Standard elements that don't need split text
      const otherContentElements = [
        contentRefs.current.image,
        contentRefs.current.locationDate,
        contentRefs.current.buttons,
        contentRefs.current.discoverBtn,
        contentRefs.current.upComing,
        contentRefs.current.upImage,
        contentRefs.current.upComingLocation,
        contentRefs.current.upRecent,
        ".anim-indicator-events-homepage",
        ".button-navigation-image-events-home",
        ...eventItemRefs.current.filter(Boolean),
      ].filter(Boolean);

      // Set initial state for standard elements
      if (otherContentElements.length > 0) {
        gsap.set(otherContentElements, {
          y: "100%",
          clipPath: "inset(0% 0% 100% 0%)",
        });
      }

      // Create ScrollTrigger for animation
      ScrollTrigger.create({
        trigger: ".container-events-homepage",
        start: "60% 90%",
        markers: true,
        onEnter: () => {
          // Animate standard elements
          if (otherContentElements.length > 0) {
            gsap.to(otherContentElements, {
              y: "0%",
              duration: 0.8,
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "power1.inOut",
            });
          }

          // Animate text lines with stagger
          if (allTextLines.length > 0) {
            gsap.to(allTextLines, {
              y: "0%",
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.8,
              stagger: 0.05,
              ease: "power1.inOut",
            });
          }
        },
      });
    });

    return () => mm.revert();
  }, [createSplitText, isDataReady]);

  // Memoize event buttons
  const eventButtons = useMemo(
    () =>
      selectedEvent?.buttons.map((button) => (
        <Button
          key={button.id}
          variant="secondary"
          className="uppercase px-11d !text-10d py-10d"
        >
          {button.label}
        </Button>
      )) || [],
    [selectedEvent?.buttons]
  );

  // Memoize event list
  const eventList = useMemo(
    () =>
      LIMITED_EVENTS_DATA.map((event, index) => (
        <div
          key={event.id}
          ref={(el) => {
            eventItemRefs.current[index] = el;
          }}
          className={`border-t border-t-ruby-red flex items-center gap-20d h-[9vh] cursor-pointer ${
            isAnimating ? "pointer-events-none" : ""
          }`}
          onClick={() => handleEventClick(event.id, index)}
        >
          <div className="flex items-center gap-12d">
            <div className="w-22d h-22d relative"></div>
            <div className="w-46d h-[5vh] relative rounded-6d overflow-hidden">
              {event.images[0] && <GradientImage src={event.images[0]} />}
            </div>
          </div>
          <p className="uppercase font-abc text-11d font-bold">{event.name}</p>
        </div>
      )),
    [LIMITED_EVENTS_DATA, isAnimating, handleEventClick]
  );

  // Show loading state if data is still loading
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-seashell">
        <p className="text-ruby-red font-abc text-2xl">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="container-events-homepage w-full relative text-ruby-red">
      {/* Header section with horizontal scrolling text */}
      <div className="h-[50vh] w-full relative overflow-hidden bg-seashell">
        <h2 className="text-128d w-max font-abc h-[13vh] uppercase absolute top-1/2 -translate-y-1/2 translate-x-[50%] z-10 text-anim-cocolily-sweet-celebration">
          cocolily elegant festival
        </h2>
        <div className="bg-gradient-to-t from-[#C9D9E3] to-transparent gradient-background h-full w-full absolute z-0 top-0 left-0"></div>
      </div>

      {/* Main content grid */}
      <div className="w-full h-screen events-background grid grid-cols-12 gap-20d px-20d pb-20d bg-[#C9D9E3]">
        {/* Left section - Main event image with Swiper */}
        <div className="h-[87vh] col-span-6 mt-auto relative rounded-32d overflow-hidden">
          <div
            ref={(el) => {
              contentRefs.current.image = el;
            }}
            className="w-full h-full relative overflow-hidden"
          >
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              speed={800}
              autoplay={false}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              pagination={{
                clickable: true,
                el: ".swiper-pagination",
                bulletClass:
                  "w-3 h-3 rounded-full transition-all bg-white/50 hover:bg-white/70 inline-block mx-1.5",
                bulletActiveClass: "bg-white scale-125",
              }}
              className="w-full h-full"
            >
              {selectedEvent?.images.map((image, index) => (
                <SwiperSlide key={index}>
                  {image && (
                    <GradientImage
                      src={image}
                      className="h-full w-full object-cover"
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Navigation buttons - only show when there are multiple images */}
          <div className="button-navigation">
            {selectedEvent?.images.length && (
              <div className="flex items-center justify-between absolute w-full top-1/2 -translate-y-1/2 px-30d z-10 button-navigation-image-events-home">
                <button
                  type="button"
                  aria-label="Previous slide"
                  onClick={() => handleImageNavigation("prev")}
                  className="transition-opacity hover:opacity-80"
                  disabled={isAnimating}
                >
                  <ArrowButton variant="secondary" icon="arrow-left" />
                </button>
                <button
                  type="button"
                  aria-label="Next slide"
                  onClick={() => handleImageNavigation("next")}
                  className="transition-opacity hover:opacity-80"
                  disabled={isAnimating}
                >
                  <ArrowButton variant="secondary" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Middle section - Event details */}
        <div className="h-[87vh] col-span-4 mt-auto relative flex flex-col justify-between">
          {/* Top half - Event info */}
          <div className="h-[52%]">
            <div
              ref={(el) => {
                contentRefs.current.locationDate = el;
              }}
              className="grid grid-cols-4 gap-20d uppercase"
            >
              <p className="text-10d">{selectedEvent?.location}</p>
              <p className="text-10d">{selectedEvent?.date}</p>
            </div>
            <h3
              ref={(el) => {
                contentRefs.current.name = el;
              }}
              className="font-span w-[90%] mt-[7vh] font-semibold"
            >
              {selectedEvent?.name}
            </h3>
            <div
              ref={(el) => {
                contentRefs.current.buttons = el;
              }}
              className="flex items-center gap-12d mt-[4vh] flex-wrap"
            >
              {eventButtons}
            </div>
          </div>

          {/* Bottom half - Description and stats */}
          <div className="h-[48%] relative w-3/4">
            <p
              ref={(el) => {
                contentRefs.current.description = el;
              }}
              className="text-12d"
            >
              {selectedEvent?.description}
            </p>
            <div
              ref={(el) => {
                contentRefs.current.discoverBtn = el;
              }}
              className="absolute bottom-0"
            >
              <Button className="uppercase">discover more</Button>
            </div>
          </div>
        </div>

        {/* Right section - Upcoming events and event list */}
        <div className="h-[87vh] col-span-2 ml-auto mt-auto relative flex flex-col justify-between">
          {/* Upcoming events section */}
          <div className="h-[52%]">
            <p
              className="text-10d"
              ref={(el) => {
                contentRefs.current.upComing = el;
              }}
            >
              UPCOMING EVENTS
            </p>
            <div
              className="w-full relative h-[18vh] rounded-12d overflow-hidden mt-[7vh]"
              ref={(el) => {
                contentRefs.current.upImage = el;
              }}
            >
              <div className="w-full relative h-full hover:scale-125 transition-all duration-500">
                {data?.data?.upcomingEvents?.images[0]?.url && (
                  <GradientImage
                    src={
                      process.env.NEXT_PUBLIC_STRAPI_URL +
                      data?.data?.upcomingEvents?.images[0]?.url
                    }
                  />
                )}
              </div>
            </div>
            <div
              className="flex items-center justify-between mt-[2vh]"
              ref={(el) => {
                contentRefs.current.upComingLocation = el;
              }}
            >
              <p className="text-10d uppercase">
                {data?.data?.upcomingEvents?.location}
              </p>
              <p className="text-10d uppercase">
                {formatDate(data?.data?.upcomingEvents?.date || "")}
              </p>
            </div>
            <p
              className="font-abc uppercase leading-none mt-[2.5vh]"
              ref={(el) => {
                contentRefs.current.upName = el;
              }}
            >
              {data?.data?.upcomingEvents?.eventName}
            </p>
          </div>

          {/* Recent events list */}
          <div className="h-[48%] relative">
            <div
              className="flex items-center justify-between"
              ref={(el) => {
                contentRefs.current.upRecent = el;
              }}
            >
              <p className="text-10d uppercase">recent events</p>
              <p className="text-10d uppercase">VIEW ALL</p>
            </div>
            <div className="absolute bottom-0 left-0 w-full">
              {/* Moving indicator */}
              <div
                ref={(el) => {
                  contentRefs.current.indicator = el;
                }}
                className="h-[9vh] absolute transition-all duration-500"
              >
                <div className="w-22d h-22d absolute top-1/2 -translate-y-1/2">
                  <div className="anim-indicator-events-homepage">
                    <IconMaroon />
                  </div>
                </div>
              </div>

              {/* Event list */}
              {eventList}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
