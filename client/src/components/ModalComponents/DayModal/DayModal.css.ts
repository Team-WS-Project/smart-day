import { style } from "@vanilla-extract/css";
import { scrollbar, vars } from "../../../App.css";

export const wrapper = style({
  width: "100vw",
  height: "100vh",
  position: "absolute",
  zIndex: 10000,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.3)",
});

export const modal = style({
  width: "900px",
  height: "450px",
  backgroundColor: vars.color.main,
  borderRadius: vars.radius.medium,
  color: vars.color.brightText,
  display: "flex",
});

export const dayModalLeft = style({
  width: "30%",
  margin: "2.5%",
});

export const dateUponIcon = style({
  fontSize: vars.fontSizing.H6,
  position: "absolute",
  marginRight: "160px",
  textAlign: "center",
  marginTop: "30px",
});

export const dayModalRight = style({
  width: "100%",
  margin: "2.5%",
  backgroundColor: vars.color.mainBright,
  borderRadius: vars.radius.small,
  display: "flex",
  flexWrap: "wrap",
  padding: "5px 30px",
  alignItems: "self-start",
  overflowY: "auto",
  ...scrollbar,
  border: "none",
});

export const dayModalClose = style({
  width: "5%",
  marginTop: "2.5%",
  marginRight: "3%",
  textAlign: "center",
  fontSize: vars.fontSizing.H5,
});

export const dayModalTitle = style({
  display: "flex",
  borderBottom: "3px solid #fff",
  justifyContent: "space-evenly",
});

export const dayTitleIcons = style({
  fontSize: "80px",
});

export const dayTitleWeekday = style({
  fontSize: vars.fontSizing.H5,
  marginLeft: vars.spacing.small,
  marginRight: "40px",
  alignSelf: "center",
});

export const dailyTodoColumn = style({
  marginTop: "5%",
  maxHeight: "60%",
  padding: "5px",
  overflowY: "auto",
  ...scrollbar,
  border: "none",
});

export const scheduleAddButton = style({
  width: "27%",
  minWidth: "120px",
  backgroundColor: vars.color.brightIcon,
  fontSize: vars.fontSizing.H9,
  fontFamily: vars.font.inter,
  height: "50px",
  borderRadius: vars.radius.small,
  alignSelf: "end",
  margin: "20px 0",

  ":hover": {
    backgroundColor: vars.color.darkIconHover,
    transition: "transform 100ms",
    transform: "scale(1.03)",
  },
});

export const center = style({
  textAlign: "center",
});

export const todoAddButton = style({
  width: "80%",
  minWidth: "120px",
  backgroundColor: vars.color.brightIcon,
  fontSize: vars.fontSizing.H9,
  fontFamily: vars.font.inter,
  height: "50px",
  borderRadius: vars.radius.small,
  margin: "10px 0",

  ":hover": {
    backgroundColor: vars.color.darkIconHover,
    transition: "transform 100ms",
    transform: "scale(1.03)",
  },
});
