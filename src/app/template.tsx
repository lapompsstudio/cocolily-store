"use client";

import React, { useEffect, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactLenis } from "lenis/react";
import { Navbar } from "@/components/layout/navbar";
import { globalStore } from "@/store/globalStore";

const Template = ({ children }: { children: React.ReactNode }) => {
  const { fetchGlobalData, isGlobalFetched } = globalStore();

  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isGlobalFetched) {
      fetchGlobalData();
    }
  }, [fetchGlobalData, isGlobalFetched]);

  return (
    <ReactLenis root>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <main>{children}</main>
      </QueryClientProvider>
    </ReactLenis>
  );
};

export default Template;
