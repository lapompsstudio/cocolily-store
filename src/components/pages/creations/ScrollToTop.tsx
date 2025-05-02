import React from "react";
import { ArrowUpIcon } from "lucide-react";

const ScrollToTop: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className="fixed bottom-6 right-6 bg-white rounded-full p-3 shadow-md"
      onClick={scrollToTop}
    >
      <ArrowUpIcon size={20} />
    </button>
  );
};

export default ScrollToTop;
