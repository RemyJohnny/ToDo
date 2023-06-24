/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html", "./src/*.js"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Roboto Condensed"],
      },
      colors: {
        primary: "#84cc16",
      },
    },
  },
  plugins: [],
};
