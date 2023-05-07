/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#03A700",
        typo: "#454545",
        border: "#B4B4B4",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        old: ["Old English Text MT", "sans-serif"],
        mont: ["Montserrat", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      lgg: "1365px",
      xl: "1700px",
    },
  },
  plugins: [],
};
