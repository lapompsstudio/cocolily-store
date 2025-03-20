"use client";
import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
import CardProduct from "./CardProduct";
// Import Swiper components and styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import ArrowButton from "@/components/ui/ArrowButton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Define TypeScript interfaces
interface Product {
  id: number;
  title: string;
  imageSrc: string;
  imageAlt: string;
}

gsap.registerPlugin(ScrollTrigger);

export default function ShopOurProducts(): JSX.Element {
  const [activeTab, setActiveTab] = useState<"shop" | "create">("shop");
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Enhanced dummy data with more realistic product information
  const shopProducts: Product[] = [
    {
      id: 1,
      title: "Classic Chocolate Truffles",
      imageSrc: "/images/our-products/image.png",
      imageAlt: "Assorted chocolate truffles in a luxury box",
    },
    {
      id: 2,
      title: "Gourmet Macarons",
      imageSrc: "/images/our-products/image1.png",
      imageAlt: "Colorful French macarons arranged in a gift box",
    },
    {
      id: 3,
      title: "Artisanal Pralines",
      imageSrc: "/images/our-products/image2.png",
      imageAlt: "Handcrafted Belgian pralines with elegant designs",
    },
    {
      id: 4,
      title: "Luxury Bonbon Collection",
      imageSrc: "/images/our-products/image.png",
      imageAlt: "Assorted bonbons with decorative finishes",
    },
    {
      id: 5,
      title: "Dark Chocolate Assortment",
      imageSrc: "/images/our-products/image1.png",
      imageAlt: "Premium dark chocolate selection in a gift box",
    },
    {
      id: 6,
      title: "Seasonal Berry Chocolates",
      imageSrc: "/images/our-products/image2.png",
      imageAlt: "Chocolates with seasonal berry fillings",
    },
    {
      id: 7,
      title: "Hazelnut Chocolate Bars",
      imageSrc: "/images/our-products/image.png",
      imageAlt: "Artisanal chocolate bars with hazelnut pieces",
    },
    {
      id: 8,
      title: "Spiced Caramel Collection",
      imageSrc: "/images/our-products/image1.png",
      imageAlt: "Assorted caramel-filled chocolates with exotic spices",
    },
    {
      id: 9,
      title: "Ruby Chocolate Selection",
      imageSrc: "/images/our-products/image2.png",
      imageAlt: "Luxurious ruby chocolate assortment in gift packaging",
    },
  ];

  // Handle slide change
  const handleSlideChange = (swiperInstance: SwiperType): void => {
    setActiveIndex(swiperInstance.activeIndex);
  };

  // Format the pagination text
  const formatPaginationText = (): string => {
    const currentPage = activeIndex + 1;
    const totalPages = Math.ceil(shopProducts.length / 3);
    return `${String(currentPage).padStart(2, "0")} / ${String(totalPages).padStart(2, "0")}`;
  };

  useEffect(() => {
    // Reset swiper when tab changes
    if (swiper && activeTab === "shop") {
      swiper.slideTo(0, 800); // 800ms (3 seconds) transition when resetting
      setActiveIndex(0);
    }
  }, [activeTab, swiper]);

  // Handle prev slide with 3-second transition
  const goPrev = (): void => {
    if (swiper) {
      swiper.slidePrev(800); // 800ms (3 seconds) transition
    }
  };

  // Handle next slide with 3-second transition
  const goNext = (): void => {
    if (swiper) {
      swiper.slideNext(800); // 800ms (3 seconds) transition
    }
  };

  // Calculate total number of slides for shop section
  const totalSlides = Math.ceil(shopProducts.length / 3);

  useGSAP(() => {
    gsap.set([".button-shop", ".text-pagination"], {
      clipPath: "inset(0% 0% 100% 0%)",
      yPercent: 100,
    });
    gsap.set([".text-pagination-left"], {
      clipPath: "inset(0% 100% 0% 0%)",
      xPercent: 100,
    });
    gsap.set([".text-pagination-right"], {
      clipPath: "inset(0% 0% 0% 100%)",
      xPercent: -100,
    });

    const cardSelectors = shopProducts.map(
      (_, index) => `.card-product-${index + 1}`
    );

    gsap.set(cardSelectors, {
      clipPath: "inset(0% 0% 100% 0%)",
      yPercent: 100,
    });

    ScrollTrigger.create({
      trigger: ".button-shop",
      start: "top 75%",
      onEnter: () => {
        gsap.to(".button-shop", {
          clipPath: "inset(0% 0% 0% 0%)",
          yPercent: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power1.inOut",
        });
      },
    });

    ScrollTrigger.create({
      trigger: ".container-card-product",
      start: "top 75%",
      // markers: true,
      onEnter: () => {
        gsap.to(cardSelectors, {
          clipPath: "inset(0% 0% 0% 0%)",
          yPercent: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power1.inOut",
        });
      },
    });

    ScrollTrigger.create({
      trigger: ".container-pagination",
      start: "top 90%",
      onEnter: () => {
        gsap.to(".text-pagination", {
          clipPath: "inset(0% 0% 0% 0%)",
          yPercent: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power1.inOut",
        });
        gsap.to(".text-pagination-left", {
          clipPath: "inset(0% 0% 0% 0%)",
          xPercent: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power1.inOut",
        });
        gsap.to(".text-pagination-right", {
          clipPath: "inset(0% 0% 0% 0%)",
          xPercent: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power1.inOut",
        });
      },
    });
  }, []);

  return (
    <div className="w-full h-screen bg-seashell px-20d relative overflow-hidden container-shop-our-products">
      <div className="grid grid-cols-2 mt-[8vh] h-72d">
        <Button
          showIcon
          variant="secondary"
          className={`uppercase h-full font-abc text-16d button-shop ${
            activeTab === "shop" ? "bg-opacity-20" : ""
          }`}
          onClick={() => setActiveTab("shop")}
        >
          shop our products
        </Button>
        <Button
          showIcon
          variant="secondary"
          className={`uppercase h-full font-abc text-16d button-shop ${
            activeTab === "create" ? "bg-opacity-20" : ""
          }`}
          onClick={() => setActiveTab("create")}
        >
          create your own
        </Button>
      </div>

      {/* Shop Products Section */}
      {activeTab === "shop" && (
        <div className="mt-[5vh] container-card-product">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            speed={3000} // Set base transition speed to 3000ms (3 seconds)
            onSwiper={(swiperInstance: SwiperType) => setSwiper(swiperInstance)}
            onSlideChange={handleSlideChange}
            allowTouchMove={true}
            watchSlidesProgress={true}
          >
            {/* Group products in sets of 3 for each slide */}
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <SwiperSlide key={`slide-${slideIndex}`}>
                <div className="grid grid-cols-3 gap-20d">
                  {shopProducts
                    .slice(slideIndex * 3, slideIndex * 3 + 3)
                    .map((product) => (
                      <CardProduct
                        className={`card-product-${product.id}`}
                        key={product.id}
                        title={product.title}
                        imageSrc={product.imageSrc}
                        imageAlt={product.imageAlt}
                      />
                    ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation controls for shop */}
          <div className="flex items-center justify-center absolute bottom-[5vh] w-full left-0 container-pagination">
            <div className="text-pagination-left pl-16d">
              <button
                onClick={goPrev}
                type="button"
                aria-label="Previous slide"
                disabled={activeIndex === 0}
              >
                <ArrowButton variant="secondary" icon="arrow-left" />
              </button>
            </div>
            <p className="font-abc text-ruby-red w-[19%] text-center text-pagination">
              {formatPaginationText()}
            </p>
            <div className="text-pagination-right pr-16d">
              <button
                onClick={goNext}
                type="button"
                aria-label="Next slide"
                disabled={activeIndex === totalSlides - 1}
              >
                <ArrowButton variant="secondary" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Your Own Section - Blank */}
      {activeTab === "create" && (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="text-center text-gray-500 p-8">
            <h2 className="text-32d font-abc mb-4">Create Your Own</h2>
            <p>This section is coming soon.</p>
          </div>
        </div>
      )}
    </div>
  );
}
