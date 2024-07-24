import { style } from "@vanilla-extract/css";
import { vars } from "../../../../App.css";

export const wrapper = style({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  zIndex: 20000,
  backgroundColor: "rgba(0,0,0,0.3)",
});

export const pwCheckContainer = style({
  backgroundColor: vars.color.main,
  width: "350px",
  borderRadius: vars.radius.medium,
  padding: "1% 0",
});

export const pwCheckClose = style({
  color: vars.color.brightIcon,
  textAlign: "end",
  width: "96%",
  ":hover": {
    cursor: "pointer",
  },
});

export const pwCheckTitle = style({
  fontSize: vars.fontSizing.H8,
  fontFamily: vars.font.julius,
  color: vars.color.brightText,
  textAlign: "center",
  marginBottom: vars.spacing.big1,
});

export const pwCheckField = style({
  backgroundColor: vars.color.brightIcon,
  borderRadius: vars.radius.small,
  padding: "8% 0",
  margin: "0 10%",
  marginBottom: "10%",
  justifyContent: "center",
});

export const inputField = style({
  width: "70%",
  height: "35px",
  border: "1px solid black",
  borderRadius: vars.radius.small,
  alignContent: "center",
  margin: "auto",
  marginBottom: vars.spacing.medium,
  display: "flex",
});

export const inputIcon = style({
  marginTop: vars.spacing.medium,
  marginLeft: vars.spacing.medium,
  marginRight: vars.spacing.medium,
});

export const inputBox = style({
  border: "0",
  width: "70%",

  ":focus": {
    outline: "none",
  },
});

export const pwCheckButton = style({
  width: "60%",
  backgroundColor: vars.color.main,
  color: vars.color.brightText,
  margin: "auto",
  textAlign: "center",
  fontFamily: vars.font.inter,
  fontSize: vars.fontSizing.H8,
  padding: "12px 10px",
  borderRadius: vars.radius.small,
  marginTop: "20px",

  ":hover": {
    backgroundColor: vars.color.mainBright,
  },
});
