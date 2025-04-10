"use client";

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

export function Navbar() {
  const { isNavbarWhite } = useNavbarColorStore();

  return (
    <nav
      className={clsx(
        "flex items-center justify-between p-20d fixed top-0 backdrop-blur-sm z-[999] w-full",
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
            SHOP <br /> OUR PRODUCT
          </Link>
          <Link href={"/"} className="nav-link text-ruby-red text-10d">
            SEE <br /> OUR EVENTS
          </Link>
          <Link href={"/about-us"} className="nav-link text-ruby-red text-10d">
            ABOUT US
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
