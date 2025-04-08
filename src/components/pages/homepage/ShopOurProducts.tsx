"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Button from "@/components/ui/button";
import ArrowButton from "@/components/ui/ArrowButton";
import CardProduct from "./CardProduct";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Define TypeScript interfaces
interface Product {
  id: number;
  title: string;
  imageSrc: string;
  imageAlt: string;
}

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function ShopOurProducts(): JSX.Element {
  const [activeTab, setActiveTab] = useState<"shop" | "create">("shop");
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Moved product data outside component to avoid re-creation on each render
  const shopProducts: Product[] = useMemo(
    () => [
      {
        id: 1,
        title: "Classic Chocolate",
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
    ],
    []
  );

  // Calculate total slides once - now it's just the number of products
  const totalSlides = useMemo(() => shopProducts.length, [shopProducts.length]);

  // Format pagination text
  const paginationText = useMemo(() => {
    const currentPage = activeIndex + 1;
    return `${String(currentPage).padStart(2, "0")} / ${String(totalSlides).padStart(2, "0")}`;
  }, [activeIndex, totalSlides]);

  // Memoized callbacks to avoid recreating functions on each render
  const handleTabChange = useCallback(
    (tab: "shop" | "create"): void => {
      if (activeTab === tab) return;

      const currentActiveButton = document.querySelector(`.button-shop.active`);
      if (currentActiveButton) {
        currentActiveButton.classList.add("transitioning-out");

        setTimeout(() => {
          currentActiveButton.classList.remove("active", "transitioning-out");
        }, 300);
      }

      setActiveTab(tab);
    },
    [activeTab]
  );

  const handleSlideChange = useCallback((swiperInstance: SwiperType): void => {
    setActiveIndex(swiperInstance.activeIndex);
  }, []);

  const goPrev = useCallback((): void => {
    swiper?.slidePrev(800);
  }, [swiper]);

  const goNext = useCallback((): void => {
    swiper?.slideNext(800);
  }, [swiper]);

  // Reset swiper when tab changes
  useEffect(() => {
    if (swiper && activeTab === "shop") {
      swiper.slideTo(0, 800);
      setActiveIndex(0);
    }
  }, [activeTab, swiper]);

  // GSAP animations
  useGSAP(() => {
    // Prepare selectors for animations
    const cardSelectors = shopProducts.map(
      (_, index) => `.card-product-${index + 1}`
    );

    // Initial state setup
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

    gsap.set(cardSelectors, {
      clipPath: "inset(0% 0% 100% 0%)",
      yPercent: 100,
    });

    // Common animation config
    const animConfig = {
      duration: 0.8,
      stagger: 0.1,
      ease: "power1.inOut",
    };

    // Create scroll triggers
    ScrollTrigger.create({
      trigger: ".button-shop",
      start: "top 75%",
      onEnter: () => {
        gsap.to(".button-shop", {
          clipPath: "inset(0% 0% 0% 0%)",
          yPercent: 0,
          ...animConfig,
        });
      },
    });

    ScrollTrigger.create({
      trigger: ".container-card-product",
      start: "top 75%",
      onEnter: () => {
        gsap.to(cardSelectors, {
          clipPath: "inset(0% 0% 0% 0%)",
          yPercent: 0,
          ...animConfig,
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
          ...animConfig,
        });

        gsap.to(".text-pagination-left", {
          clipPath: "inset(0% 0% 0% 0%)",
          xPercent: 0,
          ...animConfig,
        });

        gsap.to(".text-pagination-right", {
          clipPath: "inset(0% 0% 0% 0%)",
          xPercent: 0,
          ...animConfig,
        });
      },
    });
  }, [shopProducts]);

  // Memoized product slides - now one product per slide
  const productSlides = useMemo(
    () =>
      shopProducts.map((product) => (
        <SwiperSlide key={`slide-${product.id}`}>
          <div className="flex justify-center">
            <CardProduct
              className={`card-product-${product.id}`}
              key={product.id}
              title={product.title}
              imageSrc={product.imageSrc}
              imageAlt={product.imageAlt}
            />
          </div>
        </SwiperSlide>
      )),
    [shopProducts]
  );

  return (
    <div className="w-full h-screen bg-seashell px-20d relative overflow-hidden container-shop-our-products">
      {/* Tab buttons */}
      <div className="grid grid-cols-2 mt-[8vh] h-72d">
        <Button
          showIcon
          variant="secondary"
          className={`uppercase h-full font-abc text-16d button-shop ${
            activeTab === "shop" ? "active" : ""
          }`}
          onClick={() => handleTabChange("shop")}
        >
          shop our products
        </Button>
        <Button
          showIcon
          variant="secondary"
          className={`uppercase h-full font-abc text-16d button-shop ${
            activeTab === "create" ? "active" : ""
          }`}
          onClick={() => handleTabChange("create")}
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
            slidesPerView={3}
            speed={3000}
            onSwiper={setSwiper}
            onSlideChange={handleSlideChange}
            allowTouchMove={true}
            watchSlidesProgress={true}
          >
            {productSlides}
          </Swiper>

          {/* Navigation controls */}
          <div className="flex items-center justify-between absolute bottom-[5vh] w-full left-0 container-pagination">
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

      {/* Create Your Own Section */}
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
