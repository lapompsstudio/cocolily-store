import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";

import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import SplitText from "gsap/src/SplitText";
import "swiper/css";

import ArrowButton from "@/components/ui/ArrowButton";

const description = [
  {
    title: "description",
    desc: "Our Signature Box is a refined selection of handcrafted luxury dark chocolates, made to satisfy the most discerning palates. Each piece offers a rich, smooth intensity with deep cocoa notes, beautifully balanced with hints of natural sweetness. Expertly crafted using premium ingredients, this box celebrates the depth and complexity of dark chocolate in its purest form. Whether you’re gifting a loved one or treating yourself, the Signature Box offers a sophisticated and indulgent experience—perfect for moments that deserve something extraordinary.",
  },

  {
    title: "ingredients",
    desc: "Dark Chocolate (Cocoa Mass, Sugar, Cocoa Butter, Soy Lecithin as an Emulsifier, Vanilla), Pretzels (Wheat Flour, Salt, Sunflower Oil, Yeast, Vinegar, Baking Soda) Made in a facility that handles Dairy, Peanuts, Wheat, Egg, Soy, Tree Nuts, Sesame.",
  },

  {
    title: "product care",
    desc: "Cocolily’s chocolates are made by hand daily in our Los Angeles chocolate kitchen. Store your chocolates in a cool and dry place.",
  },
  ,
  {
    title: "shipping",
    desc: "Store in cool and dry place, away from sunlight. *Sugar or fat bloom may cause white lines to appear due to prolonged storage in undesired conditions. Product is still safe for consumption.",
  },
];
const variant = [
  "box of 6 - Bonbons",
  "box of 8 - Bonbons",
  "box of 9 - Bonbons",
  "box of 12 - Bonbons",
  "box of 15 - Bonbons",
  "box of 24 - Bonbons",
  "box of 30 - Bonbons",
];

const image = [
  "/creative-detail/photo.png",
  "/creative-detail/photo-1.png",
  "/creative-detail/photo.png",
  "/creative-detail/photo-2.png",
  "/creative-detail/photo.png",
  "/creative-detail/photo-1.png",
  "/creative-detail/photo.png",
  "/creative-detail/photo-2.png",
  "/creative-detail/photo.png",
];

gsap.registerPlugin(ScrollTrigger, SplitText);

const CreationProductDetail = () => {
  const swiperRef = useRef<any>(null);
  const swiperPopupRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeVariant, setActiveVariant] = useState(variant[0]);
  const [arcodionDesc, setArcodionDesc] = useState(false);
  const [arcodionIngredients, setArcodionIngredients] = useState(false);
  const [arcodionProductCare, setArcodionProductCare] = useState(false);
  const [arcodionShipping, setArcodionShipping] = useState(false);
  const [handlePopUpImage, setHandlePopUpImage] = useState(false);
  const [imageActiveIndex, setImageActiveIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const imgPopupRef = useRef<HTMLDivElement>(null);

  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const isActualDrag = useRef(false);
  const swiperHeroThumbnailRef = useRef<any>(null);

  const handleToggleZoom = useCallback(() => {
    // Only toggle zoom if not dragging
    if (!isActualDrag.current) {
      if (!isZoomed) {
        setIsZoomed(true);
      } else {
        setIsZoomed(false);
        setPosition({ x: 0, y: 0 });
      }
    }
    // Reset drag flag after click handling
    isActualDrag.current = false;
  }, [isZoomed]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!isZoomed) return;

      setIsDragging(true);
      isActualDrag.current = false; // Reset drag flag
      dragStartPos.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };

      document.body.style.userSelect = "none";
      document.body.style.cursor = "grabbing";
    },
    [isZoomed, position]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !isZoomed) return;

      // Mark as actual drag if mouse moves significantly
      if (!isActualDrag.current) {
        const dx = e.clientX - dragStartPos.current.x;
        const dy = e.clientY - dragStartPos.current.y;
        if (Math.sqrt(dx * dx + dy * dy) > 5) {
          isActualDrag.current = true;
        }
      }

      const newX = e.clientX - dragStartPos.current.x;
      const newY = e.clientY - dragStartPos.current.y;

      // Boundary checks
      if (imageContainerRef.current) {
        const { width, height } =
          imageContainerRef.current.getBoundingClientRect();
        const maxX = width * 0.25;
        const maxY = height * 0.25;

        setPosition({
          x: Math.min(Math.max(newX, -maxX), maxX),
          y: Math.min(Math.max(newY, -maxY), maxY),
        });
      }
    },
    [isDragging, isZoomed]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);
    document.body.style.userSelect = "";
    document.body.style.cursor = "";
  }, [isDragging]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      handleMouseUp();
    }
  }, [isDragging, handleMouseUp]);

  const imageThumbnailHandleClick = (index: number) => {
    setImageActiveIndex(index);
    swiperRef.current.swiper.slideTo(index);
  };

  const handleArcodion = (type: string | undefined) => {
    if (type === undefined) return;

    if (type === "description") {
      setArcodionDesc(!arcodionDesc);
    } else if (type === "ingredients") {
      setArcodionIngredients(!arcodionIngredients);
    } else if (type === "product care") {
      setArcodionProductCare(!arcodionProductCare);
    } else if (type === "shipping") {
      setArcodionShipping(!arcodionShipping);
    }
  };

  useGSAP(
    () => {
      if (arcodionDesc) {
        gsap.to(
          ".desc-arcodion-container-0",

          {
            height: "auto",
            ease: "power1.inOut",
            duration: 0.5,
          }
        );

        gsap.to(
          ".svg-arrow-0",

          {
            rotate: 180,
            ease: "power1.inOut",
            duration: 0.5,
          }
        );
      } else {
        gsap.to(
          ".desc-arcodion-container-0",

          {
            height: 0,
            ease: "power1.inOut",
            duration: 0.5,
          }
        );
        gsap.to(
          ".svg-arrow-0",

          {
            rotate: 10,
            ease: "power1.inOut",
            duration: 0.5,
          }
        );
      }

      if (arcodionIngredients) {
        gsap.to(
          ".desc-arcodion-container-1",

          {
            height: "auto",
            ease: "power1.inOut",
            duration: 0.5,
          }
        );
        gsap.to(
          ".svg-arrow-1",

          {
            rotate: 180,
            ease: "power1.inOut",
            duration: 0.5,
          }
        );
      } else {
        gsap.to(
          ".desc-arcodion-container-1",

          {
            height: 0,
            ease: "power1.inOut",
            duration: 0.5,
          }
        );
        gsap.to(
          ".svg-arrow-1",

          {
            rotate: 0,
            ease: "power1.inOut",
            duration: 0.5,
          }
        );
      }

      if (arcodionProductCare) {
        gsap.to(
          ".desc-arcodion-container-2",

          {
            height: "auto",
            ease: "power1.inOut",
            duration: 0.5,
          }
        );

        gsap.to(
          ".svg-arrow-2",

          {
            rotate: 180,
            ease: "power1.inOut",
            duration: 0.5,
          }
        );
      } else {
        gsap.to(
          ".desc-arcodion-container-2",

          {
            height: 0,
            ease: "power1.inOut",
            duration: 0.5,
          }
        );

        gsap.to(
          ".svg-arrow-2",

          {
            rotate: 0,
            ease: "power1.inOut",
            duration: 0.5,
          }
        );
      }

      if (arcodionShipping) {
        gsap.to(
          ".desc-arcodion-container-4",

          {
            height: "auto",
            ease: "power1.inOut",
            duration: 0.5,
          }
        );
        gsap.to(
          ".svg-arrow-4",

          {
            rotate: 180,
            ease: "power1.inOut",
            duration: 0.5,
          }
        );
      } else {
        gsap.to(
          ".desc-arcodion-container-4",

          {
            height: 0,
            ease: "power1.inOut",
            duration: 0.5,
          }
        );

        gsap.to(
          ".svg-arrow-4",

          {
            rotate: 0,
            ease: "power1.inOut",
            duration: 0.5,
          }
        );
      }
    },
    {
      scope: containerRef,
      dependencies: [
        arcodionDesc,
        arcodionIngredients,
        arcodionProductCare,
        arcodionShipping,
      ],
    }
  );

  const handleHover = (condition: boolean) => {
    if (condition) {
      gsap.fromTo(
        ".button-prev",
        {
          xPercent: 50,
          opacity: 0,
        },
        {
          xPercent: 0,
          opacity: 1,
          ease: "power1.inOut",
          duration: 0.3,
        }
      );
      gsap.fromTo(
        ".button-next",
        {
          xPercent: -50,
          opacity: 0,
        },
        {
          xPercent: 0,
          opacity: 1,
          ease: "power1.inOut",
          duration: 0.3,
        }
      );
    } else {
      gsap.fromTo(
        ".button-prev",
        {
          xPercent: 0,
          opacity: 1,
        },
        {
          xPercent: 50,
          opacity: 0,
          ease: "power1.inOut",
          duration: 0.3,
        }
      );
      gsap.fromTo(
        ".button-next",
        {
          xPercent: 0,
          opacity: 1,
        },
        {
          xPercent: -50,
          opacity: 0,
          ease: "power1.inOut",
          duration: 0.3,
        }
      );
    }
  };

  useGSAP(
    () => {
      const titleSplit = new SplitText(".title", {
        type: "lines",
        linesClass: "py-1 -my-1",
      });

      const descriptionText = new SplitText(".description-text", {
        type: "lines",
      });

      gsap.set(".description-text", {
        opacity: 1,
      });

      gsap.set(".arcodion-container", {
        opacity: 1,
      });

      gsap.to(".hero-swiper-thumbnail-container", {
        transform: "translateY(0%)",
        opacity: 1,
        ease: "power1.inOut",
        duration: 1,
      });

      gsap.to(".view-all-gallery-container", {
        transform: "translateY(0%)",
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "power1.inOut",
        duration: 1,
      });

      gsap.fromTo(
        descriptionText.lines,
        {
          y: "100%",
          clipPath: "inset(0% 0% 100% 0%)",
        },
        {
          y: "0%",
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power1.inOut",
          duration: 1,
          stagger: 0.05,
        }
      );
      gsap.to(".description-title", {
        transform: "translateY(0%)",
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "power1.inOut",
        duration: 1,
      });

      gsap.to(".cart-container", {
        transform: "translateY(0%)",
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "power1.inOut",
        duration: 1,
      });

      gsap.to(".choose-variant", {
        transform: "translateY(0%)",
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "power1.inOut",
        duration: 1,
      });

      gsap.to(".button-variant", {
        transform: "translateY(0%)",
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "power1.inOut",
        duration: 1,
      });

      gsap.to(".button-love", {
        transform: "translateY(0%)",
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "power1.inOut",
        duration: 1,
      });

      gsap.fromTo(
        titleSplit.lines,
        { yPercent: 100, clipPath: "inset(0% 0% 100% 0%)" },
        {
          yPercent: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            gsap.set(".title", { opacity: 1 });
          },
        }
      );

      gsap.to(".price", {
        transform: "translateY(0%)",
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "power1.inOut",
        duration: 1,
      });

      gsap.to(".details", {
        transform: "translateY(0%)",
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "power1.inOut",
        duration: 1,
      });

      gsap.to(".swiper-container", {
        translateY: 0,
        opacity: 1,
        ease: "power1.inOut",
        duration: 1,
      });
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      const timeout = setTimeout(() => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "bottom bottom",
          end: "bottom 60%",
          scrub: true,

          onEnter: () =>
            gsap.to([".title-cart", ".price-chart"], {
              transform: "translateY(0)",
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "power1.inOut",
              duration: 1,
            }),
        });
      }, 500);

      return () => clearTimeout(timeout);
    },
    { scope: containerRef }
  );

  const handleClick = (direction: string) => {
    if (direction === "next") {
      swiperRef.current?.swiper.slideNext();

      setImageActiveIndex(swiperRef.current?.swiper.activeIndex || 0);
    } else {
      swiperRef.current?.swiper.slidePrev();

      setImageActiveIndex(swiperRef.current?.swiper.activeIndex || 0);
    }
  };

  useEffect(() => {
    const swiperInstance = swiperHeroThumbnailRef.current?.swiper;
    if (!swiperInstance) return;

    const currentIndex = imageActiveIndex;
    const visibleSlides = 3; // sama dengan slidesPerView
    const firstVisible = swiperInstance.activeIndex;
    const lastVisible = firstVisible + visibleSlides - 1;

    // Jika slide aktif tidak terlihat, atau berada di ujung, geser
    if (currentIndex <= firstVisible || currentIndex >= lastVisible) {
      swiperInstance.slideTo(Math.max(currentIndex - 1, 0));
    }
  }, [imageActiveIndex]);

  return (
    <>
      {/* pop up image */}
      <div
        className={clsx(
          "fixed bg-black bg-opacity-80 h-screen w-screen top-0 left-0 z-[1000]",
          {
            hidden: !handlePopUpImage,
          }
        )}
      >
        <div className="w-full h-full relative">
          <div className="absolute top-50d left-1/2 -translate-x-1/2 h-[70%] w-auto">
            <div className="h-full relative flex items-start">
              <div
                ref={imageContainerRef}
                className="h-full relative overflow-hidden"
                style={{
                  cursor: isZoomed
                    ? isDragging
                      ? "grabbing"
                      : "grab"
                    : "zoom-in",

                  transform: isZoomed
                    ? `scale(2) translate(${position.x}px, ${position.y}px)`
                    : "scale(1)",
                  transition: isDragging ? "none" : "transform 0.3s ease",
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}
                onClick={handleToggleZoom}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={image[imageActiveIndex]}
                  alt="image"
                  className="object-contain w-full h-full"
                  style={{
                    pointerEvents: "none",
                  }}
                />
              </div>

              <button
                className={clsx("relative top-0 right-0 translate-x-full", {
                  hidden: isZoomed,
                })}
                onClick={() => setHandlePopUpImage(false)}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.0283148 11.3418L11.342 0.0280831L12.5991 1.28516L1.28539 12.5989L0.0283148 11.3418Z"
                    fill="white"
                  />
                  <path
                    d="M1.28539 0.0280828L12.5991 11.3418L11.342 12.5989L0.0283148 1.28516L1.28539 0.0280828Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="w-full flex justify-center absolute bottom-100d left-1/2 -translate-x-1/2">
            <div className="font-abc font-bold text-16d text-white">
              0{imageActiveIndex + 1} / 0{image.length}
            </div>
          </div>

          <div className="absolute h-69d w-640d bottom-20d left-1/2 -translate-x-1/2 flex justify-center">
            <div className="w-full h-full relative">
              <Swiper
                className="w-full h-full"
                slidesPerView={image.length <= 6 ? image.length : 6}
                spaceBetween={8}
                ref={swiperPopupRef}
              >
                {image.map((item, index) => (
                  <SwiperSlide className="w-100d h-69d" key={index}>
                    <div
                      className={clsx(
                        "relative w-100d h-69d overflow-hidden rounded-12d cursor-pointer",
                        {
                          "border-2 border-ruby-red":
                            imageActiveIndex === index,
                        }
                      )}
                      onClick={() => {
                        setImageActiveIndex(index);
                        setIsZoomed(false);
                        setPosition({ x: 0, y: 0 });
                        swiperRef.current.swiper.slideTo(index);
                      }}
                    >
                      <Image
                        src={item}
                        alt="image"
                        fill
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button
                className="w-22d h-22d absolute top-1/2 -translate-y-1/2 left-0 -translate-x-[170%] flex justify-center items-center bg-white rounded-full z-10"
                onClick={() => swiperPopupRef.current.swiper.slidePrev()}
              >
                <svg
                  className="w-8d h-13d"
                  viewBox="0 0 8 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 12L1.5 6.5L7 1"
                    stroke="#DB0032"
                    strokeWidth="2"
                  />
                </svg>
              </button>

              <button
                className="w-22d h-22d absolute top-1/2 -translate-y-1/2 right-0 translate-x-[170%] flex justify-center items-center bg-white rounded-full z-10"
                onClick={() => swiperPopupRef.current.swiper.slideNext()}
              >
                <svg
                  className="w-8d h-13d rotate-180"
                  viewBox="0 0 8 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 12L1.5 6.5L7 1"
                    stroke="#DB0032"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* pop up image */}
      <section
        className={clsx("text-ruby-red font-bold md:landscape:px-20d relative")}
        ref={containerRef}
      >
        <div
          className={clsx(
            "uppercase md:landscape:pt-115d md:landscape:text-16d font-abc translate-y-full",
            "details"
          )}
          style={{
            clipPath: "inset(0% 0% 100% 0%)",
          }}
        >
          DETAILS
        </div>

        <div
          className={clsx(
            "grid md:landscape:grid-cols-2 gap-x-20d md:landscape:mt-60d"
          )}
        >
          <div className="w-full flex flex-col z-10 relative ">
            <div
              className={clsx(
                "w-full opacity-0 translate-y-1/2 bg-ivory-blush",
                "swiper-container"
              )}
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
            >
              <div className="relative aspect-square w-full">
                <Swiper ref={swiperRef} slidesPerView={1}>
                  {image.map((item, index) => (
                    <SwiperSlide
                      key={index}
                      onClick={() => setHandlePopUpImage(true)}
                    >
                      <div className="relative aspect-square w-full overflow-hidden rounded-32d cursor-pointer">
                        <Image
                          src={item}
                          alt="image"
                          fill
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div
                  className={clsx(
                    "absolute top-1/2 left-20d -translate-y-1/2 z-10 opacity-0",
                    "button-prev"
                  )}
                  onClick={() => handleClick("prev")}
                >
                  <ArrowButton icon="arrow-left" variant="secondary" />
                </div>

                <div
                  className={clsx(
                    "absolute top-1/2  right-20d -translate-y-1/2 z-10 opacity-0",
                    "button-next"
                  )}
                  onClick={() => handleClick("next")}
                >
                  <ArrowButton variant="secondary" />
                </div>
              </div>
            </div>

            <div
              className={clsx(
                "relative  w-full overflow-hidden md:landscape:h-151d flex gap-x-20d z-10 opacity-0 translate-y-full bg-ivory-blush pt-20d",
                "hero-swiper-thumbnail-container"
              )}
            >
              <Swiper
                slidesPerView={3}
                spaceBetween={20}
                ref={swiperHeroThumbnailRef}
                onSlideChange={(swiper) => console.log(swiper.activeIndex)}
              >
                {image.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={clsx(
                        "w-full relative h-full overflow-hidden rounded-12d cursor-pointer ",
                        {
                          "border-2 border-ruby-red":
                            imageActiveIndex === index,
                        }
                      )}
                      key={index}
                      onClick={() => imageThumbnailHandleClick(index)}
                    >
                      <Image
                        src={item}
                        alt="image"
                        fill
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div
              className={clsx(
                "w-full flex justify-end translate-y-full mt-20d",
                "view-all-gallery-container"
              )}
              style={{
                clipPath: "inset(0% 0% 100% 0%)",
              }}
            >
              <button
                className="font-sans text-10d"
                onClick={() => setHandlePopUpImage(true)}
              >
                VIEW ALL GALLERY
              </button>
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-90d">
            <div className="flex flex-col gap-y-20d">
              <div className="w-full flex gap-x-163d">
                <div
                  className={clsx(
                    "text-48d font-span font-bold leading-none opacity-0",
                    "title"
                  )}
                >
                  Signature Chocolate Box - Luxury Dark Choco
                </div>

                <div className={clsx("mt-10d")}>
                  <button
                    className="button-love translate-y-full"
                    style={{
                      clipPath: "inset(0% 0% 100% 0%)",
                    }}
                  >
                    <svg
                      className="w-22d h-22d"
                      viewBox="0 0 25 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_2293_36233)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M21.8961 10.5979C22.8509 9.60589 23.3813 8.26651 23.3707 6.87444C23.36 5.48237 22.8092 4.15163 21.8394 3.17498C21.3592 2.69139 20.7906 2.30929 20.166 2.05049C19.5415 1.79169 18.8732 1.66126 18.1993 1.66665C16.8384 1.67753 15.5375 2.24096 14.5827 3.233C14.3235 3.4982 13.994 3.82372 13.5943 4.20955L12.483 5.28004L11.3716 4.20955C10.971 3.8228 10.6411 3.49728 10.3818 3.233C9.41954 2.24866 8.11439 1.69566 6.75349 1.69566C5.3926 1.69566 4.08745 2.24866 3.12515 3.233C1.14286 5.26208 1.1199 8.54259 3.05223 10.5813L12.483 20.2281L21.8961 10.5979ZM1.97871 2.06168C2.60569 1.42017 3.35007 0.911293 4.16933 0.564102C4.9886 0.216912 5.8667 0.0382138 6.75349 0.0382138C7.64028 0.0382138 8.51839 0.216912 9.33766 0.564102C10.1569 0.911293 10.9013 1.42017 11.5283 2.06168C11.774 2.31399 12.0923 2.628 12.483 3.0037C12.8719 2.628 13.1901 2.31353 13.4376 2.0603C14.6941 0.755229 16.406 0.0141897 18.1966 0.000201664C19.9873 -0.0137864 21.71 0.700422 22.9858 1.98571C24.2617 3.271 24.9861 5.02208 24.9998 6.85374C25.0135 8.6854 24.3153 10.4476 23.0588 11.7527L13.4376 21.5956C13.1844 21.8545 12.841 22 12.483 22C12.1249 22 11.7815 21.8545 11.5283 21.5956L1.90445 11.7513C0.670297 10.4493 -0.0136882 8.703 0.000207661 6.88953C0.0141035 5.07606 0.724765 3.34095 1.97871 2.05892V2.06168Z"
                          fill="#DB0032"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2293_36233">
                          <rect width="25" height="22" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>
              <div
                className={clsx(
                  "font-sans font-medium text-16d translate-y-full",
                  "price"
                )}
                style={{
                  clipPath: "inset(0% 0% 100% 0%)",
                }}
              >
                AED 300.00
              </div>
            </div>

            <div>
              <div
                className={clsx(
                  "font-abc font-bold text-16d uppercase",
                  "choose-variant"
                )}
                style={{
                  clipPath: "inset(0% 0% 100% 0%)",
                  transform: "translateY(100%)",
                }}
              >
                choose variant:
              </div>

              <div className="mt-42d grid grid-cols-6 ">
                <div className="col-span-6 flex flex-wrap gap-x-20d gap-y-8d">
                  {variant.map((item, index) => (
                    <button
                      className={clsx(
                        "py-8d px-12d font-sans text-10d border border-ruby-red  rounded-32d text-nowrap uppercase font-light translate-y-full",
                        "button-variant",
                        {
                          "bg-ruby-red text-white": activeVariant === item,
                          "text-ruby-red": activeVariant !== item,
                        }
                      )}
                      style={{
                        clipPath: "inset(0% 0% 100% 0%)",
                      }}
                      onClick={() => setActiveVariant(item)}
                      key={index}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={clsx("w-full")}>
              {description &&
                description.map((item, index) => (
                  <div
                    key={index}
                    className={clsx("opacity-0", "arcodion-container", {
                      "border-t border-ruby-red": index !== 0,
                      "border-b border-ruby-red":
                        index === description.length - 1,
                    })}
                  >
                    <div className="w-full flex justify-between items-center py-20d">
                      <div
                        className={clsx(
                          "uppercase font-abc text-16d font-bold translate-y-full",
                          "description-title"
                        )}
                        style={{
                          clipPath: "inset(0% 0% 100% 0%)",
                        }}
                      >
                        {item?.title}
                      </div>

                      <button onClick={() => handleArcodion(item?.title)}>
                        <svg
                          width="15"
                          height="6"
                          viewBox="0 0 15 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`svg-arrow-${index}`}
                        >
                          <path d="M1 1L7.5 5L14 1" stroke="#DB0032" />
                        </svg>
                      </button>
                    </div>

                    <div
                      className={clsx(
                        "w-full overflow-hidden ",
                        `desc-arcodion-container-${index}`
                      )}
                    >
                      <div
                        className={clsx(
                          "font-sans text-12d font-light pt-30d pb-60d transition-all duration-300 ease-in-out",
                          "description-text"
                        )}
                      >
                        {item?.desc}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* line spacing */}
        <div className="w-full pt-90d"></div>
        {/* line spacing */}

        {/* checkout container */}
        <div
          className={clsx(
            "grid grid-cols-2 gap-x-20d w-full sticky bottom-0 left-0 px-20d translate-y-full",
            "cart-container"
          )}
          style={{
            clipPath: "inset(0% 0% 100% 0%)",
          }}
        >
          <div className="pb-20d pt-52d ">
            <div
              className={clsx(
                "font-abc text-16d font-bold uppercase",
                "title-cart"
              )}
              style={{
                clipPath: "inset(0% 0% 100% 0%)",
              }}
            >
              Signature Chocolate Box - Luxury Dark Choco
            </div>
            <div
              className={clsx(
                "font-sans text-12d font-medium translate-y-full",
                "price-chart"
              )}
              style={{
                clipPath: "inset(0% 0% 100% 0%)",
              }}
            >
              AED 300.00
            </div>
          </div>

          <div className="w-full grid grid-cols-6 gap-x-20d pb-20d pt-52d bg-ivory-blush">
            <div className="col-span-2">
              <div className="h-38d w-full bg-ivory rounded-32d relative flex justify-between items-center px-6d">
                <button
                  className="w-29d h-29d flex justify-center items-center relative group"
                  onClick={() => setQty(qty - 1)}
                >
                  <div className="w-0 h-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:w-29d group-hover:h-29d bg-ruby-red rounded-full transition-all duration-300"></div>
                  <svg
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10"
                  >
                    <path
                      d="M10 14H19V15H10V14Z"
                      fill="#DB0032"
                      className="group-hover:fill-white transition-all duration-300"
                    />
                  </svg>
                </button>
                <div className="font-sans text-12d">{qty}</div>
                <button
                  className="w-29d h-29d flex justify-center items-center relative group"
                  onClick={() => setQty(qty + 1)}
                >
                  <div className="w-0 h-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:w-29d group-hover:h-29d bg-ruby-red rounded-full transition-all duration-300"></div>
                  <svg
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10"
                  >
                    <path d="M10 14H19V15H10V14Z" fill="#DB0032" />
                    <path
                      d="M15 10L15 19H14L14 10L15 10Z"
                      fill="#DB0032"
                      className="group-hover:fill-white transition-all duration-300"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="col-span-4">
              <button className="w-full h-38d bg-ruby-red rounded-32d flex justify-center items-center">
                <div className="font-sans text-12d text-white uppercase font-semibold">
                  add to chart
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* checkout container */}
      </section>
    </>
  );
};

export default CreationProductDetail;
