"use client";

import React, { useRef } from "react";
import clsx from "clsx";
import useSplitTextAnimation from "@/app/hooks/useSplitTextAnimation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientImage from "@/components/ui/GradientImage";
import FlowerOrnament from "@/components/ui/FlowerOrnament";

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
      mm.add("(min-width: 1023px)", () => {
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
        <p
          className={clsx(
            "text-16d font-bold font-abc uppercase",
            "split-text-stagger"
          )}
        >
          IN 2022
        </p>
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
              <FlowerOrnament className="flipped-item one z-10 relative w-22d h-22d" />
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
