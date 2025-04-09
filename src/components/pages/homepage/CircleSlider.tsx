import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import ArrowButton from "@/components/ui/ArrowButton";
import Image from "next/image";
import clsx from "clsx";

import { useQuery } from "@tanstack/react-query";

interface SliderItem {
  file: string;
  logo: string;
  desc: string;
  type: string;
}

const SLIDER_DATA: SliderItem[] = [
  {
    file: "/homepage/hero/swiper/Event 1.png",
    logo: "/homepage/hero/swiper/Logo.png",
    desc: "Cocolily country club",
    type: "img",
  },
  {
    file: "/homepage/hero/swiper/Event 2.png",
    logo: "/homepage/hero/swiper/Logo.png",
    desc: "Cocolily Carvanal",
    type: "img",
  },
  {
    file: "/homepage/hero/swiper/sample.mp4",
    logo: "/homepage/hero/swiper/Logo.png",
    desc: "Home Bakery X Cocolily",
    type: "video",
  },
];

type ApiResponse = {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    events: {
      id: number;
      documentId: string;
      eventName: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      file: {
        id: number;
        documentId: string;
        name: string;
        alternativeText: string | null;
        caption: string | null;
        width: number | null;
        height: number | null;
        formats: {
          thumbnail?: {
            name: string;
            hash: string;
            ext: string;
            mime: string;
            path: string | null;
            width: number;
            height: number;
            size: number;
            sizeInBytes: number;
            url: string;
          };
          small?: {
            name: string;
            hash: string;
            ext: string;
            mime: string;
            path: string | null;
            width: number;
            height: number;
            size: number;
            sizeInBytes: number;
            url: string;
          };
        } | null;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl: string | null;
        provider: string;
        provider_metadata: any | null;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
      };
      logo: {
        id: number;
        documentId: string;
        name: string;
        alternativeText: string | null;
        caption: string | null;
        width: number | null;
        height: number | null;
        formats: {
          thumbnail?: {
            name: string;
            hash: string;
            ext: string;
            mime: string;
            path: string | null;
            width: number;
            height: number;
            size: number;
            sizeInBytes: number;
            url: string;
          };
          small?: {
            name: string;
            hash: string;
            ext: string;
            mime: string;
            path: string | null;
            width: number;
            height: number;
            size: number;
            sizeInBytes: number;
            url: string;
          };
        } | null;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl: string | null;
        provider: string;
        provider_metadata: any | null;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
      };
    }[];
  };
  meta: Record<string, unknown>;
};

const TOTAL_ITEMS = 6;
const BASE_WIDTH = 1440;

function getVisibleItems(
  array: SliderItem[],
  startIndex: number,
  itemsPerView = 5
): SliderItem[] {
  return Array.from(
    { length: itemsPerView },
    (_, i) => array[(startIndex + i) % array.length]
  );
}

const CircleSlider: React.FC = () => {
  const circleRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState<SliderItem[][]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [dataFromApi, setDataFromApi] = useState<ApiResponse | null>(null);

  const { data } = useQuery<ApiResponse>({
    queryKey: ["hero-slider"],
    queryFn: async () => {
      const res = await fetch("/api/hero-slider");
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  useEffect(() => {
    if (data) {
      setDataFromApi(data);
    }
  }, [data]);

  // Initialize video refs array
  useEffect(() => {
    videoRefs.current = Array(TOTAL_ITEMS).fill(null);
  }, []);

  // Initialize visible items
  useEffect(() => {
    const tempArray: SliderItem[][] = [];
    for (let i = 0; i < SLIDER_DATA.length; i++) {
      tempArray.push(getVisibleItems(SLIDER_DATA, i));
    }
    setVisibleItems(tempArray);
  }, []);

  // Update radius based on viewport width
  useEffect(() => {
    const updateRadius = () => {
      const viewportWidth = window.innerWidth;
      setRadius((680 / BASE_WIDTH) * viewportWidth);
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  // Handle video play/pause when currentIndex changes
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      try {
        if (
          index === currentIndex &&
          SLIDER_DATA[index % SLIDER_DATA.length].type === "video"
        ) {
          video.play().catch((e) => console.error("Video play failed:", e));
        } else {
          video.pause();
        }
      } catch (error) {
        console.error("Error controlling video:", error);
      }
    });
  }, [currentIndex]);

  const setVideoRef = useCallback(
    (index: number) => (el: HTMLVideoElement | null) => {
      videoRefs.current[index] = el;
    },
    []
  );

  const rotateCircle = (direction: "next" | "prev") => {
    handleAnimationDesc(direction);
    setIsAnimating(true);

    const rotationStep = 360 / TOTAL_ITEMS;
    const newRotation =
      rotation + (direction === "next" ? -rotationStep : rotationStep);

    setRotation(newRotation);

    gsap.to(circleRef.current, {
      rotate: newRotation,
      duration: 2,
      ease: "power2.inOut",
      onComplete: () => {
        setIsAnimating(false);
        setCurrentIndex((prev) => {
          if (direction === "next") {
            return (prev + 1) % TOTAL_ITEMS;
          } else {
            return (prev - 1 + TOTAL_ITEMS) % TOTAL_ITEMS;
          }
        });
      },
    });
  };

  const handleAnimationDesc = (direction: "next" | "prev") => {
    if (direction === "next") {
      gsap.fromTo(
        `.desc-circle-${currentIndex}`,
        {
          transform: "translateY(0)",
        },
        {
          transform: "translateY(-300%)",
          duration: 2,
          ease: "power2.inOut",
        }
      );

      gsap.fromTo(
        `.desc-circle-${(currentIndex + 1) % TOTAL_ITEMS}`,
        {
          transform: "translateY(300%)",
        },
        {
          transform: "translateY(0)",
          duration: 2,
          ease: "power2.inOut",
        }
      );
    } else {
      gsap.fromTo(
        `.desc-circle-${currentIndex}`,
        {
          transform: "translateY(0)",
        },
        {
          transform: "translateY(300%)",
          duration: 2,
          ease: "power2.inOut",
        }
      );

      gsap.fromTo(
        `.desc-circle-${(currentIndex - 1 + TOTAL_ITEMS) % TOTAL_ITEMS}`,
        {
          transform: "translateY(-300%)",
        },
        {
          transform: "translateY(0)",
          duration: 2,
          ease: "power2.inOut",
        }
      );
    }
  };

  const renderDescCircle = () => {
    return (
      dataFromApi &&
      dataFromApi.data.events.map((data, i) => {
        const item = SLIDER_DATA[i % SLIDER_DATA.length];

        return (
          <div
            key={i}
            className={clsx(
              `font-bold font-abc md:landscape:text-16d text-ruby-red uppercase desc-circle-${i} leading-none`,
              "absolute top-0 left-0",
              {
                "translate-y-[300%]": i !== 0,
                "opacity-0": i === 0,
              }
            )}
          >
            {data.eventName}
          </div>
        );
      })
    );
  };

  const renderCircleItems = () => {
    return (
      dataFromApi &&
      dataFromApi.data.events.map((data, i) => {
        const angle = (i / TOTAL_ITEMS) * 360;
        const item = SLIDER_DATA[i % SLIDER_DATA.length];

        return (
          <div
            key={i}
            className={clsx(
              "absolute w-672d h-672d rounded-full flex items-center justify-center text-white font-bold overflow-hidden",
              `circle-item-${i}`,
              {
                "cursor-follow-active": i === currentIndex,
              }
            )}
            style={{
              transform: `rotate(${angle}deg) translateY(-${radius}px) rotate(0deg)`,
            }}
          >
            <div className="relative w-full h-full rounded-full overflow-hidden">
              {/* logo */}
              {data.logo && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                  <div className="w-537d h-537d relative">
                    <Image
                      src={process.env.NEXT_PUBLIC_STRAPI_URL + data.logo.url}
                      alt="logo"
                      fill
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {data.file.mime?.startsWith("image/") ? (
                <Image
                  src={process.env.NEXT_PUBLIC_STRAPI_URL + data.file.url}
                  alt="image"
                  fill
                  className="w-full h-full object-cover scale-105"
                />
              ) : (
                <video
                  ref={setVideoRef(i)}
                  className="w-full h-full object-cover scale-105"
                  src={process.env.NEXT_PUBLIC_STRAPI_URL + data.file.url}
                  loop
                  muted
                  playsInline
                />
              )}
            </div>
          </div>
        );
      })
    );
  };

  return (
    <>
      <div className="w-217d absolute left-141d top-510d z-10 flex flex-col gap-y-20d">
        <div
          className="uppercase font-sans text-10d text-ruby-red title-desc "
          style={{
            transform: "translateY(100%)",
            clipPath: "inset(0% 0% 100% 0%)",
          }}
        >
          Cocolily sweet moments
        </div>

        <div className="w-full h-36d overflow-hidden relative">
          {renderDescCircle()}
        </div>
        <div className="uppercase font-abc font-bold text-16d text-ruby-red leading-none"></div>
      </div>

      <div className="flex flex-col items-center gap-4 relative circle-slider-container">
        <div className="w-2223d h-2223d rounded-full flex items-center justify-center relative overflow-hidden">
          <div
            ref={circleRef}
            className="absolute w-full h-full flex items-center justify-center"
            style={{ transformOrigin: "center" }}
          >
            {renderCircleItems()}
          </div>
        </div>

        <div
          className="absolute left-365d top-387d z-10 cursor-pointer button-prev opacity-0"
          onClick={() => !isAnimating && rotateCircle("prev")}
        >
          <ArrowButton variant="secondary" icon="arrow-left" />
        </div>
        <div
          className="absolute right-365d top-387d z-10 cursor-pointer button-next opacity-0"
          onClick={() => !isAnimating && rotateCircle("next")}
        >
          <ArrowButton variant="secondary" />
        </div>
      </div>
    </>
  );
};

export default CircleSlider;
