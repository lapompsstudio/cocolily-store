import useSplitTextAnimation from "@/app/hooks/useSplitTextAnimation";
import React from "react";

export default function Hero() {
  useSplitTextAnimation({ selector: ".hero-creations" });
  return (
    <div className="pt-150d text-ruby-red grid grid-cols-12 gap-20d">
      <h1 className="font-abc uppercase col-span-8 hero-creations">
        Creations
      </h1>
      <p className="text-12d col-span-4 mt-[11%] hero-creations">
        Welcome to Cocolily Creations — where imagination and craftsmanship come
        together beautifully. Discover signature chocolates and playful flavors
        crafted for pure indulgence and joy.
      </p>
    </div>
  );
}
