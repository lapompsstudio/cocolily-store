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
  return (
    <div>
      <p className="font-bold mb-24d font-abc text-ruby-red hero-creations">
        CATEGORIES
      </p>
      <div className="flex flex-col gap-10d pl-20d">
        {categories.map((category) => (
          <label key={category} className="flex items-center space-x-2">
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
