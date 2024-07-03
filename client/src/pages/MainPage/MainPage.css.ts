import { style } from "@vanilla-extract/css";
import { vars } from "../../App.css";

export const div1 = style({
    alignItems: "center",
    justifyContent: "center"
});

export const div2 = style({
    width: "100%",
    height: "10vh",
    textAlign: "center",
    justifyContent: "center",
    // backgroundColor: "gray",
    fontSize: vars.fontSizing.H7
});

export const div3 = style({
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center"
});

export const text1 = style({
    marginLeft: "19%",
    width: "26%",
    fontWeight: "bold",
    cursor: "pointer",
    color: vars.color.main
});

export const text2 = style({
    marginLeft: "8%",
    width: "26%",
    fontSize: vars.fontSizing.H8
});


export const text3 = style({
    marginLeft: "10%",
    width: "26%",
    fontWeight: "bold",
    cursor: "pointer",
    color: "blue"
});
