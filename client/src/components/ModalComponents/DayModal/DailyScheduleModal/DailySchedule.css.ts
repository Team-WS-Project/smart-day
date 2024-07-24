import { style } from "@vanilla-extract/css";
import { vars } from "../../../../App.css";

export const dailySchedule = style({
  backgroundColor: vars.color.secondary,
  color: vars.color.darkText,
  borderRadius: vars.radius.small,
  width: "25%",
  height: "25%",
  padding: "5px",
  margin: "20px 5px",
  marginRight: vars.spacing.big1,

  ":hover": {
    backgroundColor: vars.color.darkIconHover,
    transition: "transform 200ms",
    transform: "scale(1.1)",
  },
});

export const dailyScheduleTitle = style({
  padding: "3px 14px",
  fontFamily: vars.font.inter,
  fontSize: vars.fontSizing.P1,
  textAlign: "center",
});

export const dailyScheduleContent = style({
  backgroundColor: vars.color.brightIcon,
  borderRadius: vars.radius.small,
  padding: "5px 8px",
  margin: "5px 8px",
  height: "60%",
  fontFamily: vars.font.inter,
  fontSize: vars.fontSizing.H9,
});
