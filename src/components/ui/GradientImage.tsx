"use client";
import { cx } from "class-variance-authority";
import Image from "next/image";
import { useState } from "react";

const gradientVariants = {
  white: "gradient-white",
} as const;

const fitVariants = {
  cover: "object-cover", // Mobile default
  contain: "object-contain",
} as const;

type GradientVariant = keyof typeof gradientVariants;
type FitVariant = keyof typeof fitVariants;

interface GradientImageProps {
  src: string;
  gradientVariant?: GradientVariant; // Default is 'white'
  fitVariant?: FitVariant; // Default is 'cover'
  className?: string; // Additional class names
  style?: React.CSSProperties; // Custom inline styles
  alt?: string; // Alt text for the image
}

export default function GradientImage({
  src,
  gradientVariant = "white",
  fitVariant = "cover",
  className = "",
  style = {}, // Default empty object for inline styles
  alt = "image", // Default alt text
}: GradientImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false); // State to track if the image failed to load

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true); // Set error state if image fails to load
  };

  const gradientClass =
    gradientVariants[gradientVariant] || gradientVariants.white;

  const fitClass = fitVariants[fitVariant] || fitVariants.cover;

  // Check if the src is valid before rendering the Image component
  const shouldRenderImage = src && !hasError;

  return (
    <div className={cx("relative w-full h-full")}>
      {isLoading && !hasError && (
        <div className={cx("absolute inset-0", gradientClass)}></div>
      )}
      {shouldRenderImage && (
        <Image
          src={src}
          fill
          alt={alt || "image"}
          className={cx(
            "transition-opacity duration-400 ease-in-out",
            isLoading ? "opacity-0" : "opacity-100",
            fitClass,
            className
          )}
          style={{
            transition: "opacity 0.4s ease-in-out",
            ...style, // Apply custom inline styles
          }}
          onLoad={handleLoad}
          onError={handleError} // Handle image loading error
        />
      )}
    </div>
  );
}
