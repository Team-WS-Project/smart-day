import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";


export const dailyTaskContainer = style({
    display: "flex",
    minWidth: "1050px",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center"
});

export const divArrow = style({
    width: "10%",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
});

export const arrowIcon = style({
    cursor: "pointer",
    fontSize: vars.fontSizing.H4,
});
