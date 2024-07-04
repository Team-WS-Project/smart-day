import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

export const taskListsContainerBox = style({
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    marginRight: "2%",
    marginLeft: "2%",
    width : "15%",
    height: "63vh",
    minWidth: "50px",
    minHeight: "400px",
    boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.4)",
    backgroundColor: vars.color.secondary,
    borderRadius: vars.radius.medium,
    borderColor: vars.color.mainDarker
});

export const containerTitle = style({
    display: "flex",
    alignItems: "center",
    padding: "1%",
    marginTop: "1%",
    marginLeft: "10%"
});

export const text1 = style({
    marginRight: "15%",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: vars.fontSizing.H8,
    textDecoration: "underline"
});

export const text2 = style({
    fontSize: vars.fontSizing.H7,
    marginRight: "14%",
    fontWeight: "bold"
});

export const weatherIcon = style({
    textAlign: "center",
    alignItems: "center",
    marginTop: "5%",
    // cursor: "pointer",
    fontSize: vars.fontSizing.H4
});

export const trashIcon = style({
    width:"10%",
    textAlign: "center",
    cursor: "pointer",
    marginLeft: "2.5%",
    fontSize: vars.fontSizing.H7
});

export const taskListArea = style({
    height: "52vh",
    overflowY: "scroll",
    "::-webkit-scrollbar": {
        width: "1px"
    }
});

export const task = style({
    height: "15%",
    alignItems: "center",
    display: "flex",
    marginTop: "1%"
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
    borderRadius: vars.radius.small
});

export const newTaskButton = style({
    width: "80%",
    padding: "5%",
    textAlign: "center",
    alignItems: "center",
    fontSize: vars.fontSizing.H9,
    backgroundColor: vars.color.brightText,
    marginTop: "5%",
    marginLeft: "5%",
    boxShadow: "1px",
    cursor: "pointer",
    borderRadius: vars.radius.small,
    borderColor : vars.color.secondary,
    ":hover": {
        backgroundColor: "rgb(245, 245, 248)"
    }
});
