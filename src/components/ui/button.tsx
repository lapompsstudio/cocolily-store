import React from "react";
import Link from "next/link";
import clsx from "clsx";

type ButtonType = {
  children: React.ReactNode;
  buttonType?: "button" | "link";
  variant?: "primary" | "secondary";
  href?: string;
  className?: string;
  isHoverTranslate?: boolean;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
};

const Button = ({
  children,
  buttonType = "button",
  variant = "primary",
  href = "/",
  className,
  isHoverTranslate = false,
  ...props
}: ButtonType &
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <>
      {buttonType === "button" ? (
        <button
          className={clsx(
            "btn-primary px-22d py-12d text-ruby-red leading-none border border-ruby-red rounded-full text-12d font-semibold whitespace-nowrap flex items-center justify-center min-w-fit",
            {
              "bg-ivory": variant === "primary",
              "bg-transparent": variant === "secondary",
              "translate-anim": isHoverTranslate,
            },
            className
          )}
          {...props}
        >
          {children}
        </button>
      ) : (
        <Link
          href={href}
          className={clsx(
            "btn-primary px-22d py-12d text-ruby-red leading-none border border-ruby-red rounded-full text-12d font-semibold whitespace-nowrap flex items-center justify-center min-w-fit",
            {
              "bg-ivory": variant === "primary",
              "bg-transparent": variant === "secondary",
              "translate-anim": isHoverTranslate,
            },
            className
          )}
          {...props}
        >
          {children}
        </Link>
      )}
    </>
  );
};

export default Button;
