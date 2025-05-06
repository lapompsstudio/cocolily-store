import Button from "@/components/ui/button";
import React, { useRef } from "react";
import gsap from "gsap";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
}) => {
  // Function to handle the search animation and submission
  const handleSearch = () => {
    // Create animation exactly like the ViewOptions component
    gsap.to(".grid-anim", {
      opacity: 0,
      y: "2%",
      duration: 0.6,
      ease: "power1.inOut",
      onComplete: () => {
        // Call the actual search function
        onSearchSubmit();
        // Animate back in
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
    <div className="relative w-full mb-45d flex items-end gap-20d creations-anim">
      <input
        type="text"
        placeholder="Type something..."
        className="w-full border-b border-ruby-red placeholder:text-ruby-red/30 text-20d text-ruby-red bg-ivory-blush pb-1 focus:outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}
      />
      <Button
        buttonType="button"
        onClick={handleSearch}
        className="uppercase w-max"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
