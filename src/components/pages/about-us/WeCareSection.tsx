"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import GradientImage from "@/components/ui/GradientImage";

gsap.registerPlugin(ScrollTrigger);

export default function WeCareSection() {
  useGSAP(() => {
    gsap.set(".text-anim-head", {
      clipPath: "inset(0% 0% 100% 0%)",
      yPercent: 100,
    });
    gsap.set(".text-anim-desc-1", {
      clipPath: "inset(0% 0% 100% 0%)",
      yPercent: 100,
    });
    gsap.set(".text-anim-desc-2", {
      clipPath: "inset(0% 0% 100% 0%)",
      yPercent: 100,
    });
    gsap.set(".text-anim-desc-3", {
      clipPath: "inset(0% 0% 100% 0%)",
      yPercent: 100,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".container-we-care-section",
          start: "50% 95%",
          end: "95% 95%",
          scrub: 1,
          // markers: true,
        },
      })
      .to(".text-anim-head", {
        clipPath: "inset(0% 0% 0% 0%)",
        yPercent: 0,
      })
      .to(".text-anim-desc-1", {
        clipPath: "inset(0% 0% 0% 0%)",
        yPercent: 0,
        stagger: 0.1,
      });

    // section 3
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".container-we-care-section",
        start: "top top",
        end: "bottom+=2000",
        scrub: 1,
        pin: true,
        // markers: true,
      },
    });

    tl.to(".text-anim-desc-2", {
      clipPath: "inset(0% 0% 0% 0%)",
      yPercent: 0,
      stagger: 0.1,
    });

    tl.to(
      ".image-1",
      {
        top: "-40%",
      },
      "<"
    );
    tl.to(
      ".image-2",
      {
        top: "-5%",
      },
      "<"
    );
    tl.to(
      ".image-3",
      {
        top: "25%",
      },
      "<"
    );
    tl.to(
      ".image-4",
      {
        top: "80%",
      },
      "<"
    );

    tl.to(
      ".container-desc-we-care",
      {
        y: "20%",
      },
      "<"
    );

    // section 4
    tl.to(".text-anim-desc-3", {
      clipPath: "inset(0% 0% 0% 0%)",
      yPercent: 0,
      stagger: 0.1,
    });

    tl.to(
      ".container-desc-we-care",
      {
        y: "6%",
      },
      "<"
    );

    tl.to(
      ".image-2",
      {
        top: "-40%",
      },
      "<"
    );

    tl.to(
      ".image-3",
      {
        top: "-20%",
      },
      "<"
    );

    tl.to(
      ".image-4",
      {
        top: "25%",
      },
      "<"
    );

    tl.to(
      ".image-5",
      {
        top: "50%",
      },
      "<"
    );

    // section 5
    tl.to(".container-desc-we-care", {
      y: "0%",
    });

    tl.to(
      ".image-3",
      {
        top: "-60%",
      },
      "<"
    );

    tl.to(
      ".image-4",
      {
        top: "-8%",
      },
      "<"
    );

    tl.to(
      ".image-5",
      {
        top: "15%",
      },
      "<"
    );

    tl.to(
      ".image-6",
      {
        top: "75%",
      },
      "<"
    );

    // section 6
    tl.to(".container-desc-we-care", {
      y: "-4%",
    });

    tl.to(
      ".image-4",
      {
        top: "-40%",
      },
      "<"
    );

    tl.to(
      ".image-5",
      {
        top: "-20%",
      },
      "<"
    );

    tl.to(
      ".image-6",
      {
        top: "35%",
      },
      "<"
    );

    tl.to(
      ".image-7",
      {
        top: "60%",
      },
      "<"
    );
  }, []);

  return (
    <div className="bg-[#E0C7E6] overflow-hidden">
      <div className="relative w-full h-[40vh] z-10 bg-gradient-to-b from-ruby-red"></div>
      <div className="w-full h-screen bg-[#E0C7E6] relative text-ruby-red container-we-care-section">
        <div className="absolute top-0 z-0 pointer-events-none w-full h-full">
          <div className="w-217d h-271d absolute top-[8%] rounded-32d bg-white left-[2%] image-1">
            <GradientImage src="/we-care-section/Image-01.png" />
          </div>
          <div className="w-217d h-271d absolute top-[30%] rounded-32d bg-white right-[2%] image-2">
            <GradientImage src="/we-care-section/Image-02.png" />
          </div>
          <div className="w-217d h-271d absolute top-[75%] rounded-32d bg-white left-[18%] image-3">
            <GradientImage src="/we-care-section/Image-03.png" />
          </div>
          <div className="w-217d h-271d absolute top-[150%] rounded-32d bg-white left-[6%] image-4">
            <GradientImage src="/we-care-section/Image-04.png" />
          </div>
          <div className="w-217d h-271d absolute top-[150%] rounded-32d bg-white right-[8%] image-5">
            <GradientImage src="/we-care-section/Image-05.png" />
          </div>
          <div className="w-217d h-271d absolute top-[150%] rounded-32d bg-white left-[2%] image-6">
            <GradientImage src="/we-care-section/Image-06.png" />
          </div>
          <div className="w-217d h-271d absolute top-[150%] rounded-32d bg-white right-[2%] image-7">
            <GradientImage src="/we-care-section/Image-07.png" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full h-full gap-80d z-10 relative translate-y-[40%] container-desc-we-care">
          <p className="uppercase text-anim-head">WHAT DO We CARE ABOUT?</p>
          <div className="text-center">
            <h3 className="tracking-tight text-64d font-span text-anim-desc-1 pb-2 -mb-2">
              <span className="italic">Creating</span>
              <span className="font-bold"> memorable</span>
            </h3>
            <h3 className="tracking-tight text-64d font-span text-anim-desc-1 pb-2 -mb-2">
              chocolate-centered
            </h3>
            <h3 className="tracking-tight text-64d font-span text-anim-desc-2 pb-2 -mb-2">
              <span className="font-bold">experiences,</span>{" "}
              <span className="italic">and</span>{" "}
              <span className="font-bold">taking</span> you
            </h3>
            <h3 className="tracking-tight text-64d font-span text-anim-desc-2 pb-2 -mb-2">
              on a <span className="font-bold">journey</span> where{" "}
              <span className="italic">you</span>{" "}
              <span className="font-bold">can</span>
            </h3>
            <h3 className="tracking-tight text-64d font-span text-anim-desc-3 pb-2 -mb-2">
              <span className="italic">indulge</span> in a{" "}
              <span className="font-bold">different</span> journey
            </h3>
            <h3 className="tracking-tight text-64d font-span text-anim-desc-3 pb-2 -mb-2">
              every <span className="italic">time.</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
