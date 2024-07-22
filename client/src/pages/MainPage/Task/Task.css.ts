import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

export const taskStyle = style({
    height: "15%",
    alignItems: "center",
    display: "flex",
    marginTop: "1%",
});
  
export const taskDetail = style({
    width: "80%",
    height: "60%",
    minWidth: "50px",
    minHeight: "40px",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: vars.color.brightText,
    marginLeft: "5%",
    cursor: "pointer",
    borderRadius: vars.radius.small,
});

export const trashIcon = style({
  width: "10%",
  textAlign: "center",
  cursor: "pointer",
  marginLeft: "2.5%",
  fontSize: vars.fontSizing.H7,
});
