import useRevealAnimation from "@/app/hooks/useRevealAnimation";
import React from "react";
import gsap from "gsap";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  useRevealAnimation({ selector: ".creations-anim", startMd: "top 150%" });

  // Handler for category change with animation
  const handleCategoryChange = (category: string) => {
    // Skip animation if selecting the same category
    if (category === selectedCategory) return;
    // Apply animation similar to view mode change
    gsap.to(".grid-anim", {
      opacity: 0,
      y: "2%",
      duration: 0.6,
      ease: "power1.inOut",
      onComplete: () => {
        onCategoryChange(category);
        gsap.to(".grid-anim", {
          opacity: 1,
          y: "0%",
          duration: 0.6,
          ease: "power1.inOut",
        });
      },
    });
  };

  return (
    <div>
      <p className="font-bold mb-24d font-abc text-ruby-red hero-creations">
        CATEGORIES
      </p>
      <div className="flex flex-col gap-10d pl-20d">
        {categories.map((category) => (
          <label
            key={category}
            className={`flex items-center space-x-2 creations-anim cursor-pointer transition-opacity duration-300 ease-in-out ${
              selectedCategory === category ? "opacity-100" : "opacity-50"
            }`}
          >
            <input
              type="radio"
              name="category"
              checked={selectedCategory === category}
              onChange={() => handleCategoryChange(category)}
              className="accent-ruby-red"
            />
            <span className="text-10d text-ruby-red">{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
