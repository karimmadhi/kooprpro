const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  mode: "jit",
  theme: {
    extend: {
      colors: {
        accents8: "#fafafa",
        accents7: "#eaeaea",
        accents6: "#999",
        accents5: "#888",
        accents4: "#666",
        accents3: "#444",
        accents2: "#333",
        accents1: "#111",
        dark: "#111111",
        success: "#71E0C3",
        error: "#f81ce5",
        sred: "#e00",
        primary: "#da441d",
        orange: colors.orange,
      },
    },
  },
  plugins: [
    require("@tailwindcss/custom-forms"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
