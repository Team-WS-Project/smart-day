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

export const loggoArea = style({
  display: "flex",
  alignItems: "center",
  height: "auto",
  padding: "1%",
});

export const textArea = style({
  marginLeft: "4vw",
});

export const locationChangeText = style({
  color: "blue",
  fontWeight: "bold",
  marginLeft: "1.5vw",
  cursor: "pointer",
});

export const loggoAreaRight = style({
  display: "flex",
  alignItems: "center",
  marginLeft: "28vw",
});

export const iconArea = style({
  display: "flex",
  alignItems: "center",
  marginLeft: "1vw",
});

export const monthText = style({
  position: "absolute",
  padding: "1px 20px",
  fontSize: vars.fontSizing.H6,
});

export const iconStyle = style({
  fontSize: vars.fontSizing.H1,
});

export const seeAllSchedules = style({
  color: "blue",
  fontWeight: "bold",
  cursor: "pointer",
});

export const calendarContainer = style({
  display: "flex",
  justifyContent: "center",
  height: "65vh",
  marginBottom: "2vh",
});

export const todolistContainer = style({
  width: "15vw",
  height: "64.3vh",
  marginTop: "-0.1vh",
  justifyContent: "center",
  border: "1.5px solid black",
  boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.1)",
});

export const todoTitle = style({
  height: "2.4vw",
  textAlign: "center",
  fontSize: "22px",
  fontFamily: vars.font.akshar,
  marginTop: "4%",
  boxShadow: "0.1px 1px 0.4px rgba(0, 0, 0, 1.0)",
});

export const todo = style({
  cursor: "pointer",
});

export const todolistPannel = style({
  padding: "5%",
  height: "55vh",
  overflowX: "hidden",
  overflowY: "scroll",
  // "::-webkit-scrollbar": {
  //     width: "1px"
  // },
  ...myScrollbar,
});

export const todolistDetail = style({
  width: "100%",
  border: "1px solid rgb(201, 207, 216)",
  cursor: "pointer",
});
