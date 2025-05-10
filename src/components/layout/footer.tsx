"use client";

import React, { useRef, useState, useEffect, MouseEvent } from "react";
import Button from "../ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useSplitTextAnimation from "@/app/hooks/useSplitTextAnimation";
import useColorStore from "@/store/colorStore";
import { globalStore } from "@/store/globalStore";
import NewsletterForm from "../newsletter-form";
import SocialBubble from "../ui/SocialBubble";

gsap.registerPlugin(useGSAP);

// Define types for ornaments with scale property
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
  scale: number; // Added scale property
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
  const animationInitialized = useRef<boolean>(false);
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

    // Define initial ornament positions - initialize with scale 0
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
        scale: 0, // Start with scale 0
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
        scale: 0, // Start with scale 0
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
        scale: 0, // Start with scale 0
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
        scale: 0, // Start with scale 0
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
        scale: 0, // Start with scale 0
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
        scale: 0, // Start with scale 0
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
        scale: 0, // Start with scale 0
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
        // Apply scale transformation to drawing
        const scaledWidth = ornament.width * ornament.scale;
        const scaledHeight = ornament.height * ornament.scale;

        ctx.drawImage(
          ornament.img,
          ornament.x - scaledWidth / 2,
          ornament.y - scaledHeight / 2,
          scaledWidth,
          scaledHeight
        );
      }
    });
  }, [ornaments]);

  // Initialize staggered scale animation once ornaments are loaded
  useEffect(() => {
    // Check if all ornaments are loaded and animation hasn't been initialized yet
    if (
      ornaments.length === 7 &&
      ornaments.every((o) => o.loaded) &&
      !animationInitialized.current
    ) {
      animationInitialized.current = true;

      // Define the stagger order: 5, 6, 3, 2, 7, 4, 1
      const staggerOrder = [5, 6, 3, 2, 7, 4, 1];

      // Create timeline for staggered animation
      const tl = gsap.timeline({
        delay: 1.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom 10%",
          toggleActions: "play none none none",
          // markers: true,
        },
      });

      // Add animations for each ornament in the specified order
      staggerOrder.forEach((id, index) => {
        tl.to(
          // Use an invisible proxy object for animation
          { value: 0 },
          {
            value: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
            onUpdate: function () {
              // Update the ornament's scale property in state
              setOrnaments((prevOrnaments) =>
                prevOrnaments.map((ornament) =>
                  ornament.id === id
                    ? { ...ornament, scale: this.targets()[0].value }
                    : ornament
                )
              );
            },
          },
          index * 0.2 // Stagger delay
        );
      });
    }
  }, [ornaments]);

  useGSAP(() => {
    gsap.to(".dynamic-bg", {
      backgroundImage: `linear-gradient(to bottom, ${currentColor} 0%, rgba(255,255,255,0) 100%)`,
      duration: 1,
      ease: "power2.inOut",
    });
  }, [currentColor]);

  // Reveal animation for bottom elements
  useGSAP(
    () => {
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
      // Adjust hit detection to account for current scale
      const halfWidth = (ornament.width * ornament.scale) / 2;
      const halfHeight = (ornament.height * ornament.scale) / 2;

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
      // Adjust hit detection to account for current scale
      const halfWidth = (ornament.width * ornament.scale) / 2;
      const halfHeight = (ornament.height * ornament.scale) / 2;

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

  useGSAP(
    () => {
      gsap.from(".social-hover-animate", {
        yPercent: 100,
        duration: 1.2,
        clipPath: "inset(0% 0% 100% 0%)",
        stagger: 0.01,
        ease: "elastic.out(1, 0.7)",
        scrollTrigger: {
          trigger: ".social-hover-animate",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    },
    {
      scope: containerRef,
    }
  );

  return (
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
        className="absolute top-0 left-0 w-full h-full z-30 pointer-events-none"
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
        <div className="grid md:landscape:grid-cols-12 pt-80d">
          <div className="md:col-span-8">
            <h3 className="text-10d text-ruby-red leading-1.3">
              STAY CONNECTED
            </h3>
            <NewsletterForm />
          </div>
          <div className="md:col-span-4 flex justify-end items-end max-w-fit ml-auto">
            {/* DO NOT REMOVE, RESERVED FOR FUTURE UPDATE */}
            {/* <div className="max-w-225d space-y-20d">
                <h3 className="footer-text-anim text-10d text-ruby-red leading-1.3">
                  VISIT COCOLILY STORE
                </h3>
                <Link
                  href={"/"}
                  className="footer-text-anim text-ruby-red text-16d font-bold leading-none uppercase font-abc block"
                >
                  {globalData?.address_location}
                </Link>
              </div> */}
            <div className="space-y-20d relative">
              <h3 className="footer-text-anim text-32d text-ruby-red leading-1.3 font-bold font-abc relative z-20">
                FOLLOW US
              </h3>
              <SocialBubble
                href="https://www.instagram.com/cocolily.ae/"
                className="social-hover-animate -top-80d left-40d -rotate-[14.02deg] z-30"
                target="_blank"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.01578 1.6158C9.18878 1.5618 9.56278 1.5498 12.5508 1.5498C15.5388 1.5498 15.9128 1.5628 17.0848 1.6158C18.2568 1.6688 19.0568 1.8558 19.7568 2.1268C20.4898 2.4038 21.1548 2.8368 21.7048 3.3968C22.2648 3.9458 22.6968 4.6098 22.9728 5.3438C23.2448 6.0438 23.4308 6.8438 23.4848 8.0138C23.5388 9.1888 23.5508 9.5628 23.5508 12.5498C23.5508 15.5368 23.5378 15.9118 23.4848 17.0848C23.4318 18.2548 23.2448 19.0548 22.9728 19.7548C22.6967 20.4888 22.264 21.1539 21.7048 21.7038C21.1548 22.2638 20.4898 22.6958 19.7568 22.9718C19.0568 23.2438 18.2568 23.4298 17.0868 23.4838C15.9128 23.5378 15.5388 23.5498 12.5508 23.5498C9.56278 23.5498 9.18878 23.5368 8.01578 23.4838C6.84578 23.4308 6.04578 23.2438 5.34578 22.9718C4.61175 22.6957 3.94666 22.263 3.39678 21.7038C2.83736 21.1543 2.40433 20.4896 2.12778 19.7558C1.85678 19.0558 1.67078 18.2558 1.61678 17.0858C1.56278 15.9108 1.55078 15.5368 1.55078 12.5498C1.55078 9.5628 1.56378 9.1878 1.61678 8.0158C1.66978 6.8438 1.85678 6.0438 2.12778 5.3438C2.40462 4.60994 2.838 3.9452 3.39778 3.3958C3.94698 2.83651 4.61137 2.40348 5.34478 2.1268C6.04478 1.8558 6.84578 1.6698 8.01578 1.6158ZM16.9948 3.5958C15.8348 3.5428 15.4868 3.5318 12.5498 3.5318C9.61278 3.5318 9.26478 3.5428 8.10478 3.5958C7.03178 3.6448 6.44978 3.8238 6.06178 3.9748C5.54878 4.1748 5.18178 4.4118 4.79678 4.7968C4.43151 5.1516 4.1506 5.5839 3.97478 6.0618C3.82378 6.4498 3.64478 7.0318 3.59578 8.1048C3.54278 9.2648 3.53178 9.6128 3.53178 12.5498C3.53178 15.4868 3.54278 15.8348 3.59578 16.9948C3.64478 18.0678 3.82378 18.6498 3.97478 19.0378C4.15078 19.5148 4.43178 19.9478 4.79678 20.3028C5.15178 20.6678 5.58478 20.9488 6.06178 21.1248C6.44978 21.2758 7.03178 21.4548 8.10478 21.5038C9.26478 21.5568 9.61178 21.5678 12.5498 21.5678C15.4878 21.5678 15.8348 21.5568 16.9948 21.5038C18.0678 21.4548 18.6498 21.2758 19.0378 21.1248C19.5508 20.9248 19.9178 20.6878 20.3028 20.3028C20.6678 19.9478 20.9488 19.5148 21.1248 19.0378C21.2758 18.6498 21.4548 18.0678 21.5038 16.9948C21.5568 15.8348 21.5678 15.4868 21.5678 12.5498C21.5678 9.6128 21.5568 9.2648 21.5038 8.1048C21.4548 7.0318 21.2758 6.4498 21.1248 6.0618C20.9248 5.5488 20.6878 5.1818 20.3028 4.7968C19.948 4.43153 19.5157 4.15062 19.0378 3.9748C18.6498 3.8238 18.0678 3.6448 16.9948 3.5958ZM11.1448 15.9408C11.9294 16.2674 12.8032 16.3115 13.6167 16.0655C14.4303 15.8195 15.1332 15.2987 15.6054 14.592C16.0776 13.8854 16.2898 13.0367 16.2058 12.1909C16.1218 11.3451 15.7468 10.5548 15.1448 9.9548C14.761 9.57128 14.297 9.27762 13.7861 9.09495C13.2752 8.91229 12.7302 8.84517 12.1903 8.89842C11.6503 8.95168 11.1289 9.12398 10.6636 9.40294C10.1982 9.68189 9.80053 10.0605 9.49908 10.5117C9.19764 10.9628 8.99997 11.4751 8.9203 12.0118C8.84062 12.5484 8.88093 13.0961 9.03832 13.6153C9.19571 14.1345 9.46626 14.6124 9.8305 15.0145C10.1947 15.4166 10.6436 15.733 11.1448 15.9408ZM8.55278 8.5518C9.07781 8.02678 9.7011 7.61031 10.3871 7.32617C11.0731 7.04202 11.8083 6.89578 12.5508 6.89578C13.2933 6.89578 14.0285 7.04202 14.7145 7.32617C15.4005 7.61031 16.0238 8.02678 16.5488 8.5518C17.0738 9.07683 17.4903 9.70012 17.7744 10.3861C18.0586 11.0721 18.2048 11.8073 18.2048 12.5498C18.2048 13.2923 18.0586 14.0275 17.7744 14.7135C17.4903 15.3995 17.0738 16.0228 16.5488 16.5478C15.4884 17.6081 14.0503 18.2038 12.5508 18.2038C11.0512 18.2038 9.61312 17.6081 8.55278 16.5478C7.49245 15.4875 6.89676 14.0493 6.89676 12.5498C6.89676 11.0503 7.49245 9.61214 8.55278 8.5518ZM19.4588 7.7378C19.5889 7.61507 19.693 7.46749 19.7651 7.30378C19.8371 7.14007 19.8756 6.96357 19.8782 6.78473C19.8808 6.6059 19.8475 6.42835 19.7803 6.26261C19.713 6.09688 19.6132 5.94632 19.4867 5.81984C19.3603 5.69337 19.2097 5.59356 19.044 5.52632C18.8782 5.45908 18.7007 5.42578 18.5219 5.42839C18.343 5.43099 18.1665 5.46946 18.0028 5.5415C17.8391 5.61354 17.6915 5.7177 17.5688 5.8478C17.3301 6.10083 17.1994 6.43693 17.2045 6.78473C17.2096 7.13254 17.35 7.46468 17.5959 7.71065C17.8419 7.95661 18.174 8.09703 18.5219 8.1021C18.8697 8.10717 19.2058 7.97649 19.4588 7.7378Z"
                    fill="#DB0032"
                  />
                </svg>
              </SocialBubble>
              <SocialBubble
                href="https://www.tiktok.com/@cocolily.ae"
                className="social-hover-animate -top-100d left-115d rotate-[11.85deg] z-20"
                target="_blank"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6002 5.82C15.9167 5.03953 15.5401 4.0374 15.5402 3H12.4502V15.4C12.4268 16.0712 12.1437 16.7071 11.6605 17.1735C11.1773 17.6399 10.5318 17.9004 9.86016 17.9C8.44016 17.9 7.26016 16.74 7.26016 15.3C7.26016 13.58 8.92016 12.29 10.6302 12.82V9.66C7.18016 9.2 4.16016 11.88 4.16016 15.3C4.16016 18.63 6.92016 21 9.85016 21C12.9902 21 15.5402 18.45 15.5402 15.3V9.01C16.7932 9.90985 18.2975 10.3926 19.8402 10.39V7.3C19.8402 7.3 17.9602 7.39 16.6002 5.82Z"
                    fill="#DB0032"
                  />
                </svg>
              </SocialBubble>
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
  );
};

export default Footer;
