import useSplitTextAnimation from "@/app/hooks/useSplitTextAnimation";
import Maroon from "@/components/icons/Maroon";
import GradientImage from "@/components/ui/GradientImage";
import { useGSAP } from "@gsap/react";
import React from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import useRevealAnimation from "@/app/hooks/useRevealAnimation";

gsap.registerPlugin(ScrollTrigger);

const EventDetailHighlight = () => {
  useSplitTextAnimation({
    selector: ".event-detail-highlight-anim-text",
    // markers: true,
  });

  // section 2
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".container-event-detail-highlight",
        start: "top bottom",
        end: "90% bottom",
        scrub: 1,
        // pin: true,
        // markers: true,
      },
    });

    tl.to(".content-images-event-detail-highlight", {
      ease: "power1.inOut",
      y: "0%",
    });

    // image 1
    tl.to(
      ".image-event-detail-highlight-1",
      {
        rotate: "-20deg",
        left: "0%",
        ease: "power1.inOut",
        x: "30%",
      },
      "<"
    );

    // image 2
    tl.to(
      ".image-event-detail-highlight-2",
      {
        rotate: "-10deg",
        left: "0%",
        ease: "power1.inOut",
        x: "12%",
      },
      "<"
    );

    // image 4
    tl.to(
      ".image-event-detail-highlight-4",
      {
        rotate: "10deg",
        right: "0%",
        ease: "power1.inOut",
        x: "-12%",
      },
      "<"
    );

    // image 5
    tl.to(
      ".image-event-detail-highlight-5",
      {
        rotate: "20deg",
        right: "0%",
        ease: "power1.inOut",
        x: "-33%",
      },
      "<"
    );

    // section 3
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".container-event-detail-highlight",
        start: "top top",
        end: "bottom+=1500",
        scrub: 1,
        pin: true,
        // markers: true,
      },
    });

    // image 1
    tl2.to(".image-event-detail-highlight-1", {
      rotate: "0deg",
      left: "0%",
      ease: "power1.inOut",
      x: "0%",
      y: "0%",
    });

    // image 2
    tl2.to(
      ".image-event-detail-highlight-2",
      {
        rotate: "0deg",
        left: "0%",
        ease: "power1.inOut",
        x: "0%",
        y: "0%",
      },
      "<"
    );

    // // image 4
    tl2.to(
      ".image-event-detail-highlight-4",
      {
        rotate: "0deg",
        right: "0%",
        ease: "power1.inOut",
        x: "0%",
        y: "0%",
      },
      "<"
    );

    // // image 5
    tl2.to(
      ".image-event-detail-highlight-5",
      {
        rotate: "0deg",
        right: "0%",
        ease: "power1.inOut",
        x: "0%",
        y: "0%",
      },
      "<"
    );

    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".container-2-event-detail-highlight",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
        // pin: true,
        // markers: true,
      },
    });

    tl3.to(".content-images-event-detail-highlight", {
      ease: "power1.inOut",
      x: "-15%",
    });
  }, []);

  return (
    <>
      {" "}
      <div className="text-ruby-red w-full h-screen relative overflow-hidden container-event-detail-highlight">
        <p className="uppercase mb-20d text-10d px-20d event-detail-highlight-anim-text mt-[5vh]">
          CocoLILY COUNTRY CLUB
        </p>

        <div className="grid grid-cols-12 w-full gap-20d px-20d">
          <div className="col-span-4">
            <h4 className="font-bold font-abc uppercase w-[80%] event-detail-highlight-anim-text">
              A museum turned dessert destination
            </h4>
          </div>
          <div className="col-span-8">
            <p className="w-[48%] ml-auto text-12d event-detail-highlight-anim-text">
              We transformed the museum into a buzzing dessert hub with a Cocoa
              Bar, Self-Studio photobooth, and Merch-Bar. Over 25K guests joined
              - us for a trip down memory lane with a modern twist.
            </p>
          </div>
        </div>

        {/* images */}
        <div className="container-images-event-detail-highlight absolute w-full h-550d bottom-0">
          <div className="flex gap-20d items-center justify-center content-images-event-detail-highlight translate-y-[15%]">
            {/* 1 */}
            <div className="image-event-detail-highlight-1 w-415d h-550d rounded-32d overflow-hidden relative shrink-0 left-[46.84%] translate-x-[46.84%] translate-y-[60%]">
              {/* rotate-[-20deg] translate-x-[33%] translate-y-[60%] */}
              <GradientImage src="/images/event-details/1.png" />
            </div>
            {/* 1 */}

            {/* 2 */}
            <div className="image-event-detail-highlight-2 w-415d h-550d rounded-32d overflow-hidden relative shrink-0 left-[23.42%] translate-x-[23.42%] translate-y-[18%]">
              {/* rotate-[-10deg] translate-x-[12%] translate-y-[18%] */}
              <GradientImage src="/images/event-details/2.png" />
            </div>
            {/* 2 */}

            {/* 3 */}
            <div className="image-event-detail-highlight-3 w-415d h-550d rounded-32d overflow-hidden z-20 relative shrink-0">
              <GradientImage src="/images/event-details/3.png" />
            </div>
            {/* 3 */}

            {/* 4 */}
            <div className="image-event-detail-highlight-4 w-415d h-550d rounded-32d overflow-hidden relative shrink-0 right-[42.33%] translate-x-[42.33%] translate-y-[18%] z-10">
              {/* rotate-[10deg] -translate-x-[12%] translate-y-[18%] */}
              <GradientImage src="/images/event-details/4.png" />
            </div>
            {/* 4 */}

            {/* 5 */}
            <div className="image-event-detail-highlight-5 w-415d h-550d rounded-32d overflow-hidden relative shrink-0 right-[84.66%] translate-x-[84.66%] translate-y-[60%]">
              {/* rotate-[20deg] -translate-x-[33%] translate-y-[60%] */}
              <GradientImage src="/images/event-details/5.png" />
            </div>
            {/* 5 */}
          </div>
          <div className="w-full h-264d absolute bottom-0 z-30 bg-gradient-to-t from-ruby-red to-transparent"></div>
        </div>
        {/* images */}
      </div>
    </>
  );
};

export default EventDetailHighlight;
