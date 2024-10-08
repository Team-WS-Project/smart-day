import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

export const wrapper = style({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  zIndex: 30000,
  backgroundColor: "rgba(0,0,0,0.3)",
});

export const registerContainer = style({
  backgroundColor: vars.color.main,
  width: "300px",
  borderRadius: vars.radius.medium,
  padding: "1% 0",
});

export const loginClose = style({
  color: vars.color.brightIcon,
  textAlign: "end",
  width: "96%",
});

export const loginMain = style({
  fontSize: vars.fontSizing.H6,
  fontFamily: vars.font.julius,
  color: vars.color.brightText,
  textAlign: "center",
  marginBottom: vars.spacing.big1,
});

export const inputField = style({
  width: "70%",
  height: "35px",
  border: "1px solid ${vars.color.secondary}",
  borderRadius: vars.radius.small,
  backgroundColor: vars.color.brightIcon,
  alignContent: "center",
  margin: "auto",
  marginBottom: vars.spacing.medium,
  display: "flex",
});

export const inputIcon = style({
  marginTop: vars.spacing.medium,
  marginLeft: vars.spacing.medium,
  marginRight: vars.spacing.medium,
  cursor: "pointer",
});

export const inputBox = style({
  border: "0",
  width: "70%",

  ":focus": {
    outline: "none",
  },
});

export const locationButton = style({
  width: "62%",
  backgroundColor: vars.color.buttonHighlight,
  color: vars.color.darkText,
  margin: "auto",
  textAlign: "center",
  fontFamily: vars.font.inter,
  fontSize: vars.fontSizing.H9,
  padding: "12px 10px",
  borderRadius: vars.radius.small,
  border: "1px solid ${vars.color.brightIcon}",
  marginTop: vars.spacing.big2,
  fontWeight: "bold",

  ":hover": {
    backgroundColor: vars.color.buttonHighlightHover,
  },
});

export const registerButton = style({
  width: "62%",
  backgroundColor: vars.color.buttonBlack,
  color: vars.color.brightText,
  textAlign: "center",
  fontFamily: vars.font.inter,
  fontSize: vars.fontSizing.H8,
  fontWeight: "bold",
  padding: "12px 10px",
  borderRadius: vars.radius.small,
  border: "1px solid ${vars.color.brightIcon}",
  margin: "20px auto",

  ":hover": {
    backgroundColor: vars.color.buttonBlackHover,
  },
});
