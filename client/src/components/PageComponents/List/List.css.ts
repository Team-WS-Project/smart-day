import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

export const div1 = style({
    display: "flex",
    flexDirection: "column",
    marginRight: "2vw",
    marginLeft: "2vw",
    width : "13vw",
    height: "70vh",
    boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.4)",
    backgroundColor: vars.color.secondary,
    borderRadius: vars.radius.medium,
    borderColor: vars.color.mainDarker
});

export const title = style({
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
});

export const text1 = style({
    fontSize: vars.fontSizing.H8,
    marginRight: "15%",
    fontWeight: "bold",
    textAlign: "center"
});

export const text2 = style({
    fontSize: vars.fontSizing.H7,
    marginRight: "14%",
    fontWeight: "bold"
});

export const icon1 = style({
    textAlign: "center",
    alignItems: "center",
    marginTop: "5%",
    // cursor: "pointer",
    fontSize: vars.fontSizing.H6
});

export const icon2 = style({
    width:"10%",
    textAlign: "center",
    alignItems: "flex-end",
    cursor: "pointer",
    marginTop: "6%",
    marginLeft: "2.5%",
    fontSize: "26px"
});

export const div2 = style({
    textAlign: "center",
    height: "14%",
    alignItems: "center",
    display: "flex",
    verticalAlign: "middle"
});

export const task = style({
    width: "80%",
    height: "60%",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: vars.color.brightText,
    marginTop: "10%",
    marginLeft: "5%",
    cursor: "pointer",
    borderRadius: vars.radius.small
});

export const button1 = style({
    width: "90%",
    height: "7%",
    textAlign: "center",
    alignItems: "center",
    fontSize: vars.fontSizing.H9,
    backgroundColor: vars.color.brightText,
    marginTop: "7%",
    marginLeft: "5%",
    boxShadow: "1px",
    cursor: "pointer",
    borderRadius: vars.radius.small,
    borderColor : vars.color.secondary,
    ":hover": {
        backgroundColor: "rgb(245, 245, 248)"
    }
});
