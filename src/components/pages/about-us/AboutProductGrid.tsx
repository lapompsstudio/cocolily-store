import GradientImage from "@/components/ui/GradientImage";
import React from "react";

const AboutProductGrid = () => {
  return (
    <div className="relative h-screen overflow-hidden bg-baby-pink w-full place-content-center font-bold text-ruby-red">
      <div className="absolute top-0 w-full h-[40vh] z-10 bg-gradient-to-b from-baby-pink"></div>
      <div className="grid grid-cols-3 gap-20d px-20d">
        <div className="w-full flex flex-col gap-20d translate-y-[-5%]">
          <div className="relative w-full h-[70vh] rounded-32d overflow-hidden">
            <GradientImage src="/product-grid/1.png" fitVariant="cover" />
          </div>
          <div className="relative w-full h-[70vh] rounded-32d overflow-hidden">
            <GradientImage src="/product-grid/4.png" fitVariant="cover" />
          </div>
        </div>
        <div className="w-full flex flex-col gap-20d translate-y-[-30%]">
          <div className="relative w-full h-[70vh] rounded-32d overflow-hidden">
            <GradientImage src="/product-grid/2.png" fitVariant="cover" />
          </div>
          <div className="relative w-full h-[70vh] rounded-32d overflow-hidden">
            <GradientImage src="/product-grid/5.png" fitVariant="cover" />
          </div>
          <div className="relative w-full h-[70vh] rounded-32d overflow-hidden">
            <GradientImage src="/product-grid/7.png" fitVariant="cover" />
          </div>
        </div>
        <div className="w-full flex flex-col gap-20d translate-y-[-15%]">
          <div className="relative w-full h-[70vh] rounded-32d overflow-hidden">
            <GradientImage src="/product-grid/3.png" fitVariant="cover" />
          </div>
          <div className="relative w-full h-[70vh] rounded-32d overflow-hidden">
            <GradientImage src="/product-grid/6.png" fitVariant="cover" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-[40vh] z-10 bg-gradient-to-t from-baby-pink"></div>
    </div>
  );
};

export default AboutProductGrid;
