import { ThemeOverride } from "@chakra-ui/react";

type GlobalStyles = Pick<ThemeOverride, "styles">;

export default {
  styles: {
    global: {},
  },
  textStyles: {
    logo: {
      fontSize: ["24px", "24px", "36px"],
      fontWeight: 700,
      color: "main.500",
      fontFamily: "Raleway",
    },
    h1: {
      // you can also use responsive styles
      // ["40px", "72px"]
      fontSize: ["36px", "36px", "80px"],
      fontWeight: 500,
      lineHeight: ["48px", "48px", "96px"],
      fontFamily: "Raleway",
    },
    h2: {
      fontSize: ["32px", "32px", "36px"],
      fontWeight: 500,
      lineHeight: ["32px", "32px", "44px"],
      fontFamily: "Raleway",
    },
    "body-18": {
      fontSize: "18px",
      fontWeight: 200,
      lineHeight: "28px",
      fontFamily: "Raleway",
    },
    "body-20": {
      fontSize: "20px",
      fontWeight: 400,
      lineHeight: "28px",
      fontFamily: "Raleway",
    },
    "body-16": {
      fontSize: "16px",
      fontWeight: 200,
      lineHeight: "22px",
      fontFamily: "Raleway",
    },
  },
} as GlobalStyles;
