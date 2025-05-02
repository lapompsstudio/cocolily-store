"use client";

import { useState, useEffect, useRef } from "react";

import clsx from "clsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useQuery } from "@tanstack/react-query";
import { SplitText } from "gsap/all";

import GradientImage from "@/components/ui/GradientImage";
import { EventResponse } from "@/types/api";
import useColorStore from "@/store/colorStore";

gsap.registerPlugin(ScrollTrigger, SplitText);

const HoverVideo = ({
  src,
  className,
}: {
  src: string;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <video
      ref={videoRef}
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => videoRef.current?.pause()}
      className={className}
      src={src}
      loop
      muted
      playsInline
      preload="auto"
    />
  );
};

const EventsList = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { customCurrentColor } = useColorStore();

  useGSAP(() => {
    gsap.to(".dynamic-eventlist-bg", {
      backgroundImage: `linear-gradient(to bottom, ${customCurrentColor} 0%, rgba(255,255,255,0) 100%)`,
      duration: 1.2,
      ease: "power1.inOut",
    });
  }, [customCurrentColor]);

  const [allEvents, setAllEvents] = useState<EventResponse | null>(null);

  const { data } = useQuery<EventResponse>({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  function getEventStatus(eventDate: string, endDate: string | null): string {
    const today = new Date();
    const start = new Date(eventDate);
    const end = endDate ? new Date(endDate) : start;

    if (today >= start && today <= end) {
      return "ONGOING NOW";
    } else if (today < start) {
      const month = start.toLocaleString("default", { month: "long" }); // Contoh: "June"
      const year = start.getFullYear(); // Contoh: 2025
      return `Upcoming in ${month} ${year}`;
    } else {
      return "OUR LATEST EVENT";
    }
  }

  function sortEvents(events: EventResponse["data"]) {
    return events
      .map((event) => ({
        ...event,
        status: getEventStatus(event.date, event.EndDate),
      }))
      .sort((a, b) => {
        const getOrder = (status: string) => {
          if (status === "ONGOING NOW") return 0;
          if (status.startsWith("Upcoming in")) return 1;
          if (status === "OUR LATEST EVENT") return 2;
          return 3; // fallback
        };

        const statusOrder = getOrder(a.status) - getOrder(b.status);
        if (statusOrder !== 0) return statusOrder;

        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
  }
  useEffect(() => {
    if (!data) return;
    const sortedEvents = sortEvents(data.data);

    setAllEvents({ ...data, data: sortedEvents });
  }, [data]);

  useGSAP(() => {
    if (!allEvents) return;

    allEvents.data.forEach((data, index) => {
      ScrollTrigger.create({
        trigger: `.img-index-container-${index}`,
        start: "top-=100 bottom",
        onEnter: () => {
          gsap.fromTo(
            `.img-index-container-${index}`,
            { yPercent: 50 },
            { duration: 1, ease: "power1.inOut", yPercent: 0 }
          );
        },
      });

      ScrollTrigger.create({
        trigger: `.event-name-${index}`,
        start: "top-=100 bottom",
        onEnter: () => {
          gsap.fromTo(
            `.event-name-${index}`,
            { y: 100, clipPath: "inset(0% 0% 100% 0%)" },
            {
              duration: 1,
              ease: "power1.inOut",
              y: 0,
              clipPath: "inset(0% 0% 0% 0%)",
            }
          );
        },
      });

      data.buttons.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `.tag-${index}-${i}`,
          start: "top-=100 bottom",
          onEnter: () => {
            gsap.fromTo(
              `.tag-${index}-${i}`,
              { y: 100, clipPath: "inset(0% 0% 100% 0%)" },
              {
                duration: 1,
                ease: "power1.inOut",
                y: 0,
                clipPath: "inset(0% 0% 0% 0%)",
              }
            );
          },
        });
      });
    });
  }, [containerRef, allEvents]);

  useGSAP(() => {
    const titleText = new SplitText(".title-text", {
      type: "lines",
    });

    ScrollTrigger.create({
      trigger: ".title-text",
      onEnter: () => {
        gsap.fromTo(
          titleText.lines,
          {
            y: 100,
            clipPath: "inset(0% 0% 100% 0%)",
          },
          {
            duration: 1,
            ease: "power1.inOut",
            stagger: 0.05,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
          }
        );
      },
    });

    ScrollTrigger.create({
      trigger: ".button-container",
      onEnter: () => {
        gsap.fromTo(
          ".button-container",
          {
            y: 100,
            clipPath: "inset(0% 0% 100% 0%)",
          },
          {
            duration: 1,
            ease: "power1.inOut",
            stagger: 0.05,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
          }
        );
      },
    });
  });

  return (
    <section
      className={clsx(
        "text-ruby-red text-96d relative min-h-screen md:landscape:pb-60d bg-ivory-blush"
      )}
      ref={containerRef}
    >
      <div className="dynamic-eventlist-bg w-full h-264d bg-gradient-to-t from-transparent to-pale-sky-blue absolute top-0 left-0"></div>

      <div className="md:landscape:px-20d md:landscape:pt-114d z-10 relative">
        <div
          className={clsx(
            "font-abc font-bold md:landscape:text-16d uppercase leading-none",
            `title-text`
          )}
        >
          COCOLILY’S <br />
          COLLABORATION EVENT lIST
        </div>

        <div className="w-full grid grid-cols-2 gap-x-20d gap-y-64d md:landscape:mt-48d">
          {allEvents?.data.map((data, index) => (
            <div
              className={clsx(
                "w-full flex flex-col gap-y-36d relative",
                "cursor-follow-active"
              )}
              key={data.documentId}
            >
              <div
                className={clsx(
                  "w-full h-344d rounded-32d relative overflow-hidden",
                  `img-index-container-${index}`
                )}
              >
                <div className="px-22d py-12d rounded-32d  bg-ruby-red text-white uppercase absolute top-20d left-20d z-10  text-12d font-sans font-semibold">
                  {getEventStatus(data.date, data.EndDate)}
                </div>

                {data.file.mime?.startsWith("image/") ? (
                  <GradientImage
                    src={process.env.NEXT_PUBLIC_STRAPI_URL + data.file.url}
                    alt="collaboration image"
                    className={clsx(
                      "w-full h-full object-cover",
                      `image-index-${index}`
                    )}
                  />
                ) : (
                  <HoverVideo
                    src={process.env.NEXT_PUBLIC_STRAPI_URL + data.file.url}
                    className={clsx(
                      "w-full h-full object-cover scale-105",
                      `image-index-${index}`
                    )}
                  />
                )}
              </div>

              <div className="flex flex-col gap-y-24d">
                <div
                  className={clsx(
                    "font-span md:landscape:text-48d leading-none font-bold",
                    `event-name-${index}`
                  )}
                >
                  {data.eventName}
                </div>

                <div className="flex gap-x-20d">
                  {data.buttons.map((button, i) => (
                    <div
                      className={clsx(
                        "py-8d px-12d rounded-32d border border-ruby-red font-sans text-10d",
                        `tag-${index}-${i}`
                      )}
                      key={button.id}
                    >
                      {button.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsList;
