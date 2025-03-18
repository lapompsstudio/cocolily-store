import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/components/cart/cart-context";
import { cookies } from "next/headers";
import { getCart } from "@/lib/shopify";

const sfProText = localFont({
  src: [
    {
      path: "./fonts/SFProText/SF-Pro-Text-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/SFProText/SF-Pro-Text-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SFProText/SF-Pro-Text-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/SFProText/SF-Pro-Text-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/SFProText/SF-Pro-Text-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro-text",
  display: "swap",
});

const abcFavorite = localFont({
  src: [
    {
      path: "./fonts/ABCFavoritExtended/ABCFavoritExtended-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-abc-favorite",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cocolily",
  description:
    "Our mission is to celebrate sweetness and bring joy through every chocolate bite.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cartId = cookies().get("cartId")?.value;
  const cart = getCart(cartId);
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/bzt8czk.css" />
      </head>
      <body
        className={`${sfProText.variable} ${abcFavorite.variable} font-sans antialiased`}
      >
        <CartProvider cartPromise={cart}>{children}</CartProvider>
      </body>
    </html>
  );
}
