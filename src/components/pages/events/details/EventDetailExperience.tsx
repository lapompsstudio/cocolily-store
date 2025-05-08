"use client";

import { useRef } from "react";

import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import GradientImage from "@/components/ui/GradientImage";
import { EventDetail } from "@/types/api";

gsap.registerPlugin(ScrollTrigger);

const EventDetailExperience = ({ data }: { data: EventDetail }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!data) return;

      ScrollTrigger.create({
        trigger: ".experience-title",
        onEnter: () => {
          gsap.fromTo(
            ".experience-title",
            {
              y: 100,
              clipPath: "inset(0% 0% 100% 0%)",
            },
            {
              y: 0,
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "power1.inOut",
              duration: 1,
            }
          );
        },
      });

      data.data.Experience.forEach((data, index) => {
        setTimeout(() => {
          const title = new SplitText(`.experience-title-${index}`, {
            type: "lines",
          });

          const desc = new SplitText(`.experience-desc-${index}`, {
            type: "lines",
          });
          ScrollTrigger.create({
            trigger: `.experience-title-${index}`,

            onEnter: () => {
              gsap.fromTo(
                title.lines,
                {
                  yPercent: 100,
                  clipPath: "inset(0% 0% 100% 0%)",
                },
                {
                  stagger: 0.01,
                  yPercent: 0,
                  clipPath: "inset(0% 0% 0% 0%)",
                  ease: "power1.inOut",
                  duration: 1,
                }
              );
            },
          });

          ScrollTrigger.create({
            trigger: `.experience-desc-${index}`,
            onEnter: () => {
              gsap.fromTo(
                desc.lines,
                {
                  yPercent: 100,
                  clipPath: "inset(0% 0% 100% 0%)",
                },
                {
                  stagger: 0.01,
                  yPercent: 0,
                  clipPath: "inset(0% 0% 0% 0%)",
                  ease: "power1.inOut",
                  duration: 1,
                }
              );
            },
          });
        }, 500);

        const container = document.querySelector(`.experience-img-${index}`)!;

        const paddingLeft = parseFloat(getComputedStyle(container).paddingLeft);
        const paddingRight = parseFloat(
          getComputedStyle(container).paddingRight
        );
        const totalScrollWidth = container.scrollWidth;

        const scrollAmount =
          totalScrollWidth - window.innerWidth + paddingLeft + paddingRight;

        const tl = gsap
          .timeline({
            scrollTrigger: {
              trigger: `.experience-${index}`,
              start: "top top",
              end: "+=2000px",
              scrub: 1,
              pin: true,
            },
          })
          .to(`.experience-img-${index}`, {
            translateY: "10%",
            opacity: 1,
          })
          .to(`.experience-img-${index}`, {
            translateY: "-5%",
          });

        if (data.image.length > 4) {
          tl.to(`.experience-img-${index}`, {
            x: -scrollAmount,
          });
        }
      });
    },
    { scope: containerRef, dependencies: [data] }
  );

  return (
    <div
      className="min-h-screen grid text-ruby-red font-bold"
      ref={containerRef}
    >
      <div
        className={clsx(
          "font-abc font-bold text-16d sticky top-85d pl-20d z-10",
          "experience-title"
        )}
      >
        EXPERIENCES
      </div>

      {data &&
        data.data.Experience.map((item, index) => (
          <div
            key={item.title}
            className={clsx(
              "h-screen w-screen relative overflow-hidden",
              `experience-${index}`
            )}
          >
            <div className="pt-120d grid grid-cols-12 px-20d">
              <div
                className={clsx(
                  "col-span-6 uppercase text-128d font-bold leading-none font-abc",
                  `experience-title-${index}`
                )}
              >
                {item.title}
              </div>
              <div
                className={clsx(
                  "col-span-4 col-start-8 font-sans text-12d font-light",
                  `experience-desc-${index}`
                )}
              >
                {item.description}
              </div>
              <div
                className={clsx(
                  "col-span-1 col-start-12 flex justify-end"
                  // `experience-desc-${index}`
                )}
              >
                <div className="font-sans text-12d font-light">[5]</div>
              </div>
            </div>

            <div
              className={clsx(
                "w-full flex flex-nowrap gap-x-20d absolute px-20d bottom-0 translate-y-full opacity-0",
                `experience-img-${index}`
              )}
            >
              {item.image.map((image) => (
                <div
                  className="w-335d h-456d relative flex-none rounded-32d overflow-hidden"
                  key={image.id}
                >
                  <GradientImage
                    src={process.env.NEXT_PUBLIC_STRAPI_URL + image.image.url}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default EventDetailExperience;
