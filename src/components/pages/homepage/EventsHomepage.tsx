"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import GradientImage from "@/components/ui/GradientImage";
import Button from "@/components/ui/button";
import IconMaroon from "@/components/ui/IconMaroon";
import { eventsData } from "./eventsData";
import useColorStore from "@/store/colorStore";

// Register GSAP plugins once
gsap.registerPlugin(ScrollTrigger, SplitText);

// Define types for our data structure
interface EventButton {
  id: number;
  label: string;
}

interface EventStats {
  engagement: string;
  attendance: string;
}

interface Event {
  id: number;
  name: string;
  location: string;
  date: string;
  description: string;
  image: string;
  buttons: EventButton[];
  stats: EventStats;
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

// Limit eventsData to only 4 items
const LIMITED_EVENTS_DATA = eventsData.slice(0, 4);
const ITEM_HEIGHT = 9; // 9vh height for each item

export default function EventsHomepage(): JSX.Element {
  // Use Zustand store for color
  const { currentColor, setColor } = useColorStore();

  // State management
  const [selectedEvent, setSelectedEvent] = useState<Event>(
    LIMITED_EVENTS_DATA[0]
  );
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isAnimatingTrigger, setIsAnimatingTrigger] = useState<boolean>(false);

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
  const selectedEventId = useMemo(() => selectedEvent.id, [selectedEvent]);

  // Initialize event item refs
  useEffect(() => {
    eventItemRefs.current = eventItemRefs.current.slice(
      0,
      LIMITED_EVENTS_DATA.length
    );
  }, []);

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
      if (isAnimating || selectedEventId === newEventId) return;
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
      }

      // Animate each section separately with staggered timing
      const contentElements = [
        contentRefs.current.locationDate,
        contentRefs.current.buttons,
        contentRefs.current.stats,
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
    [isAnimating, selectedEventId, setColor, createSplitText]
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
    if (!isAnimatingTrigger) return;

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
  }, [selectedEvent, isAnimatingTrigger, createSplitText, animateLines]);

  // Horizontal text animation
  useGSAP(() => {
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
  }, []);

  // Background color animation
  useGSAP(() => {
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
  }, [currentColor]);

  // Initial animation on page load
  useGSAP(() => {
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
        contentRefs.current.stats,
        contentRefs.current.discoverBtn,
        contentRefs.current.upComing,
        contentRefs.current.upImage,
        contentRefs.current.upComingLocation,
        contentRefs.current.upRecent,
        ".anim-indicator-events-homepage",
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
  }, [createSplitText]);

  // Memoize event buttons
  const eventButtons = useMemo(
    () =>
      selectedEvent.buttons.map((button) => (
        <Button
          key={button.id}
          variant="secondary"
          className="uppercase px-11d !text-10d py-10d"
        >
          {button.label}
        </Button>
      )),
    [selectedEvent.buttons]
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
              <GradientImage src={event.image} />
            </div>
          </div>
          <p className="uppercase font-abc text-11d font-bold">{event.name}</p>
        </div>
      )),
    [isAnimating, handleEventClick]
  );

  const renderEventStats = useCallback(
    () => (
      <div className="flex items-center gap-60d mt-[8vh]">
        <div>
          <p className="font-abc text-28d leading-none">
            {selectedEvent.stats.engagement}
          </p>
          <p className="font-abc text-10d leading-none mt-0.5">
            VISITOR ENGAGEMENT
          </p>
        </div>
        <div>
          <p className="font-abc text-28d leading-none">
            {selectedEvent.stats.attendance}
          </p>
          <p className="font-abc text-10d leading-none mt-0.5">ATTENDANCE</p>
        </div>
      </div>
    ),
    [selectedEvent.stats]
  );

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
        {/* Left section - Main event image */}
        <div className="h-[87vh] col-span-6 mt-auto relative rounded-32d overflow-hidden">
          <div
            ref={(el) => {
              contentRefs.current.image = el;
            }}
            className="w-full h-full relative"
          >
            <GradientImage src={selectedEvent.image} />
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
              <p className="text-10d">{selectedEvent.location}</p>
              <p className="text-10d">{selectedEvent.date}</p>
            </div>
            <h3
              ref={(el) => {
                contentRefs.current.name = el;
              }}
              className="font-span w-[90%] mt-[7vh] font-semibold"
            >
              {selectedEvent.name}
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
              {selectedEvent.description}
            </p>
            <div
              ref={(el) => {
                contentRefs.current.stats = el;
              }}
            >
              {renderEventStats()}
            </div>
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
          {/* Upcoming events */}
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
                <GradientImage src="/images/our-products/image1.png" />
              </div>
            </div>
            <div
              className="flex items-center justify-between mt-[2vh]"
              ref={(el) => {
                contentRefs.current.upComingLocation = el;
              }}
            >
              <p className="text-10d uppercase">Dubai</p>
              <p className="text-10d uppercase">25 mar 2025</p>
            </div>
            <p
              className="font-abc uppercase leading-none mt-[2.5vh]"
              ref={(el) => {
                contentRefs.current.upName = el;
              }}
            >
              Cocolily x premium partner
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
