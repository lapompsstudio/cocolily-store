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

// Register GSAP plugins once
gsap.registerPlugin(SplitText, ScrollTrigger);

// Membatasi eventsData menjadi hanya 4 data
const limitedEventsData = eventsData.slice(0, 4);

export default function EventsHomepage(): JSX.Element {
  // Menggunakan Zustand store untuk warna
  const { currentColor, setColor } = useColorStore();

  // State to track the currently selected event
  const [selectedEvent, setSelectedEvent] = useState<Event>(
    limitedEventsData[0]
  );
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isAnimatingTrigger, setIsAnimatingTrigger] = useState<boolean>(false);

  // Create a unified contentRefs object with useRef
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

  // Event item refs using a single useRef
  const eventItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Memoize the selected event ID for comparison
  const selectedEventId = useMemo(() => selectedEvent.id, [selectedEvent]);

  // Set up event item refs once
  useEffect(() => {
    eventItemRefs.current = eventItemRefs.current.slice(
      0,
      limitedEventsData.length
    );
  }, []);

  // Function to animate content on event change - optimized with useCallback
  const animateContent = useCallback(
    (newEventId: number, index: number) => {
      if (isAnimating || selectedEventId === newEventId) return;

      setIsAnimating(true);

      const event = limitedEventsData.find((event) => event.id === newEventId);
      if (!event) {
        setIsAnimating(false);
        return;
      }

      // Update color in Zustand store berdasarkan index
      setColor(index);

      // Calculate the new top position for the indicator
      const itemHeight = 9; // 9vh height for each item
      const newTop = index * itemHeight;

      // Animate the indicator to the new position
      if (contentRefs.current.indicator) {
        gsap.to(contentRefs.current.indicator, {
          top: `${newTop}vh`,
          duration: 0.5,
          ease: "power2.inOut",
        });
      }

      // Timeline for the animation
      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
        },
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
      ].filter(Boolean); // Filter out null values

      // Split text for specified elements using SplitText plugin
      let nameLines: any[] = [];
      let descriptionLines: any[] = [];

      if (contentRefs.current.name) {
        const nameSplit = new SplitText(contentRefs.current.name, {
          type: "lines",
        });
        nameLines = nameSplit.lines;
      }

      if (contentRefs.current.description) {
        const descriptionSplit = new SplitText(
          contentRefs.current.description,
          {
            type: "lines",
          }
        );
        descriptionLines = descriptionSplit.lines;
      }

      // Animate name lines with stagger
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

      // Animate description lines with stagger
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
    [isAnimating, selectedEventId, setColor]
  );

  // Handle click on event item - memoized
  const handleEventClick = useCallback(
    (eventId: number, index: number) => {
      animateContent(eventId, index);
    },
    [animateContent]
  );

  // Animation when event is changed
  useGSAP(() => {
    if (isAnimatingTrigger) {
      // Split text for specified elements using SplitText plugin
      let nameLines: any[] = [];
      let descriptionLines: any[] = [];

      if (contentRefs.current.name) {
        const nameSplit = new SplitText(contentRefs.current.name, {
          type: "lines",
        });
        nameLines = nameSplit.lines;
      }

      if (contentRefs.current.description) {
        const descriptionSplit = new SplitText(
          contentRefs.current.description,
          {
            type: "lines",
          }
        );
        descriptionLines = descriptionSplit.lines;
      }

      const allLines = [...nameLines, ...descriptionLines];

      if (allLines.length > 0) {
        // Set initial state
        gsap.set(allLines, {
          y: "100%",
          clipPath: "inset(0% 0% 100% 0%)",
        });

        // Animate name lines with stagger
        if (nameLines.length > 0) {
          gsap.to(nameLines, {
            y: "0%",
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.8,
            stagger: 0.1,
            ease: "power1.inOut",
          });
        }

        // Animate description lines with stagger
        if (descriptionLines.length > 0) {
          gsap.to(descriptionLines, {
            y: "0%",
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.8,
            stagger: 0.05,
            ease: "power1.inOut",
          });
        }
      }
    }
  }, [selectedEvent, isAnimatingTrigger]);

  // Horizontal text animation
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".text-anim-cocolily-sweet-celebration",
        start: "top-=1100 30%",
        end: "bottom+=600 30%",
        scrub: 1,
      },
    });

    tl.to(".text-anim-cocolily-sweet-celebration", {
      x: "-70%",
      ease: "power1.inOut",
    });
  }, []);

  // Animasi warna background menggunakan currentColor dari Zustand
  useGSAP(() => {
    // Animasikan perubahan warna background pada container utama
    gsap.to(".events-background", {
      backgroundColor: currentColor,
      duration: 1,
      ease: "power2.inOut",
    });

    // Animasikan perubahan warna gradient
    gsap.to(".gradient-background", {
      backgroundImage: `linear-gradient(to top, ${currentColor}, transparent)`,
      duration: 1,
      ease: "power2.inOut",
    });
  }, [currentColor]);

  // Initial animation on page load
  useGSAP(() => {
    // Split text for specified elements using SplitText plugin
    let nameLines: any[] = [];
    let descriptionLines: any[] = [];
    let upNameLines: any[] = [];

    if (contentRefs.current.name) {
      const nameSplit = new SplitText(contentRefs.current.name, {
        type: "lines",
      });
      nameLines = nameSplit.lines;
    }

    if (contentRefs.current.description) {
      const descriptionSplit = new SplitText(contentRefs.current.description, {
        type: "lines",
      });
      descriptionLines = descriptionSplit.lines;
    }

    if (contentRefs.current.upName) {
      const upNameSplit = new SplitText(contentRefs.current.upName, {
        type: "lines",
      });
      upNameLines = upNameSplit.lines;
    }

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
      ...eventItemRefs.current.filter(Boolean), // Filter out null values
    ].filter(Boolean); // Filter out null values

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
  }, []);

  // Memoize the event buttons to prevent unnecessary re-renders
  const eventButtons = useMemo(() => {
    return selectedEvent.buttons.map((button) => (
      <Button
        key={button.id}
        variant="secondary"
        className="uppercase px-11d !text-10d py-10d"
      >
        {button.label}
      </Button>
    ));
  }, [selectedEvent.buttons]);

  // Memoize the event list to prevent unnecessary re-renders
  const eventList = useMemo(() => {
    return limitedEventsData.map((event, index) => (
      <div
        key={event.id}
        ref={(el: HTMLDivElement | null): void => {
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
    ));
  }, [isAnimating, handleEventClick]);

  return (
    <div className="container-events-homepage w-full relative text-ruby-red">
      <div className="h-[50vh] w-full relative overflow-hidden bg-seashell">
        <h2 className="text-128d w-max font-abc h-[13vh] uppercase absolute top-1/2 -translate-y-1/2 translate-x-[50%] z-10 text-anim-cocolily-sweet-celebration">
          cocolily elegant festival
        </h2>
        <div className="bg-gradient-to-t from-[#C9D9E3] to-transparent gradient-background h-full w-full absolute z-0 top-0 left-0"></div>
      </div>
      <div className="w-full h-screen events-background grid grid-cols-12 gap-20d px-20d pb-20d bg-[#C9D9E3]">
        {/* Left section - Dynamic content based on selected event */}
        <div className="h-[87vh] col-span-6 mt-auto relative rounded-32d overflow-hidden">
          <div
            ref={(el: HTMLDivElement | null): void => {
              contentRefs.current.image = el;
            }}
            className="w-full h-full relative"
          >
            <GradientImage src={selectedEvent.image} />
          </div>
        </div>
        <div className="h-[87vh] col-span-4 mt-auto relative flex flex-col justify-between">
          <div className="h-[52%]">
            <div
              ref={(el: HTMLDivElement | null): void => {
                contentRefs.current.locationDate = el;
              }}
              className="grid grid-cols-4 gap-20d uppercase"
            >
              <p className="text-10d">{selectedEvent.location}</p>
              <p className="text-10d">{selectedEvent.date}</p>
            </div>
            <h3
              ref={(el: HTMLHeadingElement | null): void => {
                contentRefs.current.name = el;
              }}
              className="font-span w-[90%] mt-[7vh] font-semibold"
            >
              {selectedEvent.name}
            </h3>
            <div
              ref={(el: HTMLDivElement | null): void => {
                contentRefs.current.buttons = el;
              }}
              className="flex items-center gap-12d mt-[4vh] flex-wrap"
            >
              {eventButtons}
            </div>
          </div>
          <div className="h-[48%] relative w-3/4">
            <p
              ref={(el: HTMLParagraphElement | null): void => {
                contentRefs.current.description = el;
              }}
              className="text-12d"
            >
              {selectedEvent.description}
            </p>
            <div
              ref={(el: HTMLDivElement | null): void => {
                contentRefs.current.stats = el;
              }}
              className="flex items-center gap-60d mt-[8vh]"
            >
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
                <p className="font-abc text-10d leading-none mt-0.5">
                  ATTENDANCE
                </p>
              </div>
            </div>
            <div
              ref={(el: HTMLDivElement | null): void => {
                contentRefs.current.discoverBtn = el;
              }}
              className="absolute bottom-0"
            >
              <Button className="uppercase">discover more</Button>
            </div>
          </div>
        </div>

        {/* Right section - Upcoming events and clickable list */}
        <div className="h-[87vh] col-span-2 ml-auto mt-auto relative flex flex-col justify-between">
          <div className="h-[52%]">
            <p
              className="text-10d"
              ref={(el: HTMLParagraphElement | null): void => {
                contentRefs.current.upComing = el;
              }}
            >
              UPCOMING EVENTS
            </p>
            <div
              className="w-full relative h-[18vh] rounded-12d overflow-hidden mt-[7vh]"
              ref={(el: HTMLDivElement | null): void => {
                contentRefs.current.upImage = el;
              }}
            >
              <div className="w-full relative h-full hover:scale-125 transition-all duration-500">
                <GradientImage src="/images/our-products/image1.png" />
              </div>
            </div>
            <div
              className="flex items-center justify-between mt-[2vh]"
              ref={(el: HTMLDivElement | null): void => {
                contentRefs.current.upComingLocation = el;
              }}
            >
              <p className="text-10d uppercase">Dubai</p>
              <p className="text-10d uppercase">25 mar 2025</p>
            </div>
            <p
              className="font-abc uppercase leading-none mt-[2.5vh]"
              ref={(el: HTMLParagraphElement | null): void => {
                contentRefs.current.upName = el;
              }}
            >
              Cocolily x premium partner
            </p>
          </div>
          <div className="h-[48%] relative">
            <div
              className="flex items-center justify-between"
              ref={(el: HTMLDivElement | null): void => {
                contentRefs.current.upRecent = el;
              }}
            >
              <p className="text-10d uppercase">recent events</p>
              <p className="text-10d uppercase">VIEW ALL</p>
            </div>
            <div className="absolute bottom-0 left-0 w-full">
              {/* Moving indicator that follows the selected item */}
              <div
                ref={(el: HTMLDivElement | null): void => {
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

              {/* Clickable event list items */}
              {eventList}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
