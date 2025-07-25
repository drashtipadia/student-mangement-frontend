/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0e6b58",
        "on-primary": "#00382d",
        "primary-container": "#005142",
        "on-primary-container": "#a2f2da",

        secondary: "#b2ccc2",
        "on-secondary": "#1d352e",
        "secondary-container": "#344c44",
        "on-secondary-container": "#cde9de",

        tertiary: "#a9cbe3",
        "on-tertiary": "#0f3447",
        "tertiary-container": "#294a5e",
        "on-tertiary-container": "#c5e7ff",

        error: "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6",

        surface: "#0f1513",
        "surface-bright": "#343b38",
        "on-surface": "#dee4e0",
        "surface-container": "#1b211f",
        "surface-container-low": "#171d1b",
        "on-surface-variant": "#bfc9c4",

        // FontFace: {
        //   fontFamily: "ArialRoundedMTBold",
        //   src: "./src/assets/fonts/arialroundedmtbold.ttf",
        // },
      },
    },
  },
  plugins: [],
};
