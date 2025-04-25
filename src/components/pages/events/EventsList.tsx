"use client";

import { useState, useEffect, useRef } from "react";

import clsx from "clsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useQuery } from "@tanstack/react-query";
import { SplitText } from "gsap/all";

import Button from "@/components/ui/button";
import GradientImage from "@/components/ui/GradientImage";
import { EventResponse } from "@/types/api";

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

  const [activeButton, setActiveButton] = useState<
    "all events" | "upcoming events"
  >("all events");
  const [allEvents, setAllEvents] = useState<EventResponse | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<EventResponse | null>();
  const [allEventScrollTrigger, setAllEventScrollTrigger] = useState<
    ScrollTrigger[] | null
  >(null);
  const [upcomingEventScrollTrigger, setUpcomingEventScrollTrigger] = useState<
    ScrollTrigger[] | null
  >(null);

  const { data } = useQuery<EventResponse>({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  function getEventStatus(
    eventDate: string,
    endDate: string | null
  ): "ongoing event" | "upcoming event" | "latest past" {
    const today = new Date();
    const start = new Date(eventDate);
    const end = endDate ? new Date(endDate) : start;

    if (today >= start && today <= end) {
      return "ongoing event";
    } else if (today < start) {
      return "upcoming event";
    } else {
      return "latest past";
    }
  }

  function sortEvents(events: EventResponse["data"]) {
    return events
      .map((event) => ({
        ...event,
        status: getEventStatus(event.date, event.EndDate),
      }))
      .sort((a, b) => {
        const order = {
          "ongoing event": 0,
          "upcoming event": 1,
          "latest past": 2,
        };

        const statusOrder = order[a.status] - order[b.status];
        if (statusOrder !== 0) return statusOrder;

        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
  }
  useEffect(() => {
    if (!data) return;
    const sortedEvents = sortEvents(data.data);
    const upcomingEvents = sortedEvents.filter(
      (event) => event.status === "upcoming event"
    );

    setAllEvents({ ...data, data: sortedEvents });
    setUpcomingEvents({ ...data, data: upcomingEvents });

    console.log("sortedEvents", sortedEvents);
  }, [data]);

  useGSAP(() => {
    if (!allEvents) return;

    if (activeButton !== "all events") {
      allEventScrollTrigger?.forEach((trigger) => {
        trigger.kill();
      });

      setAllEventScrollTrigger([]);
    }

    allEvents.data.forEach((data, index) => {
      const imageTrigger = ScrollTrigger.create({
        trigger: `.image-index-${index}`,
        onEnter: () => {
          gsap.fromTo(
            `.image-index-${index}`,
            { scale: 1.2 },
            { duration: 1, ease: "power1.inOut", scale: 1 }
          );
        },
      });
      setAllEventScrollTrigger((prev) => [...(prev || []), imageTrigger]);

      const nameTrigger = ScrollTrigger.create({
        trigger: `.event-name-${index}`,
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
      setAllEventScrollTrigger((prev) => [...(prev || []), nameTrigger]);

      data.buttons.forEach((_, i) => {
        const tagTrigger = ScrollTrigger.create({
          trigger: `.tag-${index}-${i}`,
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
        setAllEventScrollTrigger((prev) => [...(prev || []), tagTrigger]);
      });
    });
  }, [containerRef, allEvents, activeButton]);

  useGSAP(() => {
    if (!upcomingEvents) return;

    if (activeButton !== "upcoming events") {
      upcomingEventScrollTrigger?.forEach((trigger) => {
        trigger.kill();
      });

      setUpcomingEventScrollTrigger([]);
    }

    upcomingEvents?.data.forEach((data, index) => {
      const imageTrigger = ScrollTrigger.create({
        trigger: `.upcoming-image-index-${index}`,
        onEnter: () => {
          gsap.fromTo(
            `.upcoming-image-index-${index}`,
            {
              scale: 1.2,
            },
            {
              duration: 1,
              ease: "power1.inOut",

              scale: 1,
            }
          );
        },
      });

      setUpcomingEventScrollTrigger((prev) => [...(prev || []), imageTrigger]);

      const nameTrigger = ScrollTrigger.create({
        trigger: `.upcoming-event-name-${index}`,
        onEnter: () => {
          gsap.fromTo(
            `.upcoming-event-name-${index}`,
            {
              y: 100,
              clipPath: "inset(0% 0% 100% 0%)",
            },
            {
              duration: 1,
              ease: "power1.inOut",
              y: 0,
              clipPath: "inset(0% 0% 0% 0%)",
            }
          );
        },
      });

      setUpcomingEventScrollTrigger((prev) => [...(prev || []), nameTrigger]);

      data.buttons.forEach((_, i) => {
        const tagTtrigger = ScrollTrigger.create({
          trigger: `.upcoming-tag-${index}-${i}`,
          onEnter: () => {
            gsap.fromTo(
              `.upcoming-tag-${index}-${i}`,
              {
                y: 100,
                clipPath: "inset(0% 0% 100% 0%)",
              },
              {
                duration: 1,
                ease: "power1.inOut",
                y: 0,
                clipPath: "inset(0% 0% 0% 0%)",
              }
            );
          },
        });

        setUpcomingEventScrollTrigger((prev) => [...(prev || []), tagTtrigger]);
      });
    });
  }, [containerRef, upcomingEvents, activeButton]);

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
        "text-ruby-red text-96d relative min-h-screen md:landscape:pb-60d"
      )}
      ref={containerRef}
    >
      <div className="w-full h-264d bg-gradient-to-t from-transparent to-pale-sky-blue absolute top-0 left-0"></div>

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

        <div className="grid grid-cols-2 mt-30d">
          <div className={clsx("w-full", "button-container")}>
            <Button
              showIcon
              variant="secondary"
              className={clsx(
                `uppercase h-full font-abc text-16d button-shop w-full`,
                {
                  active: activeButton === "all events",
                }
              )}
              onClick={() => setActiveButton("all events")}
            >
              all events
            </Button>
          </div>

          <div className={clsx("w-full", "button-container")}>
            <Button
              showIcon
              variant="secondary"
              className={clsx(
                `uppercase h-full font-abc text-16d button-shop w-full`,
                {
                  active: activeButton === "upcoming events",
                }
              )}
              onClick={() => setActiveButton("upcoming events")}
            >
              upcoming events
            </Button>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-x-20d gap-y-64d md:landscape:mt-100d ">
          {activeButton === "all events"
            ? allEvents?.data.map((data, index) => (
                <div
                  className={clsx(
                    "w-full flex flex-col gap-y-36d relative",
                    "cursor-follow-active"
                  )}
                  key={data.documentId}
                >
                  <div className="w-full h-344d rounded-32d relative overflow-hidden">
                    <div className="px-22d py-12d rounded-32d border-[1px] border-ruby-red bg-ivory text-ruby-red uppercase absolute top-20d left-20d z-10  text-12d font-sans font-semibold">
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

                    {data.logo && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="relative w-217d h-217d">
                          <GradientImage
                            src={
                              process.env.NEXT_PUBLIC_STRAPI_URL + data.logo.url
                            }
                            alt="collaboration image"
                            className="h-full object-contain"
                          />
                        </div>
                      </div>
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
                            "py-8d px-12d rounded-32d border-[1px] border-ruby-red font-sans text-10d",
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
              ))
            : upcomingEvents?.data.map((data, index) => (
                <div
                  className={clsx(
                    "w-full flex flex-col gap-y-36d relative",
                    "cursor-follow-active"
                  )}
                  key={data.documentId}
                >
                  <div className="w-full h-344d rounded-32d relative overflow-hidden">
                    <div className="px-22d py-12d rounded-32d border-[1px] border-ruby-red bg-ivory text-ruby-red uppercase absolute top-20d left-20d z-10  text-12d font-sans font-semibold">
                      {getEventStatus(data.date, data.EndDate)}
                    </div>

                    {data.file.mime?.startsWith("image/") ? (
                      <GradientImage
                        src={process.env.NEXT_PUBLIC_STRAPI_URL + data.file.url}
                        alt="collaboration image"
                        className={clsx(
                          "w-full h-full object-cover",
                          `upcoming-image-index-${index}`
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

                    {data.logo && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="relative w-217d h-217d">
                          <GradientImage
                            src={
                              process.env.NEXT_PUBLIC_STRAPI_URL + data.logo.url
                            }
                            alt="collaboration image"
                            className="h-full object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-y-24d">
                    <div
                      className={clsx(
                        "font-span md:landscape:text-48d leading-none font-bold",
                        `upcoming-event-name-${index}`
                      )}
                    >
                      {data.eventName}
                    </div>

                    <div className="flex gap-x-20d">
                      {data.buttons.map((button, i) => (
                        <div
                          className={clsx(
                            "py-8d px-12d rounded-32d border-[1px] border-ruby-red font-sans text-10d",
                            `upcoming-tag-${index}-${i}`
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
