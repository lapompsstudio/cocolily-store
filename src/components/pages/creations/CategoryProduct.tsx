"use client";
import ArrowButton from "@/components/ui/ArrowButton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useCallback, useEffect, useMemo, useState } from "react";

// Swiper imports
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CardProductCategory from "./CardProductCategory";

// Enhanced Product interface with all required properties
interface Product {
  id: number;
  title: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  isSoldOut: boolean;
  isBestSeller: boolean;
  isVegan: boolean;
}

// Add props interface for CategoryProduct
interface CategoryProductProps {
  categoryTitle?: string;
  shopProducts: Product[];
}

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function CategoryProduct({
  categoryTitle = "Best Selling Chocolates",
  shopProducts,
}: CategoryProductProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<"shop" | "create">("shop");
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

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
      // markers: true,
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

  // Updated ProductSlides to pass all properties to CardProductCategory
  const productSlides = useMemo(
    () =>
      shopProducts.map((product) => (
        <SwiperSlide key={`slide-${product.id}`}>
          <div className="flex justify-center">
            <CardProductCategory
              // className={`card-product-${product.id}`}
              key={product.id}
              title={product.title}
              imageSrc={product.imageSrc}
              price={product.price}
              isSoldOut={product.isSoldOut}
              isBestSeller={product.isBestSeller}
              isVegan={product.isVegan}
            />
          </div>
        </SwiperSlide>
      )),
    [shopProducts]
  );

  return (
    <div className="w-full bg-seashell px-20d relative overflow-hidden container-shop-our-products">
      <div className="flex items-center justify-between w-full container-pagination">
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
        <h4 className="font-abc text-ruby-red uppercase">{categoryTitle}</h4>
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
      <div className="mt-60d container-card-product">
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
      </div>
    </div>
  );
}
