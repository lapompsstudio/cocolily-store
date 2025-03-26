import localFont from "next/font/local";

export const sfProText = localFont({
  src: [
    {
      path: "../fonts/SFProText/SF-Pro-Text-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/SFProText/SF-Pro-Text-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/SFProText/SF-Pro-Text-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/SFProText/SF-Pro-Text-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/SFProText/SF-Pro-Text-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro-text",
  display: "swap",
});

export const abcFavorite = localFont({
  src: [
    {
      path: "../fonts/ABCFavoritExtended/ABCFavoritExtended-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-abc-favorite",
  display: "swap",
});
