import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

const TODO_BG_COLOR = "white";

export const todoContainer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "10px",
});

export const checkBox = style({
  flex: 0.3,
  width: "10px",
  height: "24px",
});
export const descriptionArea = style({
  flex: 1,
  flexGrow: 1,
  height: 30,
  fontSize: vars.fontSizing.H8,
  backgroundColor: TODO_BG_COLOR,
  marginRight: "5%",
  padding: "1%",
});
export const dueDateArea = style({
  flex: 0.3,
  backgroundColor: TODO_BG_COLOR,
  fontSize: vars.fontSizing.H8,
  height: 30,
  marginRight: "5%",
  padding: "1%",
});
