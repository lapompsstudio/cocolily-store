import React, { useState, useRef, useEffect } from "react";

interface PriceRangeProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  min?: number;
  max?: number;
}

const PriceRange: React.FC<PriceRangeProps> = ({
  priceRange,
  setPriceRange,
  min = 0,
  max = 500,
}) => {
  const [isDragging, setIsDragging] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(index);
  };

  const handleChange = (index: number, value: number) => {
    const newRange = [...priceRange] as [number, number];

    // Prevent handles from crossing each other
    if (index === 0) {
      // Minimum handle - can't go beyond maximum handle
      newRange[index] = Math.min(value, priceRange[1] - 1);
    } else {
      // Maximum handle - can't go behind minimum handle
      newRange[index] = Math.max(value, priceRange[0] + 1);
    }

    setPriceRange(newRange);
  };

  const handleInputChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10) || 0;

      // Constrain input values to prevent overlap
      if (index === 0) {
        // Minimum value can't exceed maximum value
        handleChange(index, Math.min(value, priceRange[1] - 1));
      } else {
        // Maximum value can't be less than minimum value
        handleChange(index, Math.max(value, priceRange[0] + 1));
      }
    };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging !== null && sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        const percent = Math.max(
          0,
          Math.min(1, (e.clientX - rect.left) / rect.width)
        );
        const value = Math.round(min + percent * (max - min));

        // Apply constraints when dragging
        if (isDragging === 0) {
          // Minimum handle - can't go beyond maximum handle
          handleChange(isDragging, Math.min(value, priceRange[1] - 1));
        } else {
          // Maximum handle - can't go behind minimum handle
          handleChange(isDragging, Math.max(value, priceRange[0] + 1));
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(null);
    };

    if (isDragging !== null) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, min, max, priceRange]);

  // Calculate positions
  const getPosition = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <div>
      <p className="font-bold mb-24d font-abc text-ruby-red">PRICE</p>
      <div className="pl-20d">
        {/* Custom Range Slider */}
        <div className="relative h-6" ref={sliderRef}>
          {/* Track Line - Lower opacity before selected range */}
          <div className="absolute top-3 left-0 right-0 h-0.5 bg-red-200"></div>

          {/* Selected Range Track */}
          <div
            className="absolute top-3 h-0.5 bg-red-600"
            style={{
              left: `${getPosition(priceRange[0])}%`,
              right: `${100 - getPosition(priceRange[1])}%`,
            }}
          ></div>

          {/* Handles */}
          <div
            className="absolute w-13d h-13d bg-red-600 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              left: `${getPosition(priceRange[0])}%`,
              top: "50%",
            }}
            onMouseDown={handleDragStart(0)}
          ></div>
          <div
            className="absolute w-13d h-13d bg-red-600 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              left: `${getPosition(priceRange[1])}%`,
              top: "50%",
            }}
            onMouseDown={handleDragStart(1)}
          ></div>
        </div>

        {/* Price Inputs */}
        <div className="flex justify-between items-center mt-6 gap-12d">
          <div className="border border-red-600 rounded-full px-3 py-2 flex items-center">
            <span className="text-red-600 text-10d mr-2">AED</span>
            <input
              type="text"
              value={priceRange[0]}
              onChange={handleInputChange(0)}
              className="w-5 text-red-600 bg-transparent focus:outline-none text-10d"
            />
          </div>
          <span className="text-red-600 font-medium text-10d">TO</span>
          <div className="border border-red-600 rounded-full px-3 py-2 flex items-center">
            <span className="text-red-600 text-10d mr-2">AED</span>
            <input
              type="text"
              value={priceRange[1]}
              onChange={handleInputChange(1)}
              className="w-5 text-red-600 bg-transparent focus:outline-none text-10d"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
