"use client";

import React, { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import "swiper/css";

import ArrowButton from "@/components/ui/ArrowButton";
import { products } from "../productData";
import ProductCard from "../ProductCard";

const CreationProductRelated = () => {
  // Create a properly typed ref for the Swiper instance
  const swiperRef = useRef<SwiperRef>(null);

  // Function to slide to the previous slide
  const slidePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  // Function to slide to the next slide
  const slideNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="px-20d pt-95d">
      <div className="w-full mt-20d flex items-center justify-between z-50 relative px-10d">
        <div onClick={slidePrev}>
          <ArrowButton icon="arrow-left" variant="secondary" />
        </div>
        <div>
          <h3 className="font-abc text-16d  font-bold text-center uppercase text-ruby-red">
            You may also like
          </h3>
        </div>
        <div onClick={slideNext}>
          <ArrowButton variant="secondary" />
        </div>
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        ref={swiperRef}
        className="mt-24d"
      >
        {products.map((product, i) => (
          <SwiperSlide key={i}>
            <ProductCard
              key={product.id}
              product={product}
              imageWrapperClass="h-479d"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CreationProductRelated;
