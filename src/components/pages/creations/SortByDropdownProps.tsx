import React, { useState, useRef, useEffect } from "react";

interface SortByDropdownProps {
  onSortChange: (sortOption: string) => void;
  initialSort?: string;
}

const SortByDropdown: React.FC<SortByDropdownProps> = ({
  onSortChange,
  initialSort = "LATEST ADD",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialSort);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Custom colors
  const rubyRed = "#DB0032";
  const rubyRedDark = "#B00029"; // Darker shade for selected item
  const rubyRedHover = "#C5002D"; // Hover state shade

  const sortOptions = [
    "LATEST ADD",
    "BEST SELLING",
    "PRICE, LOW TO HIGH",
    "PRICE, HIGH TO LOW",
    "ALPHABETICAL, A - Z",
    "ALPHABETICAL, Z - A",
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    // Skip if the option is already selected
    if (option === selectedOption) {
      setIsOpen(false); // Just close the dropdown
      return;
    }
    setSelectedOption(option);
    onSortChange(option);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Sort By Button */}
      <div
        className="flex items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <span style={{ color: rubyRed }} className="text-10d font-bold">
          SORT BY
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          stroke={rubyRed}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {/* Dropdown Menu */}
      <div
        style={{ backgroundColor: rubyRed }}
        className={`absolute right-0 mt-2 w-max rounded-xl shadow-lg z-50 overflow-hidden transition-all duration-500 origin-top ${
          isOpen
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="m-4">
          {sortOptions.map((option, index) => (
            <div
              key={index}
              style={{
                backgroundColor:
                  selectedOption === option ? rubyRedDark : rubyRed,
                fontWeight: selectedOption === option ? "bold" : "normal",
              }}
              className={`px-4 py-2 text-white transition-colors duration-200 text-10d rounded-lg ${
                selectedOption === option
                  ? "cursor-default" // Change cursor for selected option
                  : "hover:bg-opacity-90 cursor-pointer"
              }`}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={(e) => {
                if (selectedOption !== option) {
                  e.currentTarget.style.backgroundColor = rubyRedHover;
                }
              }}
              onMouseLeave={(e) => {
                if (selectedOption !== option) {
                  e.currentTarget.style.backgroundColor = rubyRed;
                }
              }}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortByDropdown;
