import { style } from "@vanilla-extract/css";
import { vars } from "../../../../App.css";

export const dailyTodo = style({
  backgroundColor: vars.color.secondary,
  color: vars.color.darkText,
  borderRadius: vars.radius.small,
  padding: "5px",
  margin: "20px 5px",

  ":hover": {
    backgroundColor: vars.color.darkIconHover,
    transition: "transform 100ms",
    transform: "scale(1.03)",
  },
});

export const dailyTodoTitle = style({
  padding: "3px 16px",
  fontFamily: vars.font.inter,
  fontSize: vars.fontSizing.H9,
});

export const dailyTodoContent = style({
  backgroundColor: vars.color.brightIcon,
  borderRadius: vars.radius.small,
  padding: "5px 8px",
  margin: "5px 8px",
  fontFamily: vars.font.inter,
  fontSize: vars.fontSizing.H8,
});
