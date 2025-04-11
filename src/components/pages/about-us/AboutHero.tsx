"use client";
import React from "react";
import Image from "next/image";
import { useRef, useEffect } from "react";

import clsx from "clsx";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";

const AboutHero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const scrollDownText = new SplitText(".text-scroll-down", {
      type: "lines",
    });

    const textTheCocolilyStore = new SplitText(".text-the-cocolily-store", {
      type: "lines",
    });

    gsap.to(".reveal-text", {
      transform: "translateY(0)",
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "power1.inOut",
      duration: 1,
      stagger: 0.1,
    });

    gsap.fromTo(
      textTheCocolilyStore.lines,
      { yPercent: 100, clipPath: "inset(0% 0% 100% 0%)" },
      {
        yPercent: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "power1.inOut",
        duration: 1,
        stagger: 0.1,
      }
    );

    gsap.set(".text-the-cocolily-store", {
      opacity: 1,
    });

    gsap.fromTo(
      ".chocolate-img-container",
      {
        yPercent: 100,
        clipPath: "inset(0% 0% 100% 0%)",
      },
      {
        yPercent: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "power1.inOut",
        duration: 1,
        delay: 1.5,
      }
    );

    gsap.fromTo(
      scrollDownText.lines,
      {
        yPercent: 100,
        clipPath: "inset(0% 0% 100% 0%)",
      },
      {
        yPercent: 0,
        ease: "power1.inOut",
        duration: 1,
        stagger: 0.1,
        delay: 1.5,
        clipPath: "inset(0% 0% 0% 0%)",
      }
    );

    gsap.set(".text-scroll-down", {
      opacity: 1,
    });
  }, [containerRef]);
  useGSAP(() => {
    const parent = containerRef.current;
    const sticky = stickyRef.current;

    const parentHeight = parent!.offsetHeight;
    const stickyHeight = sticky!.offsetHeight;
    const endValue = parentHeight - stickyHeight;

    gsap.to(sticky, {
      y: endValue - 90,
      ease: "none",
      scrollTrigger: {
        trigger: parent,
        start: "top top",
        end: () => `+=${endValue}`,
        scrub: true,
        pin: false,
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: "top top",
        end: () => `+=${endValue}`,
        scrub: true,
        pin: false,
      },
    });

    tl.to(".chocolate-2", {
      ease: "none",
      top: "50%",
      duration: 3,
    })
      .to(".chocolate-1", {
        ease: "none",
        bottom: 0,
      })
      .to(".chocolate-1", {
        ease: "none",
        translateY: "160%",
      })
      .to(
        ".chocolate-2",
        {
          ease: "none",
          top: "65%",
        },
        "<"
      )
      .from(".svg-coconut-tree", {
        clipPath: "inset(0% 0% 100% 0%)",
        yPercent: 100,
      });
  }, []);

  return (
    <section
      className="w-full md:landscape:h-1605d  bg-ivory-blush  font-bold text-ruby-red relative overflow-hidden"
      ref={containerRef}
    >
      <div
        className={clsx(
          "md:landscape:pt-115d md:landscape:w-489d md:landscape:pl-20d font-abc font-bold text-16d uppercase flex justify-between"
        )}
      >
        <div
          className="reveal-text translate-y-full"
          style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        >
          ABOUT US
        </div>
        <div
          className={clsx(" leading-none opacity-0", "text-the-cocolily-store")}
        >
          THE COCOLILY <br />
          STORY
        </div>
      </div>

      <div className="md:landscape:w-1115d md:landscape:mt-110d mx-auto font-span md:landscape:text-64d leading-none text-center">
        <div
          className="reveal-text translate-y-full"
          style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        >
          Cocolily <span className="font-light">is a homegrown Emirati</span>{" "}
          owned
        </div>
        <div
          className="reveal-text translate-y-full"
          style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        >
          <span className="font-light">business that</span> started{" "}
          <span className="font-light">with a simple </span>
        </div>
        <div
          className="reveal-text translate-y-full"
          style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        >
          Chocolate Bonbon <span className="font-light">in 2021.</span>
        </div>
      </div>

      <div className="w-full flex justify-center md:mt-319d relative z-10">
        <div
          className={clsx(
            "text-center font-sans  md:landscape:text-10d opacity-0",
            "text-scroll-down"
          )}
        >
          SCROLL DOWN
          <br />
          FOR MORE
        </div>
      </div>

      <div className="w-full text-center text-64d text-white font-span md:landscape:mt-200d relative z-10">
        <span className="font-light">Which, it</span> turns{" "}
        <span className="font-light">out, was never that simple.</span>
      </div>

      <div className="mx-auto mt-178d w-1066d flex justify-between  z-50 relative">
        <div className="svg-coconut-tree">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M59.9998 56.76L32.1358 28.8C33.3015 27.6332 34.6858 26.7075 36.2095 26.0759C37.7332 25.4443 39.3664 25.1192 41.0158 25.1192C42.6652 25.1192 44.2984 25.4443 45.8221 26.0759C47.3458 26.7075 48.7301 27.6332 49.8958 28.8C54.8398 33.792 62.3998 54.432 59.9998 56.76Z"
              fill="white"
            />
            <path
              d="M59.9998 56.76L87.8878 28.8C85.5294 26.4419 82.3309 25.1172 78.9958 25.1172C75.6607 25.1172 72.4622 26.4419 70.1038 28.8C65.1598 33.792 57.5998 54.432 59.9998 56.76Z"
              fill="white"
            />
            <path
              d="M59.9998 56.76L32.136 84.6477C30.9655 83.4816 30.0368 82.0958 29.4031 80.5699C28.7694 79.044 28.4432 77.408 28.4432 75.7557C28.4432 74.1035 28.7694 72.4675 29.4031 70.9416C30.0368 69.4157 30.9655 68.0299 32.136 66.8637C37.032 61.9197 57.5998 54.432 59.9998 56.76Z"
              fill="white"
            />
            <path
              d="M59.9998 56.76L87.8638 84.6477C89.0343 83.4816 89.963 82.0958 90.5967 80.5699C91.2304 79.044 91.5566 77.408 91.5566 75.7557C91.5566 74.1035 91.2304 72.4675 90.5967 70.9416C89.963 69.4157 89.0343 68.0299 87.8638 66.8637C82.9678 61.9197 62.3998 54.432 59.9998 56.76Z"
              fill="white"
            />
            <path
              d="M59.9998 56.76H99.4078C99.4142 53.4288 98.0986 50.2312 95.7499 47.8689C93.4011 45.5066 90.211 44.1727 86.8798 44.16C79.8958 44.16 59.9998 53.472 59.9998 56.76Z"
              fill="white"
            />
            <path
              d="M59.9998 56.76H20.5918C20.5854 53.4288 21.901 50.2312 24.2498 47.8689C26.5986 45.5066 29.7886 44.1727 33.1198 44.16C40.1038 44.16 59.9998 53.472 59.9998 56.76Z"
              fill="white"
            />
            <path
              d="M59.9518 51.96L52.2478 94.8H67.7518L59.9518 51.96Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="svg-coconut-tree">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M59.9998 56.76L32.1358 28.8C33.3015 27.6332 34.6858 26.7075 36.2095 26.0759C37.7332 25.4443 39.3664 25.1192 41.0158 25.1192C42.6652 25.1192 44.2984 25.4443 45.8221 26.0759C47.3458 26.7075 48.7301 27.6332 49.8958 28.8C54.8398 33.792 62.3998 54.432 59.9998 56.76Z"
              fill="white"
            />
            <path
              d="M59.9998 56.76L87.8878 28.8C85.5294 26.4419 82.3309 25.1172 78.9958 25.1172C75.6607 25.1172 72.4622 26.4419 70.1038 28.8C65.1598 33.792 57.5998 54.432 59.9998 56.76Z"
              fill="white"
            />
            <path
              d="M59.9998 56.76L32.136 84.6477C30.9655 83.4816 30.0368 82.0958 29.4031 80.5699C28.7694 79.044 28.4432 77.408 28.4432 75.7557C28.4432 74.1035 28.7694 72.4675 29.4031 70.9416C30.0368 69.4157 30.9655 68.0299 32.136 66.8637C37.032 61.9197 57.5998 54.432 59.9998 56.76Z"
              fill="white"
            />
            <path
              d="M59.9998 56.76L87.8638 84.6477C89.0343 83.4816 89.963 82.0958 90.5967 80.5699C91.2304 79.044 91.5566 77.408 91.5566 75.7557C91.5566 74.1035 91.2304 72.4675 90.5967 70.9416C89.963 69.4157 89.0343 68.0299 87.8638 66.8637C82.9678 61.9197 62.3998 54.432 59.9998 56.76Z"
              fill="white"
            />
            <path
              d="M59.9998 56.76H99.4078C99.4142 53.4288 98.0986 50.2312 95.7499 47.8689C93.4011 45.5066 90.211 44.1727 86.8798 44.16C79.8958 44.16 59.9998 53.472 59.9998 56.76Z"
              fill="white"
            />
            <path
              d="M59.9998 56.76H20.5918C20.5854 53.4288 21.901 50.2312 24.2498 47.8689C26.5986 45.5066 29.7886 44.1727 33.1198 44.16C40.1038 44.16 59.9998 53.472 59.9998 56.76Z"
              fill="white"
            />
            <path
              d="M59.9518 51.96L52.2478 94.8H67.7518L59.9518 51.96Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-0 w-full">
        <div className="w-full h-254d bg-gradient-to-b from-transparent to-ruby-red"></div>
        <div className="w-full h-532d bg-ruby-red"></div>
      </div>

      <div
        className="w-full h-screen  absolute top-0 left-0 z-50"
        ref={stickyRef}
      >
        <div className="w-full h-full relative">
          <div className="">
            <div
              className={clsx(
                "absolute top-550d -translate-y-1/2 left-1/2 -translate-x-1/2 z-30",
                "chocolate-1"
              )}
            >
              <div
                className="md:landscape:w-356d md:landscape:h-356d relative chocolate-img-container"
                style={{
                  clipPath: "inset(0% 0% 100% 0%)",
                }}
              >
                <Image
                  src={"/about-us/chocolate-1.png"}
                  alt="chocolate-1"
                  fill={true}
                />
              </div>
            </div>

            <div
              className={clsx(
                "absolute top-550d -translate-y-1/2 left-1/2 -translate-x-1/2 z-20",
                "chocolate-2"
              )}
            >
              <div
                className="md:landscape:w-356d md:landscape:h-356d relative chocolate-img-container"
                style={{
                  clipPath: "inset(0% 0% 100% 0%)",
                }}
              >
                <Image
                  src={"/about-us/chocolate-2.png"}
                  alt="chocolate-2"
                  fill={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
