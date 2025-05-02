"use client";

import React, { useEffect } from "react";

import CreationProductDetail from "./CreationProductDetail";
import CreationProductRelated from "./CreationProductRelated";
import Footer from "@/components/layout/footer";
import useColorStore from "@/store/colorStore";
import { useFooterStore } from "@/store/footerStore";

const CreationsDetailPage = () => {
  const { isRenderFooter, initFooter } = useFooterStore();
  const { setColor } = useColorStore();

  useEffect(() => {
    setColor(4);
    initFooter();
  }, [setColor, initFooter]);

  return (
    <div className="bg-ivory-blush">
      <CreationProductDetail />
      <CreationProductRelated />
      {isRenderFooter && <Footer />}
    </div>
  );
};

export default CreationsDetailPage;
