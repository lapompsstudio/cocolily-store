import React, { useState, useEffect } from "react";
import CategoryFilter from "./CategoryFilter";
import PriceRange from "./PriceRange";
import ProductsGrid from "./ProductsGrid";
import SearchBar from "./SearchBar";
import ViewOptions from "./ViewOptions";
import { categories, products } from "./productData";
import useRevealAnimation from "@/app/hooks/useRevealAnimation";
import ScrollToTop from "./ScrollToTop";
import ArrowButton from "@/components/ui/ArrowButton";
import { useLenis } from "lenis/react";

const ProductsPage: React.FC = () => {
  const lenis = useLenis();
  // Calculate min and max prices from products
  const minPrice = Math.min(...products.map((product) => product.price));
  const maxPrice = Math.max(...products.map((product) => product.price));

  const [viewMode, setViewMode] = useState<"small" | "large">("small");
  // Initialize price range with the calculated min and max
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>("SHOW ALL");
  const [sortOption, setSortOption] = useState<string>("LATEST ADD");
  const [sortedProducts, setSortedProducts] = useState([...products]);
  const [displayedProducts, setDisplayedProducts] = useState([...products]); // Initially show all products
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState<string>("");
  const [filtersActive, setFiltersActive] = useState(false);

  // Handle sorting when sort option changes
  useEffect(() => {
    // Important: Clone the original products array to avoid modifying it
    const productsToSort = [...products];

    switch (sortOption) {
      case "LATEST ADD":
        // For "LATEST ADD", we'll use the product ID as a proxy for recency
        productsToSort.sort((a, b) => b.id - a.id);
        break;

      case "BEST SELLING":
        // For "BEST SELLING", prioritize products marked as bestsellers
        productsToSort.sort((a, b) => {
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          return 0;
        });
        break;

      case "PRICE, LOW TO HIGH":
        productsToSort.sort((a, b) => a.price - b.price);
        break;

      case "PRICE, HIGH TO LOW":
        productsToSort.sort((a, b) => b.price - a.price);
        break;

      case "ALPHABETICAL, A - Z":
        productsToSort.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "ALPHABETICAL, Z - A":
        productsToSort.sort((a, b) => b.name.localeCompare(a.name));
        break;

      default:
        // Default to ID order (newest first)
        productsToSort.sort((a, b) => b.id - a.id);
    }

    setSortedProducts(productsToSort);

    // If no filters are active, update displayed products with sorted products
    if (!filtersActive) {
      setDisplayedProducts(productsToSort);
    } else {
      // If filters are active, apply filtering
      applyFilters(productsToSort);
    }
  }, [sortOption]);

  // Function to apply all filters
  const applyFilters = (productsToFilter = sortedProducts) => {
    const filtered = productsToFilter.filter((product) => {
      // For category filtering, check if the product belongs to a category
      const categoryMatch =
        selectedCategory === "SHOW ALL" ||
        (product.category && product.category === selectedCategory) ||
        (product.name && product.name.includes(selectedCategory));

      // Price range filtering
      const priceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      // Search query filtering (case insensitive) - only applied when search button is clicked
      const searchMatch =
        appliedSearchQuery === "" ||
        product.name.toLowerCase().includes(appliedSearchQuery.toLowerCase()) ||
        (product.category &&
          product.category
            .toLowerCase()
            .includes(appliedSearchQuery.toLowerCase()));

      return categoryMatch && priceMatch && searchMatch;
    });

    setDisplayedProducts(filtered);
    setFiltersActive(true);
  };

  // Apply filters when category or price range changes
  useEffect(() => {
    if (
      selectedCategory !== "SHOW ALL" ||
      priceRange[0] !== minPrice ||
      priceRange[1] !== maxPrice
    ) {
      applyFilters();
      setFiltersActive(true);
    } else if (appliedSearchQuery === "") {
      // If all filters are at default values and no search query, show all products
      setDisplayedProducts(sortedProducts);
      setFiltersActive(false);
    } else {
      // If only search is active
      applyFilters();
      setFiltersActive(true);
    }
  }, [selectedCategory, priceRange, appliedSearchQuery]);

  // Handle sort option change
  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  // Handle search query change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Handle search button click
  const handleSearchSubmit = () => {
    setAppliedSearchQuery(searchQuery);
    if (searchQuery !== "") {
      setFiltersActive(true);
    } else if (
      selectedCategory === "SHOW ALL" &&
      priceRange[0] === minPrice &&
      priceRange[1] === maxPrice
    ) {
      setFiltersActive(false);
    }
    console.log("Search submitted:", searchQuery);
  };

  useRevealAnimation({
    selector: ".creations-anim-product",
    startMd: "top 150%",
    // markers: true,
  });

  return (
    <div className="min-h-screen">
      {/* Main Container */}
      <div className="px-20d">
        {/* Filter Section */}
        <div className="flex flex-col space-y-8">
          {/* Categories and Products Grid */}
          <div className="grid grid-cols-12 gap-55d" id="top-page-creations">
            {/* Sidebar: Categories & Price Range */}
            <div className="col-span-3 w-2/3 flex flex-col gap-55d sticky top-0 z-10 h-screen">
              <div className="flex items-center justify-between mt-[18vh]">
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
                min={minPrice}
                max={maxPrice}
              />
              <button
                onClick={() => {
                  lenis?.scrollTo("#top-page-creations");
                }}
                type="button"
                aria-label="Previous slide"
                className="rotate-90 absolute bottom-[5vh] left-[90vw]"
              >
                <ArrowButton variant="secondary" icon="arrow-left" />
              </button>
            </div>
            {/* Products Section */}
            <div className="w-full col-span-9 mt-[18vh]">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
              />
              <ViewOptions
                viewMode={viewMode}
                setViewMode={setViewMode}
                itemCount={displayedProducts.length}
                onSortChange={handleSortChange}
              />
              <ProductsGrid viewMode={viewMode} products={displayedProducts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
