import type { Config } from "tailwindcss";
import { fileURLToPath } from 'node:url'

const srcDir = fileURLToPath(new URL('../', import.meta.url))
export default <Partial<Config>>{
  content: [
    srcDir + '/**/*.{js,ts,vue}'
  ],
  theme: {
    extend: {
      colors: {
        "l42-1": "var(--l42-1)",
        "l42-1-dark": "var(--l42-1-dark)",
      },
      margin: {
        "0.5": "0.125rem",
        "30": "7.2rem",
      },
      padding: {
        "2.5": "0.6rem",
      },
      screens: {
        xs: { min: "360px", max: "414px" }, // => @media (min-width: 361px) { ... }
        ipp: { min: "414px", max: "639px" }, // => @media (min-width: 414px) { ... }
      },
      fontFamily: {
        primary: ["Zilla Slab", "Titillium Web", "sans-serif"],
        debug: ["Zilla Slab", "sans-serif"],
      },
      fontSize: {
        xxs: ".5rem",
        "4-5xl": "2.75rem",
        "11px": ".688rem",
        "11.5px": ".719rem",
        "13px": ".813rem",
        "17px": "1.063rem",
      },
      boxShadow: {
        home: "4px 4px 8px #221F1F80",
        arrow: "0px 0px 8px #00000033",
      },
      spacing: {
        "18": "4.5rem",
      },
      width: {
        fit: "fit-content",
      },
      minWidth: {
        "10": "2.5rem",
      },
    },
  },
};
