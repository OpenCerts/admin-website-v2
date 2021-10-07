module.exports = {
  purge: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      display: ["Roboto", "sans-serif"],
      body: ["Roboto", "sans-serif"],
    },
    extend: {
      backgroundColor: {
        primary: {
          default: "#FF6A33",
          hover: "#E65F2E",
        },
        secondary: {
          default: "#8C939E",
          hover: "#6D727A",
        },
      },
      borderColor: {
        primary: "#FF6A33",
      },
      textColor: {
        primary: "#FF6A33",
      },
      width: {
        fit: "fit-content",
      },
      minHeight: {
        20: "5rem",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
