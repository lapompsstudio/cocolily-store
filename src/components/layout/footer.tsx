"use client";

import React, { useRef, useState, useEffect, MouseEvent } from "react";
import Button from "../ui/button";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import useSplitTextAnimation from "@/app/hooks/useSplitTextAnimation";
import useColorStore from "@/store/colorStore";
import { globalStore } from "@/store/globalStore";
import NewsletterForm from "../newsletter-form";

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
  velocity: { x: number; y: number };
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
  const [dragStartTime, setDragStartTime] = useState<number>(0);
  const [dragPositions, setDragPositions] = useState<Position[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const globalData = globalStore((state) => state.globalData);

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

    // Define ornament image sources
    const ornamentSources = [
      "/footer/ornament1_crop.png",
      "/footer/ornament2_crop.png",
      "/footer/ornament3_crop.png",
      "/footer/ornament4_crop.png",
      "/footer/ornament5_crop.png",
      "/footer/ornament6_crop.png",
      "/footer/ornament7_crop.png",
    ];

    // Define initial ornament positions
    const newOrnaments: Omit<Ornament, "img">[] = [
      {
        id: 1,
        src: ornamentSources[0],
        x: window.innerWidth * 0.12,
        y: window.innerHeight * 0.52,
        width: 150,
        height: 150,
        loaded: false,
        velocity: { x: 0, y: 0 },
      },
      {
        id: 2,
        src: ornamentSources[1],
        x: window.innerWidth * 0.24,
        y: window.innerHeight * 0.3,
        width: 150,
        height: 150,
        loaded: false,
        velocity: { x: 0, y: 0 },
      },
      {
        id: 3,
        src: ornamentSources[2],
        x: window.innerWidth * 0.35,
        y: window.innerHeight * 0.65,
        width: 150,
        height: 150,
        loaded: false,
        velocity: { x: 0, y: 0 },
      },
      {
        id: 4,
        src: ornamentSources[3],
        x: window.innerWidth * 0.47,
        y: window.innerHeight * 0.175,
        width: 150,
        height: 150,
        loaded: false,
        velocity: { x: 0, y: 0 },
      },
      {
        id: 5,
        src: ornamentSources[4],
        x: window.innerWidth * 0.6,
        y: window.innerHeight * 0.42,
        width: 150,
        height: 150,
        loaded: false,
        velocity: { x: 0, y: 0 },
      },
      {
        id: 6,
        src: ornamentSources[5],
        x: window.innerWidth * 0.78,
        y: window.innerHeight * 0.3,
        width: 150,
        height: 150,
        loaded: false,
        velocity: { x: 0, y: 0 },
      },
      {
        id: 7,
        src: ornamentSources[6],
        x: window.innerWidth * 0.88,
        y: window.innerHeight * 0.54,
        width: 150,
        height: 150,
        loaded: false,
        velocity: { x: 0, y: 0 },
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
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Handle physics and animation
  useEffect(() => {
    const animateOrnaments = () => {
      setOrnaments((prevOrnaments) => {
        return prevOrnaments.map((ornament) => {
          // If currently being dragged, don't apply physics
          if (ornament.id === dragIndex && isDragging) {
            return ornament;
          }

          // Apply velocity and friction
          let newX = ornament.x + ornament.velocity.x;
          let newY = ornament.y + ornament.velocity.y;

          // Apply friction
          const friction = 0.97;
          const newVelocityX = ornament.velocity.x * friction;
          const newVelocityY = ornament.velocity.y * friction;

          // Check for boundary collisions
          const halfWidth = ornament.width / 2;
          const halfHeight = ornament.height / 2;

          if (newX - halfWidth < 0) {
            newX = halfWidth;
            ornament.velocity.x = -ornament.velocity.x * 0.8;
          } else if (newX + halfWidth > window.innerWidth) {
            newX = window.innerWidth - halfWidth;
            ornament.velocity.x = -ornament.velocity.x * 0.8;
          }

          if (newY - halfHeight < 0) {
            newY = halfHeight;
            ornament.velocity.y = -ornament.velocity.y * 0.8;
          } else if (newY + halfHeight > window.innerHeight) {
            newY = window.innerHeight - halfHeight;
            ornament.velocity.y = -ornament.velocity.y * 0.8;
          }

          // Check collisions with other ornaments
          prevOrnaments.forEach((otherOrnament) => {
            if (ornament.id !== otherOrnament.id) {
              const dx = newX - otherOrnament.x;
              const dy = newY - otherOrnament.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const minDistance = (ornament.width + otherOrnament.width) / 2;

              if (distance < minDistance) {
                // Collision detected - only bounce, no image swap

                // Bounce effect
                const angle = Math.atan2(dy, dx);
                const targetX = otherOrnament.x + Math.cos(angle) * minDistance;
                const targetY = otherOrnament.y + Math.sin(angle) * minDistance;

                newX = targetX;
                newY = targetY;

                // Apply force to both ornaments
                ornament.velocity.x = Math.cos(angle) * 5;
                ornament.velocity.y = Math.sin(angle) * 5;
                otherOrnament.velocity.x = -Math.cos(angle) * 5;
                otherOrnament.velocity.y = -Math.sin(angle) * 5;
              }
            }
          });

          return {
            ...ornament,
            x: newX,
            y: newY,
            velocity: {
              x: Math.abs(newVelocityX) < 0.1 ? 0 : newVelocityX,
              y: Math.abs(newVelocityY) < 0.1 ? 0 : newVelocityY,
            },
          };
        });
      });

      animationFrameRef.current = requestAnimationFrame(animateOrnaments);
    };

    animationFrameRef.current = requestAnimationFrame(animateOrnaments);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDragging, dragIndex]);

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

  // Track drag positions for velocity calculation
  const updateDragPositions = (position: Position) => {
    setDragPositions((prev) => {
      const newPositions = [...prev, position];
      // Keep only the last 5 positions for velocity calculation
      if (newPositions.length > 5) {
        return newPositions.slice(newPositions.length - 5);
      }
      return newPositions;
    });
  };

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
        setDragStartTime(Date.now());
        setDragPositions([{ x: mouseX, y: mouseY }]);
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

    updateDragPositions({ x: mouseX, y: mouseY });
    setLastPosition({ x: mouseX, y: mouseY });
  };

  const handleMouseUp = (): void => {
    if (isDragging && dragIndex !== null) {
      // Calculate throw velocity based on last few drag positions
      if (dragPositions.length >= 2) {
        const lastPos = dragPositions[dragPositions.length - 1];
        const prevPos = dragPositions[0];
        const dragDuration = Date.now() - dragStartTime;

        // Calculate velocity (pixels per frame)
        const velocityX = (lastPos.x - prevPos.x) / (dragDuration / 16);
        const velocityY = (lastPos.y - prevPos.y) / (dragDuration / 16);

        // Apply velocity to the dragged ornament
        setOrnaments((prevOrnaments) =>
          prevOrnaments.map((ornament, index) =>
            index === dragIndex
              ? {
                  ...ornament,
                  velocity: {
                    x: velocityX,
                    y: velocityY,
                  },
                }
              : ornament
          )
        );
      }
    }

    setIsDragging(false);
    setDragIndex(null);
    setDragPositions([]);
  };

  // Double-click handler to change ornament images
  const handleDoubleClick = (e: MouseEvent<HTMLElement>): void => {
    if (!containerRef.current) return;

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
        // Find a random ornament to swap with
        const otherIndex = Math.floor(Math.random() * ornaments.length);
        if (otherIndex !== i) {
          setOrnaments((prevOrnaments) => {
            const newOrnaments = [...prevOrnaments];
            // Swap the sources
            const tempSrc = newOrnaments[i].src;
            newOrnaments[i].src = newOrnaments[otherIndex].src;
            newOrnaments[otherIndex].src = tempSrc;

            // Update the image objects
            newOrnaments[i].img.src = newOrnaments[i].src;
            newOrnaments[otherIndex].img.src = newOrnaments[otherIndex].src;

            return newOrnaments;
          });
        }
        break;
      }
    }
  };

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
      }}
    >
      <footer
        ref={containerRef}
        className="footer min-h-screen relative flex w-full items-end p-20d bg-seashell overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={handleDoubleClick}
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
              <NewsletterForm />
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
                  {globalData?.address_location}
                </Link>
              </div>
              <div className="space-y-20d">
                <h3 className="footer-text-anim text-10d text-ruby-red leading-1.3">
                  FOLLOW US
                </h3>
                {globalData?.social.map((social) => (
                  <Link
                    key={social.id}
                    href={social.links}
                    target="_blank"
                    className="footer-text-anim text-ruby-red text-16d font-bold leading-none uppercase font-abc block"
                  >
                    {social.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="reveal-bottom grid md:landscape:grid-cols-12 mt-48d">
            <div className="md:col-span-6">
              <Button
                buttonType="link"
                href={`mailto:${globalData?.email}`}
                variant="secondary"
                className="h-72d text-16d font-abc uppercase"
              >
                EMAIL: {globalData?.email}
              </Button>
            </div>
            <div className="md:col-span-6">
              <Button
                buttonType="link"
                href={`tel:${globalData?.phone_number?.replace(/[\s()]+/g, "")}`}
                variant="secondary"
                className="h-72d text-16d font-abc uppercase"
              >
                PHONE NUMBER: {globalData?.phone_number}
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </GoogleReCaptchaProvider>
  );
};

export default Footer;
