module.exports = {
  purge: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      display: ["Roboto", "sans-serif"],
      body: ["Roboto", "sans-serif"],
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: {
        default: "#FF6A33",
        hover: "#E65F2E",
      },
      secondary: {
        default: "#8C939E",
        hover: "#6D727A",
      },
    }),
    borderColor: (theme) => ({
      ...theme("colors"),
      primary: "#FF6A33",
    }),
    textColor: (theme) => ({
      ...theme("colors"),
      primary: "#FF6A33",
    }),
    extend: {
      width: {
        fit: "fit-content",
      },
      minHeight: {
        20: "5rem",
      },
      backgroundColor: ["active"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
