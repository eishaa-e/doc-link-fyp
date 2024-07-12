module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "light-orchid": "#BB90DB",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
