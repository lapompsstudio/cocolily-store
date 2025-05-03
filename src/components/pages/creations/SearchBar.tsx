import Button from "@/components/ui/button";
import React, { useState } from "react";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="relative w-full mb-45d flex items-end gap-20d creations-anim">
      <input
        type="text"
        placeholder="Type something..."
        className="w-full border-b border-ruby-red placeholder:text-ruby-red/30 text-20d text-ruby-red bg-ivory-blush pb-1 focus:outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button buttonType="button" className="uppercase w-max">
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
