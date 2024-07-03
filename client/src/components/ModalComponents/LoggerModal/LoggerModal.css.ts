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
});

export const modalWindow = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: 500,
  maxHeight: 800,
  overflow: "auto", // 캐러셀?
  width: 800,
  height: "max-content",
  backgroundColor: vars.color.main,
  borderRadius: vars.radius.large,
  padding: 20,
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
  fontSize: vars.fontSizing.H5,
  marginTop: -50,
  ":hover": {
    cursor: "pointer",
    opacity: "0.5",
  },
});

export const body = style({
  padding: 20,
  color: vars.color.darkText,
  marginTop: "5%",
  backgroundColor: "white",
  width: "100%",
  borderRadius: vars.radius.medium,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  ":hover": {
    backgroundColor: "gray",
  },
});

export const dateTimeBox = style({
  flex: "0.5",
  marginRight: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const dateBox = style({});
export const timeBox = style({});

export const descriptionBox = style({
  flex: "2",
});
