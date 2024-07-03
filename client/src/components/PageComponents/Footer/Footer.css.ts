import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

export const footerButton = style({
  fontSize: vars.fontSizing.H8,
  fontFamily: vars.font.inter,
  marginLeft: vars.spacing.big1,
  marginRight: vars.spacing.big1,
});
