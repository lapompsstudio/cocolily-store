import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description:
    "Our mission is to celebrate sweetness and bring joy through every chocolate bite.",
  robots: {
    index: process.env.NEXT_PUBLIC_ENV === "production",
    follow: process.env.NEXT_PUBLIC_ENV === "production",
    nocache: process.env.NEXT_PUBLIC_ENV !== "production",
    googleBot: {
      index: process.env.NEXT_PUBLIC_ENV === "production",
      follow: process.env.NEXT_PUBLIC_ENV === "production",
      noimageindex: process.env.NEXT_PUBLIC_ENV !== "production",
    },
  },
};
