import { useEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function useSplitTextAnimation({
  selector,
  type = "lines",
  stagger = 0.1,
  startMd = "top 75%",
  startMobile = "top 75%",
  delay = 0,
  delayMobile = 0,
}: {
  selector: string;
  type?: "lines" | "words" | "chars";
  stagger?: number;
  startMd?: string;
  startMobile?: string;
  delay?: number;
  delayMobile?: number;
}) {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isPortrait: "(orientation: portrait)",
        isLandscape: "(orientation: landscape)",
        md: "(min-width: 768px) and (orientation: landscape)",
        maxXXs: "(max-width: 767.98px)",
      },
      (context) => {
        const md = context.conditions?.md ?? false;

        // Select all elements that match the class name
        const elements = document.querySelectorAll(selector);

        // Loop over each element
        elements.forEach((element) => {
          const splitTextInstance = new SplitText(element, {
            type: type,
          });

          const splitElements = gsap.utils.toArray(splitTextInstance[type]);

          gsap.set(splitElements, {
            clipPath: "inset(0% 0% 100% 0%)",
            yPercent: 100,
            marginBottom: md ? "-16px" : "-20px",
            paddingBottom: md ? "16px" : "16px",
          });

          // Create the ScrollTrigger
          const scrollTrigger = ScrollTrigger.create({
            trigger: element, // Set the trigger for this specific element
            start: md ? startMd : startMobile, // Adjust this if necessary
            onEnter: () => {
              gsap.to(splitElements, {
                clipPath: "inset(0% 0% 0% 0%)",
                yPercent: 0,
                duration: 0.8,
                stagger: stagger,
                delay: md ? delay : delayMobile,
                ease: "power1.inOut",
              });
            },
          });

          return () => {
            scrollTrigger.kill(); // Clean up the ScrollTrigger
            splitTextInstance.revert();
          };
        });
      }
    );
  }, [selector, type, stagger, delay]);
}
