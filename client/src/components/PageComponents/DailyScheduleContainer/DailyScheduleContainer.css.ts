import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

export const dailyContainer = style({
  width: "25%",
  height: "120px",
  backgroundColor: vars.color.brightIcon,
  margin: "2% 0",
  borderRadius: vars.radius.small,
  padding: "1.5% 2.5%",

  ":hover": {
    backgroundColor: vars.color.darkIconHover,
    transition: "transform 300ms",
    transform: "scale(1.03)",
  },
});

export const dateTitle = style({
  textAlign: "center",
  fontSize: vars.fontSizing.H8,
  fontFamily: vars.font.inter,
});

export const scheduleList = style({
  marginTop: "10px",
  height: "80px",
  overflowY: "auto",
  fontFamily: vars.font.inter,
  fontSize: vars.fontSizing.H9,
});
