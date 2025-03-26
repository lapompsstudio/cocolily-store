import "./globals.css";
import { CartProvider } from "@/components/cart/cart-context";
import { cookies } from "next/headers";
import { getCart } from "@/lib/shopify";
import { sfProText, abcFavorite } from "./config/fonts";
import { metadata } from "./config/metadata";

export { metadata };

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
