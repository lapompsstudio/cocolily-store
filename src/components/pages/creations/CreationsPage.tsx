"use client";

import Footer from "@/components/layout/footer";
import useColorStore from "@/store/colorStore";
import React, { useEffect } from "react";
import Hero from "./Hero";
import Products from "./Products";

export default function CreationsPage() {
  const { setColor } = useColorStore();

  useEffect(() => {
    setColor(4);
  }, []);

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
