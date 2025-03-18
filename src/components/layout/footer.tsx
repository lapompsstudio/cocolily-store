"use client";

import React, { useRef } from "react";
import Button from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useSplitTextAnimation from "@/app/hooks/useSplitTextAnimation";

gsap.registerPlugin(useGSAP);

const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useSplitTextAnimation({
    selector: ".footer-text-anim",
    startMd: "top 90%",
  });

  useGSAP(
    () => {
      const revealBottom = gsap.utils.toArray(".reveal-bottom");
      const scale = 1.2;
      const duration = 0.1;

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

      revealBottom.forEach(() => {
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
      });

      tl.from(".reveal-1", {
        opacity: 0,
        duration: duration,
        scale: scale,
      })
        .from(
          ".reveal-2",
          {
            opacity: 0,
            duration: duration,
            scale: scale,
          },
          "+=0.2"
        )
        .from(
          ".reveal-3",
          {
            opacity: 0,
            duration: duration,
            scale: scale,
          },
          "+=0.2"
        )
        .from(
          ".reveal-4",
          {
            opacity: 0,
            duration: duration,
            scale: scale,
          },
          "+=0.2"
        )
        .from(
          ".reveal-5",
          {
            opacity: 0,
            duration: duration,
            scale: scale,
          },
          "+=0.2"
        )
        .from(
          ".reveal-6",
          {
            opacity: 0,
            duration: duration,
            scale: scale,
          },
          "+=0.2"
        )
        .from(
          ".reveal-7",
          {
            opacity: 0,
            duration: duration,
            scale: scale,
          },
          "+=0.2"
        );
    },
    { scope: containerRef }
  );
  return (
    <footer
      ref={containerRef}
      className="footer min-h-screen relative flex w-full items-end p-20d bg-seashell overflow-hidden"
    >
      <div className="bg-gradient-to-b from-pale-sky-blue to-pale-sky-blue/0 absolute top-0 left-0 right-0 h-264d"></div>
      <div className="w-full">
        <div>
          <h2 className="footer-text-anim text-128d font-bold font-abc text-center text-ruby-red leading-none">
            JOIN THE CELEBRATION
          </h2>
          <p className="footer-text-anim text-ruby-red font-bold text-16d text-center mt-32d">
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
                className="bg-transparent border border-ruby-red rounded-full h-38d w-full px-22d placeholder:text-ruby-red placeholder:font-semibold text-ruby-red font-semibold text-12d"
                placeholder="SUBMIT YOUR EMAIL"
              />
              <Button
                buttonType="button"
                onClick={(e) => console.log("e", e)}
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
              className="h-72d text-16d"
            >
              EMAIL: HELLO@COCOLILY.AE
            </Button>
          </div>
          <div className="md:col-span-6">
            <Button
              buttonType="link"
              href="tel:+971504181411"
              variant="secondary"
              className="h-72d text-16d"
            >
              PHONE NUMBER: (+971) 50 418 1411
            </Button>
          </div>
        </div>
      </div>

      <Image
        src="/footer/ornament1.png"
        width={200}
        height={200}
        className="ornament reveal-7 absolute left-[7%] bottom-[34%]"
        alt="ornament"
      />
      <Image
        src="/footer/ornament2.png"
        width={200}
        height={200}
        className="ornament reveal-4 absolute left-[18%] bottom-[58%]"
        alt="ornament"
      />
      <Image
        src="/footer/ornament3.png"
        width={200}
        height={200}
        className="ornament reveal-3 absolute left-[29%] bottom-[22%]"
        alt="ornament"
      />
      <Image
        src="/footer/ornament4.png"
        width={200}
        height={200}
        className="ornament reveal-6 absolute left-[40.5%] bottom-[70%]"
        alt="ornament"
      />
      <Image
        src="/footer/ornament5.png"
        width={200}
        height={200}
        className="ornament reveal-1 absolute left-[54%] bottom-[45.5%]"
        alt="ornament"
      />
      <Image
        src="/footer/ornament6.png"
        width={200}
        height={200}
        className="ornament reveal-2 absolute left-[70%] bottom-[60%]"
        alt="ornament"
      />
      <Image
        src="/footer/ornament7.png"
        width={200}
        height={200}
        className="ornament reveal-5 absolute left-[81%] bottom-[33%]"
        alt="ornament"
      />
    </footer>
  );
};

export default Footer;
