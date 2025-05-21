/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: { preflight: false },
  important: true,
  theme: {
    screens: {
      xs: { max: "450px" },
      sm: { max: "768px" },
      md: { max: "991px" },
      lg: { max: "1024px" },
      xl: { max: "1200px" },
    },
    extend: {
      colors: {
        white: "#ffffff",
        "white-25": "#ffffff40",
        "white-45": "#ffffff73",
        "white-88": "#ffffffe0",
        jindalBlue: "#001529",
      },
    },
  },
  plugins: [],
};
