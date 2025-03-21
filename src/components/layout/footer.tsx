"use client";

import React, { useRef, useState, useEffect, MouseEvent } from "react";
import Button from "../ui/button";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useSplitTextAnimation from "@/app/hooks/useSplitTextAnimation";
import useColorStore from "@/store/colorStore";

gsap.registerPlugin(useGSAP);

// Define types for ornaments
interface Ornament {
  id: number;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  loaded: boolean;
  img: HTMLImageElement;
}

// Define types for position
interface Position {
  x: number;
  y: number;
}

const Footer: React.FC = () => {
  const { currentColor } = useColorStore();
  const containerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ornaments, setOrnaments] = useState<Ornament[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [lastPosition, setLastPosition] = useState<Position>({ x: 0, y: 0 });

  useSplitTextAnimation({
    selector: ".footer-text-anim",
    startMd: "top 90%",
  });

  // Initialize ornaments
  useEffect(() => {
    // Canvas sizing
    const updateCanvasSize = (): void => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Define initial ornament positions
    const newOrnaments: Omit<Ornament, "img">[] = [
      {
        id: 1,
        src: "/footer/ornament1.png",
        x: window.innerWidth * 0.12,
        y: window.innerHeight * 0.52,
        width: 200,
        height: 200,
        loaded: false,
      },
      {
        id: 2,
        src: "/footer/ornament2.png",
        x: window.innerWidth * 0.24,
        y: window.innerHeight * 0.3,
        width: 200,
        height: 200,
        loaded: false,
      },
      {
        id: 3,
        src: "/footer/ornament3.png",
        x: window.innerWidth * 0.35,
        y: window.innerHeight * 0.65,
        width: 200,
        height: 200,
        loaded: false,
      },
      {
        id: 4,
        src: "/footer/ornament4.png",
        x: window.innerWidth * 0.47,
        y: window.innerHeight * 0.175,
        width: 200,
        height: 200,
        loaded: false,
      },
      {
        id: 5,
        src: "/footer/ornament5.png",
        x: window.innerWidth * 0.6,
        y: window.innerHeight * 0.42,
        width: 200,
        height: 200,
        loaded: false,
      },
      {
        id: 6,
        src: "/footer/ornament6.png",
        x: window.innerWidth * 0.78,
        y: window.innerHeight * 0.3,
        width: 200,
        height: 200,
        loaded: false,
      },
      {
        id: 7,
        src: "/footer/ornament7.png",
        x: window.innerWidth * 0.88,
        y: window.innerHeight * 0.54,
        width: 200,
        height: 200,
        loaded: false,
      },
    ];

    // Load all images
    const loadedOrnaments = newOrnaments.map((ornament) => {
      const img = new Image();
      img.src = ornament.src;
      img.onload = () => {
        setOrnaments((prevOrnaments) =>
          prevOrnaments.map((o) =>
            o.id === ornament.id ? { ...o, loaded: true } : o
          )
        );
      };
      return { ...ornament, img };
    });

    setOrnaments(loadedOrnaments as Ornament[]);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  // Draw ornaments on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ornaments.forEach((ornament) => {
      if (ornament.loaded) {
        ctx.drawImage(
          ornament.img,
          ornament.x - ornament.width / 2,
          ornament.y - ornament.height / 2,
          ornament.width,
          ornament.height
        );
      }
    });
  }, [ornaments]);

  // Animation effects
  useGSAP(
    () => {
      const tl = gsap.timeline({
        paused: true,
        delay: 1.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none none",
        },
      });

      // Animate ornaments appearance with delay
      ornaments.forEach((ornament, index) => {
        tl.from(
          `#ornament-${ornament.id}`,
          {
            opacity: 0,
            duration: 0.1,
            scale: 1.2,
          },
          index * 0.2
        );
      });

      // Reveal animation for bottom elements
      gsap.fromTo(
        ".reveal-bottom",
        {
          yPercent: 100,
          clipPath: "inset(0% 0% 100% 0%)",
        },
        {
          yPercent: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".reveal-bottom",
            start: "top-=100 bottom",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  useGSAP(() => {
    gsap.to(".dynamic-bg", {
      backgroundImage: `linear-gradient(to bottom, ${currentColor} 0%, rgba(255,255,255,0) 100%)`,
      duration: 1,
      ease: "power2.inOut",
    });
  }, [currentColor]);

  // Mouse event handlers for dragging
  const handleMouseDown = (e: MouseEvent<HTMLElement>): void => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check if mouse is over any ornament
    for (let i = ornaments.length - 1; i >= 0; i--) {
      const ornament = ornaments[i];
      const halfWidth = ornament.width / 2;
      const halfHeight = ornament.height / 2;

      if (
        mouseX >= ornament.x - halfWidth &&
        mouseX <= ornament.x + halfWidth &&
        mouseY >= ornament.y - halfHeight &&
        mouseY <= ornament.y + halfHeight
      ) {
        setIsDragging(true);
        setDragIndex(i);
        setLastPosition({ x: mouseX, y: mouseY });
        e.preventDefault(); // Prevent default to avoid text selection
        break;
      }
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLElement>): void => {
    if (!isDragging || dragIndex === null || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const dx = mouseX - lastPosition.x;
    const dy = mouseY - lastPosition.y;

    setOrnaments((prevOrnaments) =>
      prevOrnaments.map((ornament, index) =>
        index === dragIndex
          ? { ...ornament, x: ornament.x + dx, y: ornament.y + dy }
          : ornament
      )
    );

    setLastPosition({ x: mouseX, y: mouseY });
  };

  const handleMouseUp = (): void => {
    setIsDragging(false);
    setDragIndex(null);
  };

  return (
    <footer
      ref={containerRef}
      className="footer min-h-screen relative flex w-full items-end p-20d bg-seashell overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <div className="dynamic-bg absolute top-0 left-0 right-0 h-264d z-[1]"></div>

      {/* Draggable Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-[30] pointer-events-none"
      />

      <div className="w-full z-[20] relative">
        <div>
          <h2 className="footer-text-anim text-128d font-bold font-abc text-center text-ruby-red leading-none">
            JOIN THE CELEBRATION
          </h2>
          <p className="footer-text-anim text-ruby-red font-bold text-16d text-center mt-32d font-abc">
            BE PART OF COCOLILY&rsquo;S WORLD
          </p>
        </div>
        <div className="grid md:landscape:grid-cols-12 mt-80d">
          <div className="md:col-span-8">
            <h3 className="text-10d text-ruby-red leading-1.3">
              STAY CONNECTED
            </h3>
            <div className="flex items-center relative w-355d mt-20d">
              <input
                type="text"
                className="bg-transparent border border-ruby-red rounded-full h-38d w-full px-22d placeholder:text-ruby-red placeholder:font-semibold text-ruby-red font-semibold text-12d focus-visible:outline-none focus-within:outline-none focus:outline-none"
                placeholder="SUBMIT YOUR EMAIL"
              />
              <Button
                buttonType="button"
                onClick={(
                  e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
                ) => console.log("e", e)}
                className="!absolute right-0"
              >
                SUBMIT
              </Button>
            </div>
          </div>
          <div className="md:col-span-4 flex justify-between">
            <div className="max-w-225d space-y-20d">
              <h3 className="footer-text-anim text-10d text-ruby-red leading-1.3">
                VISIT COCOLILY STORE
              </h3>
              <Link
                href={"/"}
                className="footer-text-anim text-ruby-red text-16d font-bold leading-none uppercase font-abc block"
              >
                8 17A St - Al Bada&rsquo;a - Dubai - United Arab Emirates
              </Link>
            </div>
            <div className="space-y-20d">
              <h3 className="footer-text-anim text-10d text-ruby-red leading-1.3">
                FOLLOW US
              </h3>
              <Link
                href={"/"}
                className="footer-text-anim text-ruby-red text-16d font-bold leading-none uppercase font-abc block"
              >
                INSTAGRAM
              </Link>
            </div>
          </div>
        </div>
        <div className="reveal-bottom grid md:landscape:grid-cols-12 mt-48d">
          <div className="md:col-span-6">
            <Button
              buttonType="link"
              href="mailto:hello@cocolily.ae"
              variant="secondary"
              className="h-72d text-16d font-abc"
            >
              EMAIL: HELLO@COCOLILY.AE
            </Button>
          </div>
          <div className="md:col-span-6">
            <Button
              buttonType="link"
              href="tel:+971504181411"
              variant="secondary"
              className="h-72d text-16d font-abc"
            >
              PHONE NUMBER: (+971) 50 418 1411
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
