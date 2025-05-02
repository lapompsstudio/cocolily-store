import React from "react";

interface ViewOptionsProps {
  viewMode: "small" | "large";
  setViewMode: (mode: "small" | "large") => void;
  itemCount: number;
}

const ViewOptions: React.FC<ViewOptionsProps> = ({
  viewMode,
  setViewMode,
  itemCount,
}) => {
  return (
    <div className="mb-40d grid grid-cols-4 gap-20d">
      <p className="text-10d text-ruby-red col-span-2">
        {itemCount} ITEMS FOUND
      </p>

      <div className="col-span-2 flex items-center justify-between">
        <div className="flex items-center gap-60d">
          <div className="text-10d font-bold text-ruby-red">BROWSE IN</div>

          <div className="flex items-center gap-20d">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name="viewMode"
                value="small"
                checked={viewMode === "small"}
                onChange={() => setViewMode("small")}
                className="accent-ruby-red"
              />
              <span className="ml-2 text-10d text-ruby-red">SMALL VIEW</span>
            </label>

            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name="viewMode"
                value="large"
                checked={viewMode === "large"}
                onChange={() => setViewMode("large")}
                className="accent-ruby-red"
              />
              <span className="ml-2 text-10d text-ruby-red">LARGE VIEW</span>
            </label>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-10d font-bold text-ruby-red">SORT BY</span>
          <button className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-ruby-red"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewOptions;
