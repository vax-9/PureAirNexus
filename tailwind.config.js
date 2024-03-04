const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pureWhite: "#FFFFFF",
        ecoGreen: "#5DAE49",
        skyBlue: "#6DB1E1",
        graphite: "#4C4C4C",
      },
      fontFamily: {
        agdasima: ["Agdasima", "sans-serif"],
        baiJamjuree: ["Bai Jamjuree", "sans-serif"],
      },
    },
  },
  plugins: [],
});
