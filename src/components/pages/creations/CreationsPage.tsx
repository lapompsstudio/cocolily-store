"use client";

import Footer from "@/components/layout/footer";
import useColorStore from "@/store/colorStore";
import { useFooterStore } from "@/store/footerStore";
import { useEffect } from "react";
import Hero from "./Hero";
import Products from "./Products";

export default function CreationsPage() {
  const { initFooter } = useFooterStore();
  const { setColor } = useColorStore();

  useEffect(() => {
    initFooter;
    setColor(4);
  }, [setColor, initFooter]);

  return (
    <div className="bg-seashell">
      <div className="px-20d">
        <Hero />
        <Products />
      </div>
      <Footer />
    </div>
  );
}
