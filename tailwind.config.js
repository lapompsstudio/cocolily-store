const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      aspectRatio: { wide: "16/9" },
      colors: {
        "ruby-red": "#DB0032",
        ivory: "#F2ECCB",
        "baby-pink": "#F6CDD7",
        seashell: "#F9EFED",
        "pale-sky-blue": "#C9D9E3",
      },
      fontFamily: {
        sans: ["var(--font-sf-pro-text)"],
        span: ["var(--font-span)"],
        abc: ["var(--font-abc-favorite)"],
      },
      fontSize: {
        "8d": [
          "calc((8/var(--bw)*100vw))",
          { letterSpacing: "calc((-0.02*8/var(--bw))*100vw)" },
        ],
        "10d": [
          "calc((10/var(--bw)*100vw))",
          {
            letterSpacing: "calc((-0.03*10/var(--bw))*100vw)",
          },
        ],
        "11d": [
          "calc((11/var(--bw)*100vw))",
          { letterSpacing: "calc((-0.02*11/var(--bw))*100vw)" },
        ],
        "12d": [
          "calc((12/var(--bw)*100vw))",
          {
            letterSpacing: "calc((-0.05*12/var(--bw))*100vw)",
          },
        ],
        "13d": [
          "calc((13/var(--bw)*100vw))",
          { letterSpacing: "calc((-0.05*13/var(--bw))*100vw)" },
        ],
        "14d": [
          "calc((14/var(--bw)*100vw))",
          { letterSpacing: "calc((-0.02*14/var(--bw))*100vw)" },
        ],
        "16d": [
          "calc((16/var(--bw)*100vw))",
          { letterSpacing: "calc((-0.02*16/var(--bw))*100vw)" },
        ],
        "18d": [
          "calc((18/var(--bw)*100vw))",
          { letterSpacing: "calc((-0.01*18/var(--bw))*100vw)" },
        ],
        "20d": [
          "calc((20/var(--bw)*100vw))",
          { letterSpacing: "calc((-0.01*20/var(--bw))*100vw)" },
        ],
        "24d": [
          "calc((24/var(--bw)*100vw))",
          { letterSpacing: "calc((-0.05*24/var(--bw))*100vw)" },
        ],
        "28d": [
          "calc((28/var(--bw)*100vw))",
          { letterSpacing: "calc((-0.01*28/var(--bw))*100vw)" },
        ],
        "32d": [
          "calc((32/var(--bw)*100vw))",
          { letterSpacing: "calc((-0.01*32/var(--bw))*100vw)" },
        ],
        "36d": [
          "calc((36/var(--bw)*100vw))",
          { letterSpacing: "calc((-0.01*36/var(--bw))*100vw)" },
        ],
        "40d": [
          "calc((40/var(--bw)*100vw))",
          { letterSpacing: "calc((-0.05*40/var(--bw))*100vw)" },
        ],
        "48d": [
          "calc((48/var(--bw)*100vw))",
          { letterSpacing: "calc((-0.05*48/var(--bw))*100vw)" },
        ],
        "60d": [
          "calc((60/var(--bw)*100vw))",
          { letterSpacing: "calc((-0.01*60/var(--bw))*100vw)" },
        ],
        "64d": [
          "calc((64/var(--bw)*100vw))",
          { letterSpacing: "calc((-0.01*64/var(--bw))*100vw)" },
        ],
        "66d": [
          "calc((66/var(--bw)*100vw))",
          { letterSpacing: "calc((-0.01*66/var(--bw))*100vw)" },
        ],
        "72d": [
          "calc((72/var(--bw)*100vw))",
          { letterSpacing: "calc((-0.01*72/var(--bw))*100vw)" },
        ],
        "80d": [
          "calc((80/var(--bw)*100vw))",
          { letterSpacing: "calc((-0.04*80/var(--bw))*100vw)" },
        ],
        "96d": [
          "calc((96/var(--bw)*100vw))",
          { letterSpacing: "calc((-0.05*96/var(--bw))*100vw)" },
        ],
        "128d": [
          "calc((128/var(--bw)*100vw))",
          { letterSpacing: "calc((-0.01*128/var(--bw))*100vw)" },
        ],
        "145d": [
          "calc((145/var(--bw)*100vw))",
          { letterSpacing: "calc((-0.04*145/var(--bw))*100vw)" },
        ],
        "165d": [
          "calc((165/var(--bw)*100vw))",
          { letterSpacing: "calc((-0.04*165/var(--bw))*100vw)" },
        ],
      },
      gap: {
        "90d": "calc((90/var(--bw)*100vw))",
      },
      height: {
        "38d": "calc((38/var(--bw)*100vw))",
        "72d": "calc((72/var(--bw)*100vw))",
        "74d": "calc((74/var(--bw)*100vw))",
        "111d": "calc((111/var(--bw)*100vw))",
        "264d": "calc((264/var(--bw)*100vw))",
        "370d": "calc((370/var(--bw)*100vw))",
        "1080d": "calc((1080/var(--bw)*100vw))",
      },
      lineHeight: {
        1.1: "1.1",
        1.2: "1.2",
        1.3: "1.3",
        1.4: "1.4",
      },
      margin: {
        "20d": "calc((20/var(--bw)*100vw))",
        "32d": "calc((32/var(--bw)*100vw))",
        "48d": "calc((48/var(--bw)*100vw))",
        "80d": "calc((80/var(--bw)*100vw))",
      },
      maxWidth: {
        "225d": "calc((225/var(--bw)*100vw))",
      },
      padding: {
        "12d": "calc((12/var(--bw)*100vw))",
        "16d": "calc((16/var(--bw)*100vw))",
        "20d": "calc((20/var(--bw)*100vw))",
        "22d": "calc((22/var(--bw)*100vw))",
      },
      space: {
        "20d": "calc((20/var(--bw)*100vw))",
      },
      width: {
        "100d": "calc((100/var(--bw)*100vw))",
        "165d": "calc((165/var(--bw)*100vw))",
        "355d": "calc((355/var(--bw)*100vw))",
        "544d": "calc((544/var(--bw)*100vw))",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: {
            opacity: 1,
          },
        },
      },
      blink: {
        "0%": { opacity: 0.2 },
        "20%": { opacity: 1 },
        "100%": { opacity: 0.2 },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        blink: "blink 1.4s both infinite",
      },
    },
  },
  future: { hoverOnlyWhenSupported: true },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return { "animation-delay": value };
          },
        },
        { values: theme("transitionDelay") }
      );
    }),
  ],
};
