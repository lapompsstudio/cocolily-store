import React, { useState, useEffect } from "react";

import Button from "@/components/ui/button";
import FormGeneral from "./FormGeneral";
import FormCollaborate from "./FormCollaborate";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ContactUsForm = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const formContainerRef = React.useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<"general" | "collaborate">(
    "general"
  );
  const [animating, setAnimating] = useState(false);

  // Initialize GSAP animations
  useGSAP(
    () => {
      gsap.to(".reveal-form-animate", {
        clipPath: "inset(0% 0% 0% 0%)",
        y: "0%",
        opacity: 1,
        duration: 0.8,
        ease: "power1.inOut",
      });

      gsap.set(".reveal-collaborate", {
        clipPath: "inset(0% 0% 100% 0%)",
        yPercent: 100,
        opacity: 0,
        zIndex: 1,
      });

      gsap.set(".form-collaborate-wrapper", {
        zIndex: -1,
        opacity: 1,
      });
    },
    { scope: containerRef }
  );

  // Handle form mode changes
  const handleModeChange = (mode: "general" | "collaborate") => () => {
    // Prevent multiple animations from running at once
    if (animating || mode === activeMode) return;

    setAnimating(true);
    setActiveMode(mode);

    const tl = gsap.timeline({
      onComplete: () => {
        setAnimating(false);
      },
    });

    if (mode === "general") {
      // First set z-index to ensure correct stacking
      gsap.set(".reveal-general", { zIndex: 2 });
      gsap.set(".reveal-collaborate", { zIndex: 1 });

      // Hide collaborate form first (complete hiding)
      tl.to(".form-general-wrapper", {
        zIndex: 1,
        duration: 0.3,
        ease: "power1.inOut",
      }).to(
        ".reveal-collaborate",
        {
          clipPath: "inset(0% 0% 100% 0%)",
          yPercent: 100,
          opacity: 0,
          duration: 0.3,
          ease: "power1.inOut",
        },
        "-=0.3"
      );

      // Then show general form
      tl.to(".reveal-general", {
        clipPath: "inset(0% 0% 0% 0%)",
        yPercent: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power1.out",
        onComplete: () => {
          gsap.set(".form-collaborate-wrapper", {
            zIndex: -1,
          });
        },
      });
    } else {
      // First set z-index to ensure correct stacking
      gsap.set(".reveal-collaborate", { zIndex: 2 });
      gsap.set(".reveal-general", { zIndex: 1 });

      // Hide general form first (complete hiding)
      tl.to(".form-collaborate-wrapper", {
        zIndex: 1,
        duration: 0.3,
        ease: "power1.inOut",
      }).to(
        ".reveal-general",
        {
          clipPath: "inset(0% 0% 100% 0%)",
          yPercent: 100,
          opacity: 0,
          duration: 0.3,
          ease: "power1.inOut",
        },
        "-=0.3"
      );

      // Then show collaborate form
      tl.to(".reveal-collaborate", {
        clipPath: "inset(0% 0% 0% 0%)",
        yPercent: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power1.out",
        onComplete: () => {
          gsap.set(".form-general-wrapper", {
            zIndex: -1,
          });
        },
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="grid md:landscape:grid-cols-12 gap-20d px-20d bg-ivory-blush pt-101d"
    >
      <div className="md:landscape:col-span-4 md:landscape:w-3/4 flex flex-col gap-20d">
        <Button
          className="reveal-form-animate clipped opacity-0 w-full h-72d text-16d font-bold font-abc"
          buttonType="button"
          variant="secondary"
          isActive={activeMode === "general"}
          onClick={handleModeChange("general")}
          disabled={animating}
        >
          JUST WANT TO SAY HI?
        </Button>
        <Button
          className="reveal-form-animate clipped opacity-0 w-full h-72d text-16d font-bold font-abc"
          buttonType="button"
          variant="secondary"
          isActive={activeMode === "collaborate"}
          onClick={handleModeChange("collaborate")}
          disabled={animating}
        >
          LET&apos;S COLLABORATE WITH US
        </Button>
      </div>
      <div
        ref={formContainerRef}
        className="md:landscape:col-span-8 relative min-h-[600px]"
      >
        <div className="form-general-wrapper w-full absolute top-0 left-0">
          <FormGeneral activeMode={activeMode} />
        </div>
        <div className="form-collaborate-wrapper w-full absolute top-0 left-0 opacity-0">
          <FormCollaborate activeMode={activeMode} />
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;
