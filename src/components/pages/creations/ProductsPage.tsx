import React, { useState } from "react";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import PriceRange from "./PriceRange";
import ViewOptions from "./ViewOptions";
import ProductsGrid from "./ProductsGrid";
import ScrollToTop from "./ScrollToTop";
import { products, categories } from "./productData";

const ProductsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"small" | "large">("small");
  const [priceRange, setPriceRange] = useState<[number, number]>([60, 300]);
  const [selectedCategory, setSelectedCategory] = useState<string>("SHOW ALL");

  // Filter products based on category and price range
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "SHOW ALL" ||
      product.name.includes(selectedCategory);
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return categoryMatch && priceMatch;
  });

  return (
    <div className="min-h-screen mt-200d">
      {/* Main Container */}
      <div className="px-20d">
        {/* Filter Section */}
        <div className="flex flex-col space-y-8">
          {/* Categories and Products Grid */}
          <div className="grid grid-cols-12 gap-55d">
            {/* Sidebar: Categories & Price Range */}
            <div className="col-span-3 w-2/3 flex flex-col gap-55d">
              <div className="flex items-center justify-between">
                <p className="text-ruby-red font-bold font-abc hero-creations">
                  FILTER
                </p>
              </div>
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              <PriceRange
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </div>

            {/* Products Section */}
            <div className="w-full col-span-9">
              <SearchBar />
              <ViewOptions
                viewMode={viewMode}
                setViewMode={setViewMode}
                itemCount={filteredProducts.length}
              />

              <ProductsGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {/* <ScrollToTop /> */}
    </div>
  );
};

export default ProductsPage;
