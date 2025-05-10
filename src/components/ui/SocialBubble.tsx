import React from "react";
import Link from "next/link";
import clsx from "clsx";

type SocialBubbleProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const SocialBubble = ({
  children,
  href,
  className = "",
  ...props
}: SocialBubbleProps) => {
  return (
    <Link
      href={href}
      className={clsx(
        "bg-baby-pink absolute w-70d h-70d rounded-full flex items-center justify-center border-[5px] border-white -rotate-[14.02deg] z-30",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default SocialBubble;
