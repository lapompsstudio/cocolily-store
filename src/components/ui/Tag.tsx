import React from "react";

import clsx from "clsx";

interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

const Tag: React.FC<TagProps> = ({
  children,
  className = "",
  variant = "primary",
}) => {
  return (
    <div
      className={clsx(
        "px-22d h-37d rounded-full flex items-center justify-center font-semibold",
        {
          "bg-ruby-red text-white": variant === "primary",
          "bg-transparent text-ruby-red border border-ruby-red":
            variant === "secondary",
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default Tag;
