import _ from "lodash";

const localConfig = {
  purge: {
    content: ["./src/**/*.ts", "./src/**/*.tsx", "./node_modules/@govtechsg/tradetrust-ui-components/src/**/*.tsx"],
  },
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      display: ["Roboto", "sans-serif"],
      body: ["Roboto", "sans-serif"],
    },
    width: {
      fit: "fit-content",
    },
    extend: {},
  },
};
const finalConfig = localConfig;

export default finalConfig;
