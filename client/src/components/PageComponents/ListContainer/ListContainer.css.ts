import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

export const div1 = style({
    width: "99vw",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    textAlign: "center"
});

export const div2 = style({
    width: "80vh",
    height: "75vh",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center"
});

export const div3 = style({
    marginLeft: "12%",
    marginRight: "12%"
});

export const icon1 = style({
    cursor: "pointer",
    fontSize: vars.fontSizing.H4
});

