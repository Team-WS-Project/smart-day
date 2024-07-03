import { style } from "@vanilla-extract/css";
import { vars } from "../../App.css";

const LIST_WIDTH = 500;

export const appContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100vw",
  minHeight: "100vh",
  height: "100vh",
});

export const contentsContainer = style({
  display: "flex",
  flexDirection: "row",
  flex: 1,
  // overflow: "scroll",
});

export const leftPanel = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  // backgroundColor: "black",
  alignItems: "center",
  justifyContent: "space-between",
});

export const uncompletedList = style({
  display: "flex",
  flexDirection: "column",
  marginTop: "5%",
  width: LIST_WIDTH,
  height: 300,
  backgroundColor: vars.color.secondary,
  borderRadius: vars.radius.large,
  // overflow: "scroll",
});
export const completedList = style({
  display: "flex",
  flexDirection: "column",
  marginBottom: "5%",
  width: LIST_WIDTH,
  height: 300,
  backgroundColor: vars.color.secondary,
  borderRadius: vars.radius.large,
});

export const rightPanel = style({
  flex: 1,
  // backgroundColor: "green",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  marginLeft: "5%",
});

export const todoList = style({
  display: "flex",
  flexDirection: "column",
  marginTop: "5%",
  minHeight: 200,
  width: LIST_WIDTH,
  height: "max-content",
  backgroundColor: vars.color.secondary,
  borderRadius: vars.radius.large,
});

export const formTitle = style({
  marginTop: "5%",
  marginBottom: "5%",
  textAlign: "center",
  fontSize: vars.fontSizing.H7,
  fontWeight: "bold",
});

export const viewAllButton = style({
  marginTop: "auto",
  color: "blue",
  textAlign: "end",
  marginRight: "5%",
  marginBottom: "5%",

  ":hover": {
    cursor: "pointer",
  },
});
