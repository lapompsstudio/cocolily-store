import React from "react";
import Link from "next/link";
import clsx from "clsx";
import IconMaroon from "./IconMaroon";

type ButtonType = {
  children: React.ReactNode;
  buttonType?: "button" | "link";
  variant?: "primary" | "secondary";
  href?: string;
  showIcon?: boolean;
  className?: string;
  isHoverTranslate?: boolean;
  isActive?: boolean;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
};

const Button = ({
  children,
  buttonType = "button",
  variant = "primary",
  href = "/",
  className,
  showIcon = false,
  isHoverTranslate = false,
  isActive = false,
  ...props
}: ButtonType &
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <>
      {buttonType === "button" ? (
        <button
          className={clsx(
            "btn-primary px-22d py-12d text-ruby-red leading-none border border-ruby-red rounded-full text-12d font-semibold whitespace-nowrap flex items-center justify-center min-w-fit gap-16d",
            {
              "bg-ivory": variant === "primary",
              "bg-transparent": variant === "secondary",
              "translate-anim": isHoverTranslate,
              active: isActive,
            },
            className
          )}
          {...props}
        >
          {showIcon && (
            <div className={clsx("w-40d h-40d relative")}>
              <IconMaroon className={clsx("translate-anim-icon")} />
            </div>
          )}
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
              active: isActive,
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
