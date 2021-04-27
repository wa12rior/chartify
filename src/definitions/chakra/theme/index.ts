import { extendTheme } from "@chakra-ui/react";

import styles from "./styles";

import colors from "./foundations/colors";

import fontSizes from "./foundations/fontSizes";

/**
 * This file is generated for providing a custom theme to Chakra UI
 *
 * To learn more about custom themes
 * please visit https://chakra-ui.com/docs/getting-started#add-custom-theme-optional
 */
const Container = {
  baseStyle: {
    maxWidth: "container.xl",
  },
};

const Button = {
  // 1. We can update the base styles
  baseStyle: {
    fontWeight: "bold", // Normally, it is "semibold"
  },
  // 2. We can add a new button size or extend existing
  sizes: {
    xl: {
      h: "56px",
      fontSize: "lg",
      px: "32px",
    },
  },
  // 3. We can add a new visual variant
  variants: {
    "with-shadow": {
      bg: "red.400",
      boxShadow: "0 0 2px 2px #efdfde",
    },
    // 4. We can override existing variants
    solid: {
      bg: "main.400",
      color: "white",
      _hover: {
        color: "main.400",
        bg: "white",
        "-webkit-box-shadow": "0px 0px 0px 3px rgba(238,108,77,1)",
        "-moz-box-shadow": "0px 0px 0px 3px rgba(238,108,77,1)",
        boxShadow: "0px 0px 0px 3px rgba(238,108,77,1)",
      },
    },
  },
};

const overrides = {
  colors,
  fontSizes,
  components: {
    Container,
    Button,
  },
  ...styles,
};

const theme = extendTheme(overrides);

export default theme;
