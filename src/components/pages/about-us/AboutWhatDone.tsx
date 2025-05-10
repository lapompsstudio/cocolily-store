"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper/types";
import "swiper/css";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useQuery } from "@tanstack/react-query";

import ArrowButton from "@/components/ui/ArrowButton";
import { BeyondChocolateResponse } from "@/types/api";
import useMediaQueries from "@/hooks/useMediaQueries";

gsap.registerPlugin(ScrollTrigger);

const AboutWhatDone = () => {
  const swiperRefs = useRef<SwiperCore[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const { isMobile, isTablet } = useMediaQueries();

  const { data } = useQuery<BeyondChocolateResponse>({
    queryKey: ["beyond-chocolate"],
    queryFn: async () => {
      const res = await fetch("/api/beyond-chocolate");
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  useGSAP(
    () => {
      if (!data) return;

      const translate = (32.4 / 1440) * 100; // Hasil: 2.25 (vw)

      gsap.to(".marker-category", {
        translateY:
          activeCategory === 0 ? 0 : `${translate * activeCategory}vw`,
        duration: 1,
        ease: "power1.inOut",
      });

      gsap.to(".active-category", {
        color: "#DB0032",
        duration: 1,
        ease: "power1.inOut",
      });

      gsap.to(".inactive-category", {
        color: "#D0B0D8",
        duration: 1,
        ease: "power1.inOut",
      });
    },
    { dependencies: [activeCategory, data] }
  );

  useEffect(() => {
    if (!data) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionRef.current.findIndex(
            (el) => el === entry.target
          );
          if (index !== -1) {
            if (entry.isIntersecting) {
              setActiveCategory(index); // Set active category when section is in view
            }
          }
        });
      },
      {
        threshold: 0.4, // 30% of section needs to be visible
      }
    );

    sectionRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      sectionRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [data]);

  const slideNext = (idx: number) => swiperRefs.current[idx]?.slideNext();
  const slidePrev = (idx: number) => swiperRefs.current[idx]?.slidePrev();

  useGSAP(() => {
    const seasonalPopupsText = new SplitText(".seasonal-pop-ups-text", {
      type: "lines",
    });

    const seasonalPopupsDescText = new SplitText(
      ".seasonal-pop-ups-desc-text",
      {
        type: "lines",
      }
    );

    ScrollTrigger.create({
      trigger: ".beyond-chocolate",
      onEnter: () => {
        gsap.fromTo(
          ".beyond-chocolate",
          {
            yPercent: 100,
            clipPath: "inset(0% 0% 100% 0%)",
          },
          {
            yPercent: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power1.inOut",
            duration: 1,
          }
        );
      },
    });

    ScrollTrigger.create({
      trigger: ".marker-svg",
      onEnter: () => {
        gsap.fromTo(
          ".marker-svg",
          {
            yPercent: 100,
            clipPath: "inset(0% 0% 100% 0%)",
          },
          {
            yPercent: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power1.inOut",
            duration: 1,
          }
        );
      },
    });

    ScrollTrigger.create({
      trigger: ".border-lines",
      onEnter: () => {
        gsap.fromTo(
          ".border-lines",
          {
            width: 0,
          },
          {
            width: "100%",
            ease: "power1.inOut",
            duration: 1,
          }
        );
      },
    });

    ScrollTrigger.create({
      trigger: ".seasonal-pop-ups-text",
      onEnter: () => {
        gsap.fromTo(
          seasonalPopupsText.lines,
          {
            yPercent: 100,
            clipPath: "inset(0% 0% 100% 0%)",
          },
          {
            yPercent: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power1.inOut",
            duration: 1,
            stagger: 0.1,
          }
        );
      },
    });

    ScrollTrigger.create({
      trigger: ".seasonal-pop-ups-desc-text",
      onEnter: () => {
        gsap.fromTo(
          seasonalPopupsDescText.lines,
          {
            yPercent: 100,
            clipPath: "inset(0% 0% 100% 0%)",
          },
          {
            yPercent: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power1.inOut",
            duration: 1,
            stagger: 0.1,
          }
        );
      },
    });
  }, [containerRef]);

  useGSAP(
    () => {
      if (data) {
        data.data.forEach((data: any, index) => {
          ScrollTrigger.create({
            trigger: `.section-name-${index}`,
            onEnter: () => {
              gsap.fromTo(
                `.section-name-${index}`,
                {
                  yPercent: 100,
                  clipPath: "inset(0% 0% 100% 0%)",
                },
                {
                  yPercent: 0,
                  clipPath: "inset(0% 0% 0% 0%)",
                  ease: "power1.inOut",
                  duration: 1,
                }
              );
            },
          });

          if (data.sectionTitle) {
            const titleSectionText = new SplitText(`.title-section-${index}`, {
              type: "lines",
            });

            ScrollTrigger.create({
              trigger: `.title-section-${index}`,
              onEnter: () => {
                gsap.fromTo(
                  titleSectionText.lines,
                  {
                    yPercent: 100,
                    clipPath: "inset(0% 0% 100% 0%)",
                  },
                  {
                    yPercent: 0,
                    clipPath: "inset(0% 0% 0% 0%)",
                    ease: "power1.inOut",
                    duration: 1,
                    stagger: 0.1,
                  }
                );
              },
            });
          }

          if (data.sectionDescription) {
            const descpritionText = new SplitText(`.descprition-${index}`, {
              type: "lines",
            });

            ScrollTrigger.create({
              trigger: `.descprition-${index}`,
              onEnter: () => {
                gsap.fromTo(
                  descpritionText.lines,
                  {
                    yPercent: 100,
                    clipPath: "inset(0% 0% 100% 0%)",
                  },
                  {
                    yPercent: 0,
                    clipPath: "inset(0% 0% 0% 0%)",
                    ease: "power1.inOut",
                    duration: 1,
                    stagger: 0.1,
                  }
                );
              },
            });
          }

          data.image.forEach((item: any, i: number) => {
            if (item.imageTitle) {
              const titleImageText = new SplitText(
                `.title-image-${index}-${i}`,
                {
                  type: "lines",
                }
              );

              ScrollTrigger.create({
                trigger: `.title-image-${index}-${i}`,
                onEnter: () => {
                  gsap.fromTo(
                    titleImageText.lines,
                    {
                      yPercent: 100,
                      opacity: 0,
                      clipPath: "inset(0% 0% 100% 0%)",
                    },
                    {
                      yPercent: 0,
                      opacity: 1,
                      clipPath: "inset(0% 0% 0% 0%)",
                      ease: "power1.inOut",
                      duration: 1,
                      stagger: 0.1,
                    }
                  );
                },
              });
            }

            ScrollTrigger.create({
              trigger: `.image-${index}-${i}`,
              onEnter: () => {
                gsap.fromTo(
                  `.image-${index}-${i}`,
                  {
                    scale: 1.1,
                    opacity: 0,
                  },
                  {
                    scale: 1,
                    opacity: 1,
                    ease: "power1.inOut",
                    duration: 1,
                  }
                );
              },
            });
          });

          ScrollTrigger.create({
            trigger: `.button-slide-prev-${index}`,
            onEnter: () => {
              gsap.fromTo(
                `.button-slide-prev-${index}`,
                {
                  xPercent: 30,
                },
                {
                  xPercent: 0,
                  ease: "power1.inOut",
                  duration: 0.5,
                }
              );
            },
          });

          ScrollTrigger.create({
            trigger: `.button-slide-next-${index}`,
            onEnter: () => {
              gsap.fromTo(
                `.button-slide-next-${index}`,
                {
                  xPercent: -30,
                },
                {
                  xPercent: 0,
                  ease: "power1.inOut",
                  duration: 0.5,
                }
              );
            },
          });
        });

        // ensure marker instance is updated after data is fetched
        ScrollTrigger.refresh();
      }
    },
    {
      scope: containerRef,
      dependencies: [data],
    }
  );

  return (
    <section
      className="w-full bg-purple-dust md:landscape:py-142d font-bold text-ruby-red px-20d relative"
      ref={containerRef}
    >
      <div
        className={clsx(
          "md:landscape:col-span-3 md:landscape:sticky md:landscape:top-142d",
          "max-xl:portrait:pt-142d"
        )}
      >
        <div
          className={clsx(
            "uppercase font-abc font-bold md:landscape:text-16d",
            "text-14d",
            "beyond-chocolate"
          )}
        >
          experience offerings
        </div>
        <div className="md:landscape:mt-60d md:landscape:flex gap-x-16d gap-y-16d hidden">
          <div className="py-1.65d marker-category">
            <svg
              className="w-12d h-12d marker-svg block"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.60908 8.39243C7.12265 8.44718 6.66923 8.66551 6.32309 9.01164C5.97696 9.35777 5.75864 9.8112 5.70388 10.2976C5.60219 10.3154 5.49913 10.3243 5.39588 10.324C2.84388 10.3548 0.771484 8.00083 0.771484 8.00083C0.771484 8.00083 2.84388 5.64683 5.39588 5.68203C5.49892 5.68263 5.60181 5.68998 5.70388 5.70403C5.75864 6.19047 5.97696 6.64389 6.32309 6.99002C6.66923 7.33616 7.12265 7.55448 7.60908 7.60923C7.64802 7.86885 7.64802 8.13282 7.60908 8.39243Z"
                fill="#C92539"
              />
              <path
                d="M10.3222 5.39979C10.3222 5.50099 10.3222 5.59779 10.3222 5.69899C9.83208 5.74983 9.37399 5.96633 9.02359 6.31273C8.67319 6.65914 8.45144 7.11471 8.39498 7.60419C8.13429 7.64817 7.86807 7.64817 7.60738 7.60419C7.5511 7.11834 7.33229 6.66577 6.98644 6.31993C6.6406 5.97408 6.18803 5.75527 5.70218 5.69899C5.6861 5.60009 5.67874 5.49998 5.68018 5.39979C5.64058 2.83899 7.99898 0.775391 7.99898 0.775391C7.99898 0.775391 10.3574 2.83899 10.3222 5.39979Z"
                fill="#C92539"
              />
              <path
                d="M15.2295 8.00093C15.2295 8.00093 13.1615 10.3593 10.6051 10.3285C10.5047 10.3287 10.4046 10.3198 10.3059 10.3021C10.2486 9.81592 10.0289 9.36326 9.68236 9.01747C9.33578 8.67169 8.88262 8.45304 8.39627 8.39693C8.35229 8.13624 8.35229 7.87003 8.39627 7.60933C8.88262 7.55323 9.33578 7.33458 9.68236 6.98879C10.0289 6.64301 10.2486 6.19035 10.3059 5.70413C10.405 5.69008 10.505 5.68273 10.6051 5.68213C13.1615 5.64253 15.2295 8.00093 15.2295 8.00093Z"
                fill="#C92539"
              />
              <path
                d="M10.3227 10.6012C10.3579 13.1576 7.99947 15.2256 7.99947 15.2256C7.99947 15.2256 5.63667 13.1576 5.67627 10.6012C5.67469 10.4995 5.68205 10.3979 5.69827 10.2976C6.18442 10.242 6.63741 10.0235 6.9834 9.67748C7.32939 9.3315 7.54796 8.8785 7.60347 8.39236C7.86417 8.34838 8.13038 8.34838 8.39107 8.39236C8.44678 8.87917 8.66599 9.33267 9.01286 9.67875C9.35973 10.0248 9.81374 10.243 10.3007 10.2976C10.3139 10.3988 10.3227 10.4956 10.3227 10.6012Z"
                fill="#C92539"
              />
            </svg>
          </div>

          <div className="flex flex-col gap-y-16d">
            {data &&
              data.data.map((item, index) => (
                <div
                  className={clsx(
                    "uppercase font-bold md:landscape:text-11d ",
                    `section-name-${index}`,

                    {
                      "active-category": activeCategory === index,
                      "inactive-category": activeCategory !== index,
                    }
                  )}
                  key={index}
                  ref={(el) => {
                    sectionRef.current[index] = el;
                  }}
                >
                  {item.sectionName}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="w-full md:landscape:grid md:landscape:grid-cols-12 md:landscape:-mt-194d relative">
        <div className="md:landscape:col-start-5 md:landscape:col-span-8 ">
          <div className="border-lines bg-ruby-red h-[1px] w-0 hidden md:landscape:block"></div>
          <div
            className={clsx(
              "md:landscape:mt-16d font-abc font-bold md:landscape:text-16d uppercase",
              "max-xl:portrait:mt-60d text-14d max-xl:portrait:pb-20d  max-xl:portrait:border-ruby-red  max-xl:portrait:border-b",
              "seasonal-pop-ups-text"
            )}
          >
            Seasonal Pop-ups
          </div>

          <div
            className={clsx(
              "mt-60d font-abc font-bold md:landscape:text-32d uppercase leading-none",
              "text-20d",
              "seasonal-pop-ups-desc-text"
            )}
          >
            We've taken an artisanal approach to every part of the experience —
            from our humble bonbon beginnings to everything we create today.
          </div>

          {data &&
            data.data.map((item, index) => (
              <div
                className={clsx("md:landscape:mt-90d", "")}
                key={index}
                ref={(el) => {
                  sectionRef.current[index] = el;
                }}
              >
                {item.sectionTitle && (
                  <div
                    className={clsx(
                      "md:grid md:landscape:grid-cols-8",
                      "flex flex-col max-xl:portrait:gap-y-60d"
                    )}
                  >
                    <div
                      className={clsx(
                        "md:landscape:col-span-3 font-abc font-bold text-16d text-ruby-red uppercase",
                        "max-xl:portrait:mt-60d text-14d max-xl:portrait:pb-20d  max-xl:portrait:border-ruby-red  max-xl:portrait:border-b",
                        `title-section-${index}`
                      )}
                    >
                      {item.sectionTitle}
                    </div>
                    <div
                      className={clsx(
                        "md:landscape:col-span-4 md:landscape:col-start-5 font-sans md:landscape:text-12d font-light",
                        "text-14d",
                        `descprition-${index}`
                      )}
                    >
                      {item.sectionDescription}
                    </div>
                  </div>
                )}

                <div className={clsx("md:landscape:mt-90d", "mt-60d")}>
                  <Swiper
                    slidesPerView={isMobile ? 1.2 : isTablet ? 1.6 : 3}
                    spaceBetween={20}
                    allowTouchMove={true}
                    onSwiper={(swiper) => (swiperRefs.current[index] = swiper)}
                    className="max-xl:portrait:!overflow-visible"
                  >
                    {item.image.map((data, i) => (
                      <SwiperSlide key={i}>
                        <div
                          className={clsx(
                            "md:landscape:w-296d flex flex-col gap-y-24d"
                          )}
                        >
                          {data.imageTitle && (
                            <div
                              className={clsx(
                                "font-abc font-bold text-11d uppercase",
                                `title-image-${index}-${i}`
                              )}
                            >
                              {data.imageTitle}
                            </div>
                          )}

                          <div
                            className={clsx(
                              "w-full h-369d relative md:landscape:rounded-32d overflow-hidden",
                              "rounded-12d"
                            )}
                          >
                            <Image
                              src={
                                process.env.NEXT_PUBLIC_STRAPI_URL +
                                data.image.url
                              }
                              alt={data.imageTitle}
                              className={clsx(
                                "w-full h-full object-cover md:landscape:rounded-32d scale-110",
                                "rounded-12d",
                                `image-${index}-${i}`
                              )}
                              fill
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <div className="w-full mt-20d justify-between z-50 relative hidden md:landscape:flex">
                    <div
                      onClick={() => slidePrev(index)}
                      className={`button-slide-prev-${index}`}
                    >
                      <ArrowButton icon="arrow-left" variant="secondary" />
                    </div>
                    <div
                      onClick={() => slideNext(index)}
                      className={`button-slide-next-${index}`}
                    >
                      <ArrowButton variant="secondary" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* backround gradient */}

      <div className="w-full h-264d bg-gradient-to-b from-transparent to-pale-sky-blue absolute bottom-0 left-0"></div>

      {/* backround gradient */}
    </section>
  );
};

export default AboutWhatDone;
