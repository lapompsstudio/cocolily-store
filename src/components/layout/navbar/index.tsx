"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MorphSVGPlugin } from "gsap/all";

import Logo from "@/components/ui/logo";
import LogoMobile from "@/components/ui/LogoMobile";
import Button from "@/components/ui/button";

// TODO: Add AuthBtn, CartModal, Search on phase 2
// import { getMenu } from "@/lib/shopify";
// import Search from "./search";
// import CartModal from "@/components/cart/modal";
// import AuthBtn from "@/components/layout/navbar/auth-btn";
import { useNavbarColorStore } from "@/store/navbarColorStore";
import useMediaQueries from "@/hooks/useMediaQueries";
import MobileMenu from "./MobileMenu";

gsap.registerPlugin(MorphSVGPlugin);

export function Navbar() {
  const navbarRef = useRef<HTMLDivElement>(null);
  const { isNavbarWhite } = useNavbarColorStore();
  const { isMobile } = useMediaQueries();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (!navbarRef.current) return;
      gsap.to(navbarRef.current, {
        y: "0%",
        duration: 1.2,
        ease: "power1.inOut",
        delay: 2.2,
      });

      if (isMobile) {
        menuTimelineRef.current = gsap.timeline({ paused: true });
        menuTimelineRef.current
          .to(".mobile-menu-wrapper", {
            y: "0%",
            duration: 0.6,
            ease: "power1.inOut",
          })
          .to(
            [".icon-logo-mobile path", ".hamburger-toggle svg rect"],
            {
              fill: "white",
              duration: 0.6,
              ease: "power1.inOut",
            },
            "<"
          )
          .to(
            ".line-hamburger",
            {
              autoAlpha: 0,
              duration: 0.6,
              ease: "power1.inOut",
            },
            "<"
          )
          .to(
            ".cross-burger",
            {
              autoAlpha: 1,
              duration: 0.6,
              ease: "power1.inOut",
            },
            "<"
          )
          .to(".mobile-menu-reveal", {
            y: "0%",
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.6,
            ease: "power1.inOut",
          })
          .to(
            ".mobile-menu-social-reveal",
            {
              y: "0%",
              opacity: 1,
              duration: 1.2,
              stagger: 0.0125,
              ease: "elastic.out(1, 0.7)",
            },
            "-=0.3"
          );
      }
    },
    { scope: navbarRef, dependencies: [isMobile] }
  );

  const handleMobileMenu = () => {
    if (!menuTimelineRef.current) return;

    if (!isMenuOpen) {
      menuTimelineRef.current.timeScale(1);
      menuTimelineRef.current.play();
      setIsMenuOpen(true);
    } else {
      menuTimelineRef.current.timeScale(2);
      menuTimelineRef.current.reverse();
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      ref={navbarRef}
      className={clsx(
        "flex items-center justify-between p-20d fixed top-0 backdrop-blur-sm z-navbar w-full -translate-y-full",
        {
          "navbar-white": isNavbarWhite,
        }
      )}
    >
      <MobileMenu />
      <div className="flex justify-between w-full items-center">
        <div className="flex w-full md:w-1/3">
          {isMobile ? (
            <Link
              href={"/"}
              prefetch={true}
              className="flex w-full items-center"
            >
              <LogoMobile />
            </Link>
          ) : (
            <Link
              href={"/"}
              prefetch={true}
              className="flex w-full items-center justify-center md:w-auto"
            >
              <Logo />
            </Link>
          )}
        </div>

        <div className="flex flex-1 gap-16d md:landscape:gap-90d justify-end md:landscape::w-1/3">
          <Link
            href={"/"}
            className="hidden md:landscape:block nav-link text-ruby-red text-10d"
          >
            CREATIONS
          </Link>
          <Link
            href={"/events"}
            className="hidden md:landscape:block nav-link text-ruby-red text-10d"
          >
            EVENTS
          </Link>
          <Link
            href={"/about-us"}
            className="hidden md:landscape:block nav-link text-ruby-red text-10d"
          >
            OUR STORY
          </Link>

          {/* TODO: Add AuthBtn, CartModal, Search on phase 2
          <AuthBtn />
          <CartModal />
          <Search /> */}

          <Button buttonType="link" href="/" isHoverTranslate>
            JOIN THE FUN!
          </Button>
          {isMobile ? (
            <button
              onClick={handleMobileMenu}
              className="hamburger-toggle md:landscape:hidden z-navbar"
            >
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  id="line-top"
                  width="16"
                  height="2"
                  fill="#DB0032"
                  className="line-hamburger"
                />
                <rect
                  id="line-middle"
                  y="6"
                  width="16"
                  height="2"
                  fill="#DB0032"
                  className="line-hamburger"
                />
                <rect
                  id="line-bottom"
                  y="12"
                  width="16"
                  height="2"
                  fill="#DB0032"
                  className="line-hamburger"
                />

                <rect
                  id="cross-bottom"
                  x="2"
                  y="12.3135"
                  width="16"
                  height="2"
                  transform="rotate(-45 2 12.3135)"
                  fill="white"
                  className="cross-burger invisible"
                />
                <rect
                  id="cross-top"
                  x="3.41406"
                  y="1"
                  width="16"
                  height="2"
                  transform="rotate(45 3.41406 1)"
                  fill="white"
                  className="cross-burger invisible"
                />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
