import { defineTextStyles } from "@chakra-ui/react";

export const textStyles = defineTextStyles({
  heading: {
    value: {
      fontSize: {
        base: "16px",
        md: "20px",
        xl: "24px",
      },
      fontWeight: 700,
      lineHeight: "34px",
      letterSpacing: "0.48px",
    },
  },
  body: {
    value: {
      fontSize: {
        base: "14px",
        md: "16px",
      },
      fontWeight: 500,
      lineHeight: "25px",
    },
  },
});
