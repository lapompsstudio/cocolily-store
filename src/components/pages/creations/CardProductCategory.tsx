"use client";

import Image from "next/image";
import React from "react";
import GradientImage from "@/components/ui/GradientImage";
import clsx from "clsx";
import Button from "@/components/ui/button";

// Define types for the component props
interface CardProductProps {
  title?: string;
  imageSrc?: string;
  price?: string;
  className?: string;
  isSoldOut?: boolean;
  isBestSeller?: boolean;
  isVegan?: boolean;
}

export default function CardProductCategory({
  title = "HAZELNUT GIANDUJA",
  imageSrc = "/images/our-products/image.png",
  price = "$39.95",
  className,
  isSoldOut = false,
  isBestSeller = false,
  isVegan = false,
}: CardProductProps): JSX.Element {
  return (
    <div className={clsx("w-full", className)}>
      <div className="relative rounded-3xl overflow-hidden shadow-md">
        {/* Product Image */}
        <div className="relative w-full aspect-square overflow-hidden">
          <GradientImage src={imageSrc} />
        </div>

        {/* Tags Container */}
        <div className="absolute top-4 left-0 right-0 flex justify-between px-4">
          {/* Left Tags */}
          <div>
            {isSoldOut && (
              <span className="inline-block bg-ruby-red text-white rounded-full px-6 py-2 font-medium text-sm">
                SOLD OUT
              </span>
            )}
          </div>

          {/* Right Tags */}
          <div className="flex flex-col gap-2 items-end">
            {isBestSeller && (
              <span className="inline-block bg-ruby-red text-white rounded-full px-6 py-2 font-medium text-sm">
                BEST SELLER
              </span>
            )}
            {isVegan && (
              <span className="inline-block bg-ruby-red text-white rounded-full px-6 py-2 font-medium text-sm">
                VEGAN
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          <p className="text-ruby-red font-bold text-xl font-abc uppercase">
            {title}
          </p>
          <p className="text-ruby-red text-12d">{price}</p>
        </div>
        <Button
          buttonType="link"
          href="/"
          isHoverTranslate
          className="w-max uppercase font-sans"
        >
          add to cart
        </Button>
      </div>
    </div>
  );
}
