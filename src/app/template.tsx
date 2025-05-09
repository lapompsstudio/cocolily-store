"use client";

import React, { useEffect, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactLenis } from "lenis/react";
import { Navbar } from "@/components/layout/navbar";
import { globalStore } from "@/store/globalStore";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

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
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          scriptProps={{
            async: true,
            defer: true,
            appendTo: "head",
          }}
        >
          {/* <Navbar /> */}
          <main>{children}</main>
        </GoogleReCaptchaProvider>
      </QueryClientProvider>
    </ReactLenis>
  );
};

export default Template;
