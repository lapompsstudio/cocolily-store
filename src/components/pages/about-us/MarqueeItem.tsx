import { useState } from "react";
import clsx from "clsx";

import GradientImage from "@/components/ui/GradientImage";

interface MarqueeItemProps {
  src: string;
  index: number;
  setIsHovering: React.Dispatch<React.SetStateAction<boolean>>;
}

const MarqueeItem = ({ src, index, setIsHovering }: MarqueeItemProps) => {
  const [isItemHovered, setIsItemHovered] = useState(false);

  return (
    <div
      key={`slide-${index}`}
      className="flex-shrink-0 w-52 h-52"
      onMouseEnter={() => {
        setIsItemHovered(true);
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsItemHovered(false);
        setIsHovering(false);
      }}
    >
      <div
        className={clsx(
          "w-full h-full rounded-full overflow-hidden border border-white transition-all duration-300",
          isItemHovered ? "bg-white" : "bg-transparent"
        )}
      >
        <GradientImage
          src={src}
          fitVariant="contain"
          className={clsx(
            "w-full h-full object-contain p-6 transition-all duration-300 cursor-pointer",
            !isItemHovered && "invert brightness-0"
          )}
          alt="collaboration image"
        />
      </div>
    </div>
  );
};

export default MarqueeItem;
