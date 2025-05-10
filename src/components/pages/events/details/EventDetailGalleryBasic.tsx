import GradientImage from "@/components/ui/GradientImage";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperType from "swiper";

import "swiper/css";
import "swiper/css/autoplay";

gsap.registerPlugin(ScrollTrigger);

export default function EventDetailGallery() {
  const container = useRef<HTMLDivElement>(null);
  // Create a ref to store the Swiper instance
  const swiperRef = useRef<SwiperType | null>(null);

  useGSAP(
    () => {
      // Create a timeline for the initial scattered appearance
      const tlScattered = gsap.timeline({
        scrollTrigger: {
          trigger: ".container-event-detail-gallery",
          start: "30% bottom",
          end: "bottom bottom",
          // Removed scrub: 1
          // markers: true,
          // Add onEnter to trigger the animation when element enters viewport
          onEnter: () => tlScattered.play(),
        },
        paused: true, // Start paused so onEnter can play it
      });

      // Initial state - scaled and opacity 0
      tlScattered.fromTo(
        ".container-images-event-details",
        { scale: 1.5, opacity: 0, y: "10%" },
        {
          scale: 1,
          opacity: 1,
          y: "0%",
          ease: "power1.out",
          duration: 0.8,
        }
      );

      // Scattered positions for all images at once
      tlScattered.to(
        ".container-image-event-detail-1",
        {
          ease: "power1.out",
          left: "10%",
          x: "10%",
          rotate: "-15deg",
          duration: 0.6,
        },
        "<"
      );
      tlScattered.to(
        ".container-image-event-detail-2",
        {
          ease: "power1.out",
          left: "1%",
          x: "1%",
          rotate: "15deg",
          duration: 0.6,
        },
        "<"
      );
      tlScattered.to(
        ".container-image-event-detail-3",
        {
          ease: "power1.out",
          left: "-3.3%",
          x: "-3.3%",
          rotate: "-5.23deg",
          duration: 0.6,
        },
        "<"
      );
      tlScattered.to(
        ".container-image-event-detail-4",
        {
          ease: "power1.out",
          right: "20%",
          x: "20%",
          rotate: "11.08deg",
          duration: 0.6,
        },
        "<"
      );
      tlScattered.to(
        ".container-image-event-detail-5",
        {
          ease: "power1.out",
          right: "35%",
          x: "35%",
          rotate: "30deg",
          duration: 0.6,
        },
        "<"
      );

      // Create a second timeline for the aligned positions
      const tlAligned = gsap.timeline({
        scrollTrigger: {
          trigger: ".container-event-detail-gallery",
          start: "60% center", // Adjust this to when you want the alignment to happen
          // markers: true,
          onEnter: () => tlAligned.play(),
        },
        paused: true,
      });

      // Aligned positions for all images
      tlAligned.to(".container-image-event-detail-1", {
        ease: "power1.inOut",
        left: "0%",
        x: "0%",
        rotate: "0deg",
        y: "29%",
        duration: 0.8,
      });

      tlAligned.to(
        ".container-image-event-detail-2",
        {
          ease: "power1.inOut",
          left: "0%",
          x: "-15%",
          rotate: "0deg",
          duration: 0.8,
        },
        "<"
      );
      tlAligned.to(
        ".content-image-event-detail-2",
        {
          width: "100%",
          height: "441px",
          duration: 0.8,
        },
        "<"
      );

      tlAligned.to(
        ".container-image-event-detail-3",
        {
          ease: "power1.inOut",
          left: "0%",
          x: "0%",
          rotate: "0deg",
          y: "10%",
          duration: 0.8,
        },
        "<"
      );

      tlAligned.to(
        ".container-image-event-detail-4",
        {
          ease: "power1.inOut",
          right: "0%",
          x: "-15%",
          rotate: "0deg",
          duration: 0.8,
        },
        "<"
      );
      tlAligned.to(
        ".content-image-event-detail-4",
        {
          width: "100%",
          height: "441px",
          duration: 0.8,
        },
        "<"
      );

      tlAligned.to(
        ".container-image-event-detail-5",
        {
          ease: "power1.inOut",
          right: "0%",
          x: "0%",
          rotate: "0deg",
          y: "10%",
          duration: 0.8,
        },
        "<"
      );

      // Text animation
      tlAligned.to(
        ".text-anim-image",
        {
          ease: "power1.inOut",
          opacity: 1,
          y: "0%",
          duration: 0.6,
          onComplete: () => {
            // Code to execute when the animation is complete
            console.log("Animation completed!");

            // Use the ref instead of querySelector
            if (swiperRef.current) {
              swiperRef.current.autoplay.start(); // Start autoplay using the ref
            }
          },
        },
        "<0.2" // Start slightly after the images begin to align
      );
    },
    { scope: container, dependencies: [] }
  );

  return (
    <div ref={container}>
      <div className="relative w-full h-screen text-ruby-red container-event-detail-gallery overflow-hidden">
        <div className="relative z-10 pt-[15vh]">
          <p className="font-abc uppercase px-20d">OUR GALLERY</p>
          <p className="font-abc uppercase absolute top-[15vh] left-1/2 -translate-x-1/2">
            COCOLILY COUNTRY CLUB's
          </p>
          <h2 className="font-span font-bold w-full text-center mt-20d">
            Sweet Memories
          </h2>
        </div>

        <Swiper
          className="w-full h-[60vh] !px-20d !overflow-visible container-images-event-details !absolute !bottom-0 opacity-0 translate-y-[10%] scale-150"
          // install Swiper modules
          slidesPerView={"auto"}
          loop
          autoplay={
            {
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
              enabled: false,
            } as any
          }
          speed={4000}
          modules={[Autoplay]}
          style={
            {
              "--swiper-wrapper-transition-timing-function": "linear",
            } as React.CSSProperties
          }
          onSwiper={(swiper) => {
            // Store swiper instance in the ref
            swiperRef.current = swiper;
          }}
        >
          {/* image 1 */}
          <SwiperSlide className="opacity-1 container-image-event-detail-1 !w-[325px] !h-[60vh] relative z-40 shrink-0 opacity-1 left-[38.4%] translate-x-[38.4%]">
            {/* posisi acak left-[10%] translate-x-[10%] rotate-[-15deg] */}
            {/* tampilan tengah left-[34.31%] translate-x-[34.31%] */}
            {/* tampilan end translate-y-[40%] */}
            <div className="relative space-y-12d w-full h-full">
              <div className="w-[216px] h-[294px] content-image-event-detail-1 relative rounded-32d overflow-hidden">
                <GradientImage src="/images/event-details/our-images/1.png" />
              </div>
              <p className="text-12d opacity-0 text-anim-image translate-y-full">
                TENNIS
              </p>
            </div>
          </SwiperSlide>
          {/* image 1 */}

          {/* image 2 */}
          <SwiperSlide className="opacity-1 container-image-event-detail-2 !w-[325px] !h-[60vh] relative z-30 shrink-0 opacity-1 left-[15.2%] translate-x-[15.2%]">
            {/* posisi acak left-[1%] translate-x-[1%] rotate-[15deg] */}
            {/* tampilan tengah left-[15.5%] translate-x-[15.5%] */}
            {/* space between translate-x-[-15%] */}
            <div className="relative space-y-12d w-full h-full">
              <div className="w-[216px] h-[294px] content-image-event-detail-2 relative rounded-32d overflow-hidden">
                <GradientImage src="/images/event-details/our-images/2.png" />
              </div>
              <p className="text-12d opacity-0 text-anim-image translate-y-full">
                TENNIS
              </p>
            </div>
          </SwiperSlide>
          {/* image 2 */}

          {/* image 3 */}
          <SwiperSlide className="opacity-1 container-image-event-detail-3 !w-[325px] !h-[60vh] relative z-20 shrink-0 opacity-1  left-[-8%] translate-x-[-8%]">
            {/* posisi acak left-[-3.3%] translate-x-[-3.3%] rotate-[-5.23deg] */}
            {/* tampilan tengah left-[-3.3%] translate-x-[-3.3%] */}
            {/* tampilan end translate-y-[10%] */}
            <div className="relative space-y-12d w-full h-full">
              <div className="w-[216px] h-[294px] content-image-event-detail-3 relative rounded-32d overflow-hidden">
                <GradientImage src="/images/event-details/our-images/3.png" />
              </div>
              <p className="text-12d opacity-0 text-anim-image translate-y-full">
                TENNIS
              </p>
            </div>
          </SwiperSlide>
          {/* image 3 */}

          {/* image 4 */}
          <SwiperSlide className="opacity-1 container-image-event-detail-4 !w-[325px] !h-[60vh] relative z-10 shrink-0 opacity-1 right-[31.2%] translate-x-[31.2%]">
            {/* posisi acak right-[20%] translate-x-[20%] rotate-[11.08deg] */}
            {/* tampilan right-[35.6%] translate-x-[35.6%] */}
            {/* space between translate-x-[-15%] */}
            <div className="relative space-y-12d w-full h-full">
              <div className="w-[216px] h-[294px] content-image-event-detail-4 relative rounded-32d overflow-hidden">
                <GradientImage src="/images/event-details/our-images/4.png" />
              </div>
              <p className="text-12d opacity-0 text-anim-image translate-y-full">
                TENNIS
              </p>
            </div>
          </SwiperSlide>
          {/* image 4 */}

          {/* image 5 */}
          <SwiperSlide className="opacity-1 container-image-event-detail-5 !w-[325px] !h-[60vh] relative z-0 shrink-0 opacity-1 right-[54.4%] translate-x-[54.4%]">
            {/* posisi acak right-[35%] translate-x-[35%] rotate-[30deg] */}
            {/* tampilan tengah right-[65.8%] translate-x-[65.8%] */}
            {/* tampilan end translate-y-[-10%] */}
            <div className="relative space-y-12d w-full h-full">
              <div className="w-[216px] h-[294px] content-image-event-detail-5 relative rounded-32d overflow-hidden">
                <GradientImage src="/images/event-details/our-images/5.png" />
              </div>
              <p className="text-12d opacity-0 text-anim-image translate-y-full">
                TENNIS
              </p>
            </div>
          </SwiperSlide>
          {/* image 5*/}

          {/* image 6 */}
          <SwiperSlide className="!w-[325px] !h-[60vh] relative z-40 shrink-0 opacity-1 translate-y-[29%] top-[29%]">
            {/* posisi acak left-[10%] translate-x-[10%] rotate-[-15deg] */}
            {/* tampilan tengah left-[34.31%] translate-x-[34.31%] */}
            {/* tampilan end translate-y-[29%] */}
            <div className="relative space-y-12d w-full h-full">
              <div className="w-[216px] h-[294px] relative rounded-32d overflow-hidden">
                <GradientImage src="/images/event-details/our-images/1.png" />
              </div>
              <p className="text-12d">TENNIS</p>
            </div>
          </SwiperSlide>
          {/* image 6 */}

          {/* image 7 */}
          <SwiperSlide className="!w-[325px] !h-[60vh] relative z-30 shrink-0 opacity-1 !translate-x-[-15%]">
            {/* posisi acak left-[1%] translate-x-[1%] rotate-[15deg] */}
            {/* tampilan tengah left-[15.5%] translate-x-[15.5%] */}
            {/* space between translate-x-[-15%] */}
            <div className="relative space-y-12d w-full h-full">
              <div className="w-full h-[441px] relative rounded-32d overflow-hidden">
                <GradientImage src="/images/event-details/our-images/2.png" />
              </div>
              <p className="text-12d">TENNIS</p>
            </div>
          </SwiperSlide>
          {/* image 7 */}

          {/* image 8 */}
          <SwiperSlide className="!w-[325px] !h-[60vh] relative z-20 shrink-0 opacity-1 translate-y-[10%] top-[10%]">
            {/* posisi acak left-[-3.3%] translate-x-[-3.3%] rotate-[-5.23deg] */}
            {/* tampilan tengah left-[-3.3%] translate-x-[-3.3%] */}
            {/* tampilan end translate-y-[10%] */}
            <div className="relative space-y-12d w-full h-full">
              <div className="w-[216px] h-[294px] relative rounded-32d overflow-hidden">
                <GradientImage src="/images/event-details/our-images/3.png" />
              </div>
              <p className="text-12d">TENNIS</p>
            </div>
          </SwiperSlide>
          {/* image 8 */}

          {/* image 9 */}
          <SwiperSlide className="!w-[325px] !h-[60vh] relative z-10 shrink-0 opacity-1 !translate-x-[-15%]">
            {/* posisi acak right-[20%] translate-x-[20%] rotate-[11.08deg] */}
            {/* tampilan right-[35.6%] translate-x-[35.6%] */}
            {/* space between translate-x-[-15%] */}
            <div className="relative space-y-12d w-full h-full">
              <div className="w-full h-[441px] relative rounded-32d overflow-hidden">
                <GradientImage src="/images/event-details/our-images/4.png" />
              </div>
              <p className="text-12d">TENNIS</p>
            </div>
          </SwiperSlide>
          {/* image 9 */}

          {/* image 10 */}
          <SwiperSlide className="!w-[325px] !h-[60vh] relative z-0 shrink-0 opacity-1 !translate-y-[10%]">
            {/* posisi acak right-[35%] translate-x-[35%] rotate-[30deg] */}
            {/* tampilan tengah right-[65.8%] translate-x-[65.8%] */}
            {/* tampilan end translate-y-[10%] */}
            <div className="relative space-y-12d w-full h-full">
              <div className="w-[216px] h-[294px] relative rounded-32d overflow-hidden">
                <GradientImage src="/images/event-details/our-images/5.png" />
              </div>
              <p className="text-12d">TENNIS</p>
            </div>
          </SwiperSlide>
          {/* image 10*/}
        </Swiper>
      </div>
    </div>
  );
}
