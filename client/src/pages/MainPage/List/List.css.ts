import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

const myScrollbar = {
  "::-webkit-scrollbar": {
    width: "4px",
  },
  "::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(175, 175, 175, 0.6)",
    borderRadius: "10px",
  },
};

export const taskListsContainerBox = style({
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  justifyContent: "center",
  marginRight: "2%",
  marginLeft: "2%",
  width: "15%",
  height: "63vh",
  minWidth: "50px",
  minHeight: "400px",
  boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.4)",
  backgroundColor: vars.color.secondary,
  borderRadius: vars.radius.medium,
  borderColor: vars.color.mainDarker,
});

export const containerTitle = style({
  display: "flex",
  alignItems: "center",
  padding: "1%",
  marginTop: "1%",
  marginLeft: "10%",
});

export const text1 = style({
  marginRight: "15%",
  fontWeight: "bold",
  textAlign: "center",
  fontSize: vars.fontSizing.H8,
  textDecoration: "underline",
});

export const text2 = style({
  fontSize: vars.fontSizing.H7,
  marginRight: "14%",
  fontWeight: "bold",
});

export const weatherIcon = style({
  textAlign: "center",
  alignItems: "center",
  marginTop: "5%",
  fontSize: vars.fontSizing.H4,
});

export const taskListArea = style({
  height: "52vh",
  marginRight: "2%",
  overflowY: "scroll",
  ...myScrollbar,
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
  borderColor: vars.color.secondary,
  ":hover": {
    backgroundColor: "rgb(245, 245, 248)",
  },
});
