"use client";

import Maroon from "@/components/icons/Maroon";
import Button from "@/components/ui/button";
import GradientImage from "@/components/ui/GradientImage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurMission() {
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
        gsap.set(
          [
            ".text-anim-at-cocolily",
            ".text-anim-at-cocolily-01",
            ".chocolate-at-cocolily",
            ".maroon-at-cocolily",
            ".icon-at-cocolily-02",
          ],
          {
            clipPath: "inset(0% 0% 100% 0%)",
            yPercent: 100,
            marginBottom: "-16px",
            paddingBottom: "16px",
          }
        );

        // section 0
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".container-at-cocolily",
            start: "30% 95%",
            end: "95% 95%",
            scrub: 1,
            // pin: true,
            // markers: true,
          },
        });

        tl.to(".text-anim-at-cocolily", {
          clipPath: "inset(0% 0% 0% 0%)",
          yPercent: 0,
          ease: "power1.inOut",
          stagger: 0.1,
        });
        tl.to(".maroon-at-cocolily", {
          clipPath: "inset(0% 0% 0% 0%)",
          yPercent: 0,
          ease: "power1.inOut",
        });

        // section 1
        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: ".container-at-cocolily",
            start: "top top",
            end: "bottom+=3000",
            scrub: 1,
            pin: true,
            // markers: true,
          },
        });

        // section 1
        tl1.to(".text-anim-at-cocolily-than", {
          x: "-16%",
          ease: "power1.inOut",
        });
        tl1.to(
          ".text-anim-at-cocolily-we",
          { x: "70%", ease: "power1.inOut" },
          "<"
        );
        tl1.to(
          ".chocolate-at-cocolily",
          { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0, ease: "power1.inOut" },
          "<"
        );

        // section 2
        tl1.to(".text-anim-at-cocolily", {
          clipPath: "inset(100% 0% 0% 0%)",
          yPercent: -100,
          ease: "power1.inOut",
          stagger: 0.1,
        });
        tl1.to(
          ".text-anim-at-cocolily-01",
          {
            clipPath: "inset(0% 0% 0% 0%)",
            yPercent: 0,
            ease: "power1.inOut",
            stagger: 0.1,
            color: "#DB0032",
          },
          "-=0.4"
        );
        tl1.to(
          ".container-at-cocolily",
          {
            backgroundColor: "#F9EFED",
            yPercent: 0,
            ease: "power1.inOut",
            stagger: 0.1,
          },
          "<"
        );
        tl1.to(
          ".maroon-icon",
          {
            fill: "#DB0032",
            ease: "power1.inOut",
          },
          "<"
        );
        tl1.to(
          ".container-chocolate-at-cocolily",
          {
            top: "27%",
            ease: "power1.inOut",
          },
          "<"
        );

        // section 3
        tl1.to(".text-anim-at-cocolily-is-to-celebrate", {
          x: "-15%",
          ease: "power1.inOut",
        });
        tl1.to(
          ".text-anim-at-cocolily-sweetness",
          {
            x: "20%",
            ease: "power1.inOut",
          },
          "<"
        );
        tl1.to(
          ".icon-at-cocolily-02",
          {
            clipPath: "inset(0% 0% 0% 0%)",
            yPercent: 0,
            ease: "power1.inOut",
          },
          "<"
        );

        // section 4
        tl1.to(".container-chocolate-box-at-cocolily", {
          bottom: "53%",
          ease: "power1.inOut",
        });
        tl1.to(
          ".container-chocolate-at-cocolily",
          {
            top: "40%",
            ease: "power1.inOut",
          },
          "<"
        );

        // section 5
        tl1.to(".container-chocolate-box-at-cocolily", {
          bottom: "60%",
          ease: "power1.inOut",
        });
        tl1.to(
          ".container-chocolate-at-cocolily",
          {
            right: "31.2%",
            rotate: 15,
            scale: 0.5,
            top: "59.2%",
            ease: "power1.inOut",
          },
          "<"
        );
        tl1.to(
          ".shadow-chocolate",
          {
            autoAlpha: 0,
            ease: "power1.inOut",
          },
          "<"
        );
        tl1.to(
          ".container-chocolate-box-top-at-cocolily",
          {
            top: "34%",
            ease: "power1.inOut",
          },
          "<"
        );

        // section 6
        tl1.to(".container-chocolate-bottom", {
          top: "-10.6601%",
          ease: "power1.inOut",
        });
        tl1.to(
          ".container-chocolate-box-top-at-cocolily",
          {
            top: "63.5436%",
            ease: "power1.inOut",
          },
          "<"
        );
      }
    );
  }, []);

  return (
    <>
      <div className="w-full h-screen font-span bg-ruby-red container-at-cocolily overflow-hidden">
        <div className="w-full h-1080d absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="absolute z-20 w-544d h-370d -translate-y-full top-[0%] right-[29%] container-chocolate-box-top-at-cocolily">
            <div className="w-full h-full chocolate-box-top-at-cocolily">
              <GradientImage
                src="/images/our-mission/Chocolate-box-top.png"
                fitVariant="contain"
              />
            </div>
          </div>
          <div className="absolute w-full z-10 h-full container-chocolate-bottom">
            <div className="absolute z-20 w-165d h-111d -translate-y-1/2 top-[51%] right-[29%] container-chocolate-at-cocolily">
              <div className="w-full h-full chocolate-at-cocolily relative">
                <div className="w-full h-full absolute top-0 z-10">
                  <GradientImage
                    src="/images/our-mission/Chocolate.png"
                    fitVariant="contain"
                  />
                </div>
                <div className="w-full h-full absolute bottom-[-32%] left-[9%] scale-[0.8] shadow-chocolate">
                  <GradientImage
                    src="/images/our-mission/Chocolate-shadow.png"
                    fitVariant="contain"
                  />
                </div>
              </div>
            </div>
            <div className="absolute z-10 w-544d h-370d translate-y-full bottom-[0%] right-[29%] container-chocolate-box-at-cocolily">
              <div className="w-full h-full chocolate-box-at-cocolily">
                <GradientImage
                  src="/images/our-mission/Chocolate-box.png"
                  fitVariant="contain"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full text-center">
          <div className="absolute w-full top-[15vh] left-1/2 -translate-x-1/2">
            <p className="font-abc uppercase text-seashell font-light text-anim-at-cocolily">
              at cocolily
            </p>
            <p className="font-abc uppercase text-seashell font-light absolute top-0 left-1/2 -translate-x-1/2 text-anim-at-cocolily-01">
              our mission
            </p>
          </div>
          <div className="absolute w-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <div className="text-seashell font-light w-full">
              <h2 className="text-anim-at-cocolily">
                We create <span className="italic">more</span>
              </h2>
              <h2 className="text-anim-at-cocolily">
                <span className="inline-block text-anim-at-cocolily-than">
                  than <span className="font-semibold">chocolate</span>,
                </span>
                <span className="inline-block text-anim-at-cocolily-we">
                  {" "}
                  we
                </span>
              </h2>
              <h2 className="text-anim-at-cocolily">
                <span className="italic">craft </span>
                <span className="font-semibold">experiences.</span>
              </h2>
            </div>
            <div className="text-seashell font-light w-full absolute top-0 left-1/2 -translate-x-1/2">
              <div className="relative">
                <h2 className="text-anim-at-cocolily-01">
                  <span className="text-anim-at-cocolily-is-to-celebrate inline-block">
                    Is to <span className="italic">celebrate</span>
                  </span>
                  <span className="text-anim-at-cocolily-sweetness inline-block font-semibold">
                    sweetness
                  </span>
                </h2>
                <div className="absolute w-100d h-74d top-[23%] scale-125 right-[43%] icon-at-cocolily-02">
                  <GradientImage
                    src="/images/our-mission/icon-sweetness.svg"
                    fitVariant="contain"
                  />
                </div>
              </div>
              <div className="relative">
                <div className="absolute w-100d h-74d top-[23%] scale-125 right-[48.5%] icon-at-cocolily-02">
                  <GradientImage
                    src="/images/our-mission/icon-joy.svg"
                    fitVariant="contain"
                  />
                </div>
                <h2 className="text-anim-at-cocolily-01">
                  <span className="inline-block text-anim-at-cocolily-is-to-celebrate">
                    and <span className="italic">bring </span>
                  </span>{" "}
                  <span className="inline-block text-anim-at-cocolily-sweetness">
                    <span className="font-semibold">joy</span> through
                  </span>
                </h2>
              </div>
              <div className="relative">
                <div className="absolute w-100d h-74d top-[23%] scale-125 right-[33%] icon-at-cocolily-02">
                  <GradientImage
                    src="/images/our-mission/icon-bite.svg"
                    fitVariant="contain"
                  />
                </div>
                <h2 className="text-anim-at-cocolily-01">
                  <span className="inline-block text-anim-at-cocolily-is-to-celebrate">
                    every <span className="font-semibold">chocolate </span>
                  </span>{" "}
                  <span className="inline-block text-anim-at-cocolily-sweetness">
                    bite.
                  </span>
                </h2>
              </div>
            </div>
          </div>
          <div className="absolute bottom-[19vh] left-1/2 -translate-x-1/2">
            <div className="text-anim-at-cocolily-01 py-12d">
              <Button
                buttonType="link"
                href="/"
                isHoverTranslate
                className="w-max uppercase font-sans"
              >
                more about us
              </Button>
            </div>
          </div>
          <div className="absolute bottom-[8vh] left-1/2 -translate-x-1/2 maroon-at-cocolily">
            <Maroon />
          </div>
        </div>
      </div>
    </>
  );
}
