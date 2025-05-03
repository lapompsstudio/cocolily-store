import useRevealAnimation from "@/app/hooks/useRevealAnimation";
import React from "react";

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
  useRevealAnimation({
    selector: ".creations-anim-product",
    startMd: "top 130%",
    // markers: true,
  });
  return (
    <div>
      <p className="font-bold mb-24d font-abc text-ruby-red hero-creations">
        CATEGORIES
      </p>
      <div className="flex flex-col gap-10d pl-20d">
        {categories.map((category) => (
          <label
            key={category}
            className="flex items-center space-x-2 creations-anim"
          >
            <input
              type="radio"
              name="category"
              checked={selectedCategory === category}
              onChange={() => onCategoryChange(category)}
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
