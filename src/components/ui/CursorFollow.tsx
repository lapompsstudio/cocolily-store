"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CursorFollow = ({
  title,
  isOneElement,
  isManyElement,
}: {
  title: string;
  isOneElement?: boolean;
  isManyElement?: boolean;
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };

      if (!cursorRef.current) return;

      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        xPercent: -50, // Pastikan posisi elemen berada di tengah
        yPercent: -50,
        ease: "power2.out",
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  useEffect(() => {
    if (!isOneElement) return;

    let activeElement: Element | null = null;

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const updateActiveElement = () => {
      const newActiveElement = document.querySelector(".cursor-follow-active");

      if (newActiveElement !== activeElement) {
        if (activeElement) {
          activeElement.removeEventListener("mouseenter", handleMouseEnter);
          activeElement.removeEventListener("mouseleave", handleMouseLeave);
        }

        if (newActiveElement) {
          newActiveElement.addEventListener("mouseenter", handleMouseEnter);
          newActiveElement.addEventListener("mouseleave", handleMouseLeave);

          // Cek apakah cursor masih berada di dalam elemen aktif
          const { left, top, width, height } =
            newActiveElement.getBoundingClientRect();
          const { x, y } = mousePosition.current;

          const isCursorInside =
            x >= left && x <= left + width && y >= top && y <= top + height;

          if (isCursorInside) {
            setIsVisible(true);
          }
        }

        activeElement = newActiveElement;
      }
    };

    const observer = new MutationObserver(updateActiveElement);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
    });

    updateActiveElement();

    return () => {
      observer.disconnect();
      if (activeElement) {
        activeElement.removeEventListener("mouseenter", handleMouseEnter);
        activeElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isOneElement]);

  useEffect(() => {
    if (!isManyElement) return;

    const elements = document.querySelectorAll(".cursor-follow-active");

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    elements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    const observer = new MutationObserver(() => {
      const updatedElements = document.querySelectorAll(
        ".cursor-follow-active"
      );

      updatedElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      observer.disconnect();
    };
  }, [isManyElement]);

  return (
    <div
      ref={cursorRef}
      className={`hidden w-80d h-80d bg-seashell backdrop-blur-[4px] bg-opacity-30 rounded-full fixed top-0 left-0 transition-opacity duration-500 pointer-events-none z-50 md:landscape:flex justify-center items-center ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ willChange: "transform" }} // Optimisasi performa animasi
    >
      <div className="font-abc font-bold text-11d leading-none text-white text-center">
        {title}
      </div>
    </div>
  );
};

export default CursorFollow;
