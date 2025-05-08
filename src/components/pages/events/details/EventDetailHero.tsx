import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/CustomEase";

import Tag from "@/components/ui/Tag";
import useSplitTextAnimation from "@/app/hooks/useSplitTextAnimation";

interface EventFile {
  id: string;
  mime: string;
  url: string;
}

interface EventData {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  tags: string[];
  file: EventFile;
}

gsap.registerPlugin(CustomEase);

const data: EventData[] = [
  {
    id: "f4ebb50b-98b9-40f9-9d6f-29e7aa77c7f8",
    title: "Cocolily Country Club",
    location: "AT ETIHAD MUSEUM",
    date: "FEB 12-20",
    time: "5 PM - 11PM",
    tags: ["COCOA BAR", "MERCH BAR", "SELFSTUDIO"],
    file: {
      id: "d77de1d0-2d6f-45a5-8429-7784bdbb508c",
      mime: "video/mp4",
      url: "/events/events-video.mp4",
    },
  },
];

const EventDetailHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Get the first event from data
  const event = data[0];

  // Check if media is video
  const isVideo = event.file.mime.startsWith("video/");

  useSplitTextAnimation({ selector: ".split-text-stagger" });

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (animationComplete) {
      setIsFullscreen(!isFullscreen);
    }
  };

  useEffect(() => {
    // Generate video thumbnail when component mounts
    if (isVideo && videoRef.current && thumbnailRef.current) {
      const video = videoRef.current;
      video.currentTime = 0.5; // Set to 0.5 seconds to capture first meaningful frame

      const handleLoadedData = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx && thumbnailRef.current) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          thumbnailRef.current.style.backgroundImage = `url(${canvas.toDataURL()})`;
          thumbnailRef.current.style.display = "block";
        }
      };

      video.addEventListener("loadeddata", handleLoadedData);

      // Cleanup event listener
      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
      };
    }
  }, [isVideo]);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setAnimationComplete(true);

          if (marqueeRef.current) {
            const width = marqueeRef.current.scrollWidth / 2;
            gsap.fromTo(
              marqueeRef.current,
              { x: 0 },
              {
                delay: 0.2,
                x: -width,
                duration: 10,
                repeat: -1,
                ease: "linear",
              }
            );
          }

          // Start video playback after animation completes
          if (isVideo && videoRef.current) {
            videoRef.current.play().catch((error: Error) => {
              console.log("Video autoplay prevented:", error);
            });
          }
        },
      });

      tl.to(".image-wrapper-anim", {
        opacity: 1,
        duration: 1.2,
        ease: "power1.inOut",
      })
        .to(
          ".media-anim",
          {
            scale: 1,
            duration: 1.2,
            ease: "power1.inOut",
          },
          "<"
        )
        .to(
          ".split-text-stagger",
          {
            opacity: 1,
            duration: 1.2,
            ease: "power1.inOut",
          },
          "<"
        )
        .to(".content-wrapper-anim", {
          opacity: 1,
          duration: 0,
          ease: "power1.inOut",
        })
        .fromTo(
          ".content-wrapper-anim",
          {
            clipPath: "inset(50% 50% 50% 50%)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: CustomEase.create("custom", "0.56, 0, 0.3, 1"),
          }
        )
        .to(
          ".image-wrapper-anim",
          {
            scale: 1,
            duration: 1.2,
            ease: CustomEase.create("custom", "0.56, 0, 0.3, 1"),
          },
          "<"
        )
        .to(
          ".split-text-stagger",
          {
            opacity: 0,
            duration: 1.2,
            ease: "power1.inOut",
          },
          "<"
        )
        .to(".reveal-anim", {
          y: "0%",
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.8,
          ease: "power1.inOut",
        });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="h-screen bg-ivory-blush relative overflow-hidden"
    >
      <div className="h-full w-full bg-ruby-red absolute inset-0"></div>
      <div
        className="content-wrapper-anim w-full aspect-square bg-ivory-blush absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 opacity-0 rounded-32d uppercase"
        style={{ clipPath: "inset(50% 50% 50% 50%)" }}
      >
        <div className="absolute top-1/2 transform -translate-y-1/2 max-w-full">
          <div className="absolute -top-220d px-20d w-full">
            <p className="reveal-anim clipped font-abc text-16d font-bold text-ruby-red uppercase">
              {event.title}
            </p>
          </div>
          <h1
            className="heading-anim text-ruby-red whitespace-nowrap font-abc text-128d font-bold"
            ref={marqueeRef}
          >
            <span className="pr-400d">{event.title}</span>
            <span className="pr-400d">{event.title}</span>
          </h1>
          <div className="w-full grid md:landscape:grid-cols-12 font-abc gap-20d px-20d">
            <div className="md:landscape:col-span-8">
              <p className="reveal-anim clipped text-12d font-bold uppercase text-ruby-red">
                {event.location}
              </p>
            </div>
            <div className="md:landscape:col-span-4 flex justify-between">
              <p className="reveal-anim clipped text-12d font-bold uppercase text-ruby-red">
                {event.date}
              </p>
              <p className="reveal-anim clipped text-12d font-bold uppercase text-ruby-red">
                {event.time}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`media-anim-wrapper transition-all duration-500 ${isFullscreen ? "absolute w-[95vw] h-[80vh] inset-0 m-auto z-preloader" : "h-541d w-455d absolute inset-0 m-auto"}`}
      >
        <div
          className={`image-wrapper-anim h-full w-full absolute inset-0 m-auto scale-50 opacity-0 overflow-hidden rounded-32d z-20 cursor-pointer`}
          onClick={toggleFullscreen}
        >
          {isFullscreen ? (
            <button
              className="absolute top-20d right-20d z-30 bg-ivory w-37d h-37d flex items-center justify-center rounded-full border border-ruby-red"
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
              }}
            >
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.8337 6.29805L14.6587 5.12305L10.0003 9.78138L5.34199 5.12305L4.16699 6.29805L8.82533 10.9564L4.16699 15.6147L5.34199 16.7897L10.0003 12.1314L14.6587 16.7897L15.8337 15.6147L11.1753 10.9564L15.8337 6.29805Z"
                  fill="#DB0032"
                />
              </svg>
            </button>
          ) : (
            <Tag className="reveal-anim clipped absolute top-20d text-12d right-20d z-10">
              EVENT UPCOMING
            </Tag>
          )}

          {isVideo ? (
            <>
              <div
                ref={thumbnailRef}
                className="absolute inset-0 bg-cover bg-center"
              ></div>

              <video
                ref={videoRef}
                className={`media-anim object-cover h-full w-full scale-125 ${isFullscreen ? "z-20" : ""}`}
                src={event.file.url}
                poster="/events/placeholder.png"
                playsInline
                muted={!isFullscreen}
                controls={isFullscreen}
                loop
                preload="metadata"
              />
            </>
          ) : (
            <Image
              className="media-anim object-cover h-full w-full scale-125"
              src="/events/placeholder.png"
              fill
              alt={event.title}
              priority={false}
            />
          )}
        </div>

        <div className="absolute -bottom-64d left-0 right-0 mx-auto flex justify-center gap-20d">
          {event.tags.map((tag, index) => (
            <Tag
              key={index}
              className="reveal-anim clipped !h-27d z-50 max-w-fit text-10d !px-12d uppercase"
              variant="secondary"
            >
              {tag}
            </Tag>
          ))}
        </div>
      </div>

      <div className="split-text-stagger absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-auto max-w-335d text-center text-white font-span text-48d font-bold z-30 leading-none opacity-0">
        {event.title}
      </div>
    </div>
  );
};

export default EventDetailHero;
