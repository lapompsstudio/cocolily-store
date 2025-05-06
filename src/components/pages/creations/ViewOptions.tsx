import gsap from "gsap";
import React, { useState } from "react";
import SortByDropdown from "./SortByDropdownProps";

interface ViewOptionsProps {
  viewMode: "small" | "large";
  setViewMode: (mode: "small" | "large") => void;
  itemCount: number;
  onSortChange?: (sortOption: string) => void;
}

const ViewOptions: React.FC<ViewOptionsProps> = ({
  viewMode,
  setViewMode,
  itemCount,
  onSortChange = () => {},
}) => {
  const handleViewModeChange = (mode: "small" | "large") => {
    // Skip animation if selecting the same view mode
    if (mode === viewMode) return;

    gsap.to(".grid-anim", {
      opacity: 0,
      y: "2%",
      duration: 0.6,
      ease: "power1.inOut",
      onComplete: () => {
        setViewMode(mode);
        gsap.to(".grid-anim", {
          opacity: 1,
          y: "0%",
          duration: 0.6,
          ease: "power1.inOut",
        });
      },
    });
  };

  const handleSortChange = (sortOption: string) => {
    // Apply animation similar to view mode change
    gsap.to(".grid-anim", {
      opacity: 0,
      y: "2%",
      duration: 0.6,
      ease: "power1.inOut",
      onComplete: () => {
        onSortChange(sortOption);
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
    <div className="mb-40d grid grid-cols-4 gap-20d">
      <p className="text-10d text-ruby-red col-span-2">
        {itemCount} ITEMS FOUND
      </p>
      <div className="col-span-2 flex items-center justify-between">
        <div className="flex items-center gap-60d">
          <div className="text-10d font-bold text-ruby-red">BROWSE IN</div>
          <div className="flex items-center gap-20d">
            <label
              className={`inline-flex items-center cursor-pointer transition-opacity duration-300 ease-in-out ${viewMode === "small" ? "opacity-100" : "opacity-50"}`}
            >
              <input
                type="radio"
                name="viewMode"
                value="small"
                checked={viewMode === "small"}
                onChange={() => handleViewModeChange("small")}
                className="accent-ruby-red"
              />
              <span className="ml-2 text-10d text-ruby-red">SMALL VIEW</span>
            </label>
            <label
              className={`inline-flex items-center cursor-pointer transition-opacity duration-500 ease-in-out ${viewMode === "large" ? "opacity-100" : "opacity-30"}`}
            >
              <input
                type="radio"
                name="viewMode"
                value="large"
                checked={viewMode === "large"}
                onChange={() => handleViewModeChange("large")}
                className="accent-ruby-red"
              />
              <span className="ml-2 text-10d text-ruby-red">LARGE VIEW</span>
            </label>
          </div>
        </div>
        {/* Replace the original sort by button with our new component */}
        <SortByDropdown onSortChange={handleSortChange} />
      </div>
    </div>
  );
};

export default ViewOptions;
