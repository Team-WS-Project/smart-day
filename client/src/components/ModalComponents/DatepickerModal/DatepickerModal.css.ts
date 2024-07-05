import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

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

export const modalWindow = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: 500,
  maxHeight: 800,
  width: "max-content",
  height: "max-content",
  backgroundColor: vars.color.main,
  borderRadius: vars.radius.large,
  padding: 50,
  color: vars.color.brightText,
  boxShadow: vars.shadow.basic,
});
export const header = style({
  display: "flex",
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "2%",
});
export const title = style({
  fontSize: vars.fontSizing.H6,
  margin: "0 auto",
  textAlign: "center",
});
export const closeButton = style({
  fontSize: vars.fontSizing.H7,
  marginTop: -20,
  ":hover": {
    cursor: "pointer",
    opacity: "0.5",
  },
  marginRight: "-20px",
});
export const body = style({
  padding: 20,
  color: vars.color.darkText,
  marginTop: "5%",
  width: "100%",
  borderRadius: vars.radius.medium,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
});
export const datePicker = style({});
export const customCalendar = style({
  display: "flex",
  alignItems: "center",
  borderRadius: 4,
  backgroundColor: "white",
  width: "100%",
  height: 46,
  textAlign: "center",
});

export const okButton = style({
  padding: vars.spacing.medium,
  backgroundColor: vars.color.secondary,
  color: vars.color.brightText,
  marginTop: "auto",
  borderRadius: vars.radius.small,
  ":hover": {
    cursor: "pointer",
    opacity: "0.8",
  },
});
