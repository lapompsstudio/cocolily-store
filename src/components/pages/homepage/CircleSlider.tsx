import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ArrowButton from "@/components/ui/ArrowButton";
import Image from "next/image";
import clsx from "clsx";

interface SliderItem {
  image: string;
  desc: string;
}

const SLIDER_DATA: SliderItem[] = [
  {
    image: "/homepage/hero/swiper/Event 1.png",
    desc: "Cocolily country club",
  },
  {
    image: "/homepage/hero/swiper/Event 2.png",
    desc: "Cocolily Carvanal",
  },
  {
    image: "/homepage/hero/swiper/Event 3.png",
    desc: "Home Bakery X Cocolily",
  },
];

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
  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState<SliderItem[][]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

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
            return (prev + 1) % 6; // Tetap bisa mencapai index 5
          } else {
            return (prev - 1 + 6) % 6; // Looping ke belakang
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
        `.desc-circle-${(currentIndex + 1 + 6) % 6}`,
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
        `.desc-circle-${(currentIndex - 1 + 6) % 6}`,
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
    return Array.from({ length: TOTAL_ITEMS }, (_, i) => {
      const item = SLIDER_DATA[i % SLIDER_DATA.length];

      return (
        <div
          key={i}
          className={clsx(
            `font-bold font-abc md:landscape:text-16d text-ruby-red uppercase desc-circle-${i} leading-none`,
            "absolute top-0 left-0",
            {
              "translate-y-[300%]": i !== 0,
            }
          )}
        >
          {item.desc}
        </div>
      );
    });
  };

  const renderCircleItems = () => {
    return Array.from({ length: TOTAL_ITEMS }, (_, i) => {
      const angle = (i / TOTAL_ITEMS) * 360;
      const item = SLIDER_DATA[i % SLIDER_DATA.length];

      return (
        <div
          key={i}
          className={clsx(
            "absolute w-672d h-672d rounded-full flex items-center justify-center text-white font-bold",
            `circle-item-${i}`,
            {
              "cursor-follow-active": i === currentIndex,
            }
          )}
          style={{
            transform: `rotate(${angle}deg) translateY(-${radius}px) rotate(0deg)`,
          }}
        >
          <div className="w-full h-full rounded-full relative">
            <Image
              src={item.image}
              alt={"image"}
              fill
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="w-217d absolute left-141d top-510d z-10 flex flex-col gap-y-20d">
        <div className="uppercase font-sans text-10d text-ruby-red title-desc">
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
          className="absolute left-365d top-387d z-10 cursor-pointer button-prev"
          onClick={() => !isAnimating && rotateCircle("prev")}
        >
          <ArrowButton variant="secondary" icon="arrow-left" />
        </div>
        <div
          className="absolute right-365d top-387d z-10 cursor-pointer button-next"
          onClick={() => !isAnimating && rotateCircle("next")}
        >
          <ArrowButton variant="secondary" />
        </div>
      </div>
    </>
  );
};

export default CircleSlider;
