/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0e6b58",
        "on-primary": "#ffffff",
        "primary-container": "#a2f2da",
        "on-primary-container": "#005141",

        secondary: "#4b635b",
        "on-secondary": "#ffffff",
        "secondary-container": "#cde9de",
        "on-secondary-container": "#344c44",

        tertiary: "#416277",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#c5e7ff",
        "on-tertiary-container": "#294a5e",

        error: "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",

        surface: "#f5fbf7",
        "surface-dim": "#d5dbd7",
        "surface-bright": "#f5fbf7",
        "on-surface": "#171d1b",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#eff5f1",
        "surface-container-high": "#e3eae6",
        "surface-container-highest": "#dee4e0",
        "surface-container": "#e9efeb",
        "on-surface-variant": "#3f4945",

        outline: "#6f7975",
        "outline-variant": "#bfc9c4",

        "inverse-surface": "#2b322f",
        "inverse-on-surface": "#ecf2ee",
        "inverse-primary": "#86d6be",
      },
    },
  },
  plugins: [],
};
