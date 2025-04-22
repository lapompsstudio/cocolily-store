"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import React, { useRef, useState, useEffect } from "react";
import SplitText from "gsap/SplitText";
import gsap from "gsap";
import GradientImage from "@/components/ui/GradientImage";
import clsx from "clsx";
import Button from "@/components/ui/button";

// Register GSAP plugins
gsap.registerPlugin(SplitText);

// Define types for the component props
interface CardProductProps {
  title?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

// Define types for split text elements
type SplitTextInstance = SplitText | null;

export default function CardProduct({
  title = "Signature Signature Box",
  imageSrc = "/images/our-products/image.png",
  // imageAlt = "Product image",
  className,
}: CardProductProps): JSX.Element {
  // Refs for DOM elements
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const buttonContainerRef = useRef<HTMLDivElement | null>(null);

  // Ref to store active animations for later killing
  const animationsRef = useRef<gsap.core.Tween[]>([]);

  const [splitTextInstance, setSplitTextInstance] =
    useState<SplitTextInstance>(null);

  useGSAP(() => {
    // Check if refs are available
    if (
      !textRef.current ||
      !cardRef.current ||
      !imageRef.current ||
      !buttonContainerRef.current
    )
      return;

    // Create split text
    const instance = new SplitText(textRef.current, {
      type: "lines",
    });
    setSplitTextInstance(instance);

    const elements = gsap.utils.toArray(instance["lines"]) as HTMLElement[];
    const buttonContainer = buttonContainerRef.current;

    // Initial state - text and button are hidden (moved down and clipped)
    gsap.set(elements, {
      clipPath: "inset(0% 0% 100% 0%)",
      yPercent: 100,
      marginBottom: "-20px",
      paddingBottom: "20px",
    });

    // Set initial state for button container
    gsap.set(buttonContainer, {
      clipPath: "inset(0% 0% 100% 0%)",
      yPercent: 100,
    });

    // Setup hover animations
    const card = cardRef.current;
    const imageContainer = imageRef.current;

    // Function to kill all active animations
    const killActiveAnimations = (): void => {
      // Kill all active animations stored in the ref
      animationsRef.current.forEach((tween) => {
        if (tween.isActive()) {
          tween.kill();
        }
      });
      // Clear the animations array
      animationsRef.current = [];
    };

    // Define event handlers
    const handleMouseEnter = (): void => {
      // First kill any active animations to prevent conflicts
      killActiveAnimations();

      // Show text on hover
      const textAnim = gsap.to(elements, {
        clipPath: "inset(0% 0% 0% 0%)",
        yPercent: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power1.inOut",
      });

      // Store the animation
      animationsRef.current.push(textAnim);

      // Animate the button container
      const buttonAnim = gsap.to(buttonContainer, {
        clipPath: "inset(0% 0% 0% 0%)",
        yPercent: 0,
        duration: 0.5,
        delay: 0.2, // Slight delay after text animation starts
        ease: "power1.inOut",
      });

      // Store the button animation
      animationsRef.current.push(buttonAnim);

      // Scale the image to 1.3x
      if (imageContainer) {
        const imageAnim = gsap.to(imageContainer, {
          scale: 1.3,
          duration: 0.5,
          ease: "power1.inOut",
        });
        animationsRef.current.push(imageAnim);
      }

      // Also animate the gradient overlay
      const overlay = card.querySelector(".gradient-overlay");
      if (overlay) {
        const overlayAnim = gsap.to(overlay, {
          opacity: 1,
          duration: 0.5,
        });
        animationsRef.current.push(overlayAnim);
      }
    };

    const handleMouseLeave = (): void => {
      // First kill any active animations to prevent conflicts
      killActiveAnimations();

      // Hide text when not hovering
      const textAnim = gsap.to(elements, {
        clipPath: "inset(0% 0% 100% 0%)",
        yPercent: 100,
        duration: 0.5,
        stagger: 0.05,
        ease: "power1.inOut",
      });
      animationsRef.current.push(textAnim);

      // Hide button when not hovering
      const buttonAnim = gsap.to(buttonContainer, {
        clipPath: "inset(0% 0% 100% 0%)",
        yPercent: 100,
        duration: 0.5,
        ease: "power1.inOut",
      });
      animationsRef.current.push(buttonAnim);

      // Reset image scale
      if (imageContainer) {
        const imageAnim = gsap.to(imageContainer, {
          scale: 1,
          duration: 0.5,
          ease: "power1.inOut",
        });
        animationsRef.current.push(imageAnim);
      }

      // Fade out the gradient overlay
      const overlay = card.querySelector(".gradient-overlay");
      if (overlay) {
        const overlayAnim = gsap.to(overlay, {
          opacity: 0,
          duration: 0.5,
        });
        animationsRef.current.push(overlayAnim);
      }
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      // Cleanup event listeners
      if (card) {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      }

      // Kill any remaining animations
      killActiveAnimations();

      // Clean up split text
      if (splitTextInstance) {
        splitTextInstance.revert();
      }
    };
  }, []);

  return (
    <div>
      <p className="font-abc mb-10d font-bold text-ruby-red">{title}</p>
      <div
        ref={cardRef}
        className={clsx(
          "w-full h-[90vh] overflow-hidden rounded-32d relative cursor-pointer",
          className
        )}
      >
        <h3
          ref={textRef}
          className="absolute z-20 bottom-[6%] text-ruby-red font-span font-bold left-[8%] text-start w-[50%]"
        >
          {title}
        </h3>

        <div
          ref={buttonContainerRef}
          className="absolute z-20 right-[8%] bottom-[6%]"
        >
          <Button
            buttonType="link"
            href="/"
            isHoverTranslate
            className="w-max uppercase font-sans"
          >
            shop now
          </Button>
        </div>

        <div className="gradient-overlay bg-gradient-to-t from-white to-transparent w-full h-[50vh] absolute bottom-0 z-10 opacity-0"></div>

        <div ref={imageRef} className="relative w-full h-full overflow-hidden">
          <GradientImage src={imageSrc} />
        </div>
      </div>
    </div>
  );
}
