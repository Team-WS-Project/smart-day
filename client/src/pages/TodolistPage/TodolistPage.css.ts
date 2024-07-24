import { style } from "@vanilla-extract/css";
import { vars } from "../../App.css";

const LIST_WIDTH = 500;

const scrollbar = {
  "::-webkit-scrollbar": {
    height: "5px",
    width: "5px",
  },
  "::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(175,175,175,1)",
    borderRadius: "10px",
  },
  border: `solid 20px ${vars.color.secondary}`,
};

export const appContainer = style({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
});

export const contentsContainer = style({
  display: "flex",
  flexDirection: "row",
  overflowY: "hidden",
  flex: 1,
});

export const leftPanel = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
});

export const uncompletedList = style({
  display: "flex",
  flexDirection: "column",
  margin: "5% 0%",
  width: LIST_WIDTH,
  height: 300,
  backgroundColor: vars.color.secondary,
  borderRadius: vars.radius.large,
  overflowY: "scroll",
  ...scrollbar,
});
export const completedList = style({
  display: "flex",
  flexDirection: "column",
  marginBottom: "5%",
  width: LIST_WIDTH,
  height: 300,
  backgroundColor: vars.color.secondary,
  borderRadius: vars.radius.large,
  overflowY: "scroll",
  ...scrollbar,
});

export const rightPanel = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  marginLeft: "5%",
});

export const todoList = style({
  display: "flex",
  flexDirection: "column",
  margin: "5% 0%",
  minHeight: 200,
  width: LIST_WIDTH,
  height: "max-content",
  maxHeight: "70%",
  backgroundColor: vars.color.secondary,
  borderRadius: vars.radius.large,
  overflowY: "auto",
  ...scrollbar,
});

export const formTitle = style({
  position: "sticky",
  top: "0%",
  paddingTop: "3%",
  paddingBottom: "3%",
  backgroundColor: vars.color.secondary,
  textAlign: "center",
  fontSize: vars.fontSizing.H7,
  fontWeight: "bold",
  zIndex: 1,
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

export const noContent = style({
  textAlign: "center",
  margin: "auto",
  color: "blue",
});

export const addTodoButton = style({
  fontSize: vars.fontSizing.H8,
  borderRadius: vars.radius.large,
  backgroundColor: vars.color.secondary,
  padding: "10px 20px",

  ":hover": {
    cursor: "pointer",
    backgroundColor: vars.color.secondaryDarker,
  },
});
