"use client";

import React, { useRef } from "react";
import clsx from "clsx";
import useSplitTextAnimation from "@/app/hooks/useSplitTextAnimation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientImage from "@/components/ui/GradientImage";

// Register the plugins
gsap.registerPlugin(Flip, ScrollTrigger);

const AboutPurpose = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useSplitTextAnimation({
    selector: ".split-text-stagger",
  });

  // Use GSAP's useGSAP hook for the FLIP animation
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1025px)", () => {
        /**
         * FLIP ANIMATION
         */
        // Select the element that will be animated with Flip and its parent
        const oneElement = document.querySelector(".one") as HTMLElement | null;
        const parentElement = oneElement?.parentNode as HTMLElement | null;

        if (!oneElement || !parentElement) {
          console.error("Required elements are missing.");
          return;
        }

        // Select all elements with a `data-step` attribute for the Flip animation steps
        const stepElements: HTMLElement[] = Array.from(
          document.querySelectorAll("[data-step]")
        ) as HTMLElement[];

        if (stepElements.length === 0) {
          console.warn("No elements with [data-step] found.");
          return;
        }

        gsap.from(oneElement, {
          clipPath: "inset(0% 0% 100% 0%)",
          rotate: 90,
          // yPercent: 100,
          duration: 0.8,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: oneElement,
            start: "top-=150 70%",
            end: "bottom center",
            toggleActions: "play none none none",
            // scrub: true,
            // markers: true,
          },
        });

        // eslint-disable-next-line prefer-const
        let flipCtx: gsap.Context | undefined;

        // Revert any previous animation context
        if (flipCtx) {
          flipCtx.revert();
        }

        // Assign the context
        flipCtx = gsap.context(() => {
          const flipConfig: gsap.TweenVars = {
            duration: 0.5, // Duration of each Flip animation
            ease: "sine.inOut", // Easing for smooth transitions
          };

          // Store Flip states for each step element
          const states = stepElements.map((stepElement) =>
            Flip.getState(stepElement)
          );

          // Create a GSAP timeline with ScrollTrigger for the Flip animation
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: parentElement, // Trigger animation based on the parent element
              start: "center center", // Start animation when parent is in the center of the viewport
              endTrigger: stepElements[stepElements.length - 1], // End at the last step element
              end: "bottom+=50 center", // End animation when the last step is centered
              scrub: true, // Synchronize animation with scroll
              // markers: true,
            },
          });

          // Add Flip animations to the timeline for each state
          states.forEach((state, index) => {
            const customFlipConfig: Flip.FitVars = {
              ...flipConfig, // Ensure only valid FitVars properties are included
              ease: index === 0 ? "none" : flipConfig.ease, // Adjust easing as needed
              scale: false, // Explicitly set scale to a boolean value (true or false)
            };

            const flipAnimation = Flip.fit(oneElement, state, customFlipConfig);

            if (flipAnimation instanceof gsap.core.Tween) {
              tl.add(flipAnimation, index ? "+=0.5" : 0).to(
                oneElement,
                {
                  rotate: -90,
                  duration: 0.5,
                  ease: "power1.inOut",
                },
                "<"
              );
            } else {
              console.warn(
                `Flip.fit() did not return a valid Tween for index ${index}`
              );
            }
          });
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      className="min-h-screen bg-ruby-red pt-142d pb-150d text-white"
      ref={containerRef}
    >
      <div className="text-center space-y-80d">
        <p className="text-16d font-bold font-abc uppercase">IN 2022</p>
        <h2
          className={clsx(
            "text-32d font-bold font-abc uppercase max-w-1200d mx-auto",
            "split-text-stagger"
          )}
        >
          Cocolily hit Instagram with a bang when our first beverage—the Iced
          Coco—went viral. This taught us about how an experience over a product
          can build a long-lasting relationship with a brand. So we ran with it.
        </h2>
      </div>
      <div className="mt-150d mb-180d grid md:landscape:grid-cols-12 gap-20d">
        <div className="col-span-4 pr-24d text-right relative">
          <div className="absolute top-92d right-64d max-w-335d">
            <h3 className="text-16d font-bold font-abc uppercase">
              <span className={clsx("block", "split-text-stagger")}>
                Building experiences
              </span>
            </h3>
            <p
              className={clsx(
                "text-12d leading-1.4 mt-28d",
                "split-text-stagger"
              )}
            >
              Building on the success of the Iced Coco, we kept innovating,
              bringing new and exciting chocolate-based experiences that turn
              everyday moments into celebrations.
            </p>
            <div className="absolute -right-40d -top-5d w-22d h-22d">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flipped-item one z-10 relative"
              >
                <path
                  d="M10.6091 11.3925C10.1226 11.4473 9.66923 11.6656 9.32309 12.0117C8.97696 12.3579 8.75864 12.8113 8.70388 13.2977C8.60219 13.3155 8.49913 13.3244 8.39588 13.3241C5.84388 13.3549 3.77148 11.0009 3.77148 11.0009C3.77148 11.0009 5.84388 8.64692 8.39588 8.68213C8.49892 8.68272 8.60181 8.69007 8.70388 8.70413C8.75864 9.19056 8.97696 9.64398 9.32309 9.99012C9.66923 10.3362 10.1226 10.5546 10.6091 10.6093C10.648 10.8689 10.648 11.1329 10.6091 11.3925Z"
                  fill="#ffffff"
                />
                <path
                  d="M13.3236 8.39979C13.3236 8.50099 13.3236 8.59779 13.3236 8.69899C12.8335 8.74983 12.3754 8.96633 12.025 9.31273C11.6746 9.65914 11.4529 10.1147 11.3964 10.6042C11.1357 10.6482 10.8695 10.6482 10.6088 10.6042C10.5525 10.1183 10.3337 9.66577 9.98789 9.31993C9.64204 8.97408 9.18947 8.75527 8.70362 8.69899C8.68755 8.60009 8.68018 8.49998 8.68162 8.39979C8.64202 5.83899 11.0004 3.77539 11.0004 3.77539C11.0004 3.77539 13.3588 5.83899 13.3236 8.39979Z"
                  fill="#ffffff"
                />
                <path
                  d="M18.2299 11.0009C18.2299 11.0009 16.1619 13.3593 13.6055 13.3285C13.5052 13.3287 13.4051 13.3198 13.3063 13.3021C13.2491 12.8159 13.0294 12.3633 12.6828 12.0175C12.3362 11.6717 11.8831 11.453 11.3967 11.3969C11.3528 11.1362 11.3528 10.87 11.3967 10.6093C11.8831 10.5532 12.3362 10.3346 12.6828 9.98879C13.0294 9.64301 13.2491 9.19035 13.3063 8.70413C13.4055 8.69008 13.5054 8.68273 13.6055 8.68213C16.1619 8.64253 18.2299 11.0009 18.2299 11.0009Z"
                  fill="#ffffff"
                />
                <path
                  d="M13.3241 13.6012C13.3593 16.1576 11.0009 18.2256 11.0009 18.2256C11.0009 18.2256 8.63811 16.1576 8.67771 13.6012C8.67613 13.4995 8.68349 13.3979 8.69972 13.2976C9.18586 13.242 9.63885 13.0235 9.98484 12.6775C10.3308 12.3315 10.5494 11.8785 10.6049 11.3924C10.8656 11.3484 11.1318 11.3484 11.3925 11.3924C11.4482 11.8792 11.6674 12.3327 12.0143 12.6787C12.3612 13.0248 12.8152 13.243 13.3021 13.2976C13.3153 13.3988 13.3241 13.4956 13.3241 13.6012Z"
                  fill="#ffffff"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="relative w-384d h-456d mx-auto">
            <GradientImage
              className="mx-auto"
              src={"/about-us/drink.png"}
              alt="cocolily viral drink"
            />
          </div>
        </div>
        <div className="col-span-4 pl-24d relative">
          <div className="absolute bottom-92d left-64d max-w-335d">
            <h3 className="text-16d font-bold font-abc uppercase relative">
              <span className={clsx("block", "split-text-stagger")}>
                Beyond flavor
              </span>
            </h3>
            <p
              className={clsx(
                "text-12d leading-1.4 mt-28d",
                "split-text-stagger"
              )}
            >
              More than just flavors, these experiences were crafted to create
              lasting memories that customers could enjoy together.
            </p>
            <div
              data-step
              className="target absolute -left-40d -top-5d w-22d h-22d"
            ></div>
          </div>
        </div>
      </div>
      <h2
        className={clsx(
          "text-32d font-bold font-abc uppercase max-w-1100d mx-auto text-center",
          "split-text-stagger"
        )}
      >
        We take an artisanal approach to each and every step of the experience,
        and this has remained unchanged—from our humble bonbon beginnings to
        where we are today.
      </h2>
    </div>
  );
};

export default AboutPurpose;
