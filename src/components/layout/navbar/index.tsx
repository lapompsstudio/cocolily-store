"use client";

import { useRef } from "react";

import Link from "next/link";
import MobileMenu from "./mobile-menu";
import Logo from "@/components/logo";
import Button from "@/components/ui/button";

// TODO: Add AuthBtn, CartModal, Search on phase 2
import { getMenu } from "@/lib/shopify";
import Search from "./search";
import CartModal from "@/components/cart/modal";
import AuthBtn from "@/components/layout/navbar/auth-btn";
import { useNavbarColorStore } from "@/store/navbarColorStore";
import clsx from "clsx";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Navbar() {
  const navbarRef = useRef<HTMLDivElement>(null);
  const { isNavbarWhite } = useNavbarColorStore();

  useGSAP(
    () => {
      if (!navbarRef.current) return;
      gsap.to(navbarRef.current, {
        y: "0%",
        duration: 1.2,
        ease: "power1.inOut",
        delay: 2.2,
      });
    },
    { scope: navbarRef }
  );

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
      <div className="block flex-none md:hidden">
        <MobileMenu />
      </div>
      <div className="flex justify-between w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href={"/"}
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <Logo />
          </Link>
        </div>

        <div className="flex flex-1 gap-90d justify-end md:w-1/3">
          <Link href={"/"} className="nav-link text-ruby-red text-10d">
            CREATIONS
          </Link>
          <Link href={"/events"} className="nav-link text-ruby-red text-10d">
            EVENTS
          </Link>
          <Link href={"/about-us"} className="nav-link text-ruby-red text-10d">
            OUR STORY
          </Link>

          {/* TODO: Add AuthBtn, CartModal, Search on phase 2
          <AuthBtn />
          <CartModal />
          <Search /> */}

          <Button buttonType="link" href="/" isHoverTranslate>
            JOIN THE FUN!
          </Button>
        </div>
      </div>
    </nav>
  );
}
