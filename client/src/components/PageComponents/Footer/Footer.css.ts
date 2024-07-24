import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

export const footerButton = style({
  fontSize: vars.fontSizing.H8,
  fontFamily: vars.font.inter,
  marginLeft: vars.spacing.big1,
  marginRight: vars.spacing.big1,

  ":hover": {
    transform: "scale(1.03)",
    textUnderlineOffset: "5px",
    fontWeight: "bold",
    transition: "transform 50ms",
  },
});
