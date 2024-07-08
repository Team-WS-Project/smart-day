import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

export const loginContainer = style({
  backgroundColor: vars.color.main,
  width: "350px",
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

export const loginField = style({
  backgroundColor: vars.color.brightIcon,
  borderRadius: vars.radius.small,
  padding: "8% 0",
  margin: "0 10%",
  justifyContent: "center",
});

export const inputField = style({
  width: "70%",
  height: "35px",
  border: "1px solid ${vars.color.secondary}",
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

export const loginButton = style({
  width: "60%",
  backgroundColor: vars.color.main,
  color: vars.color.brightText,
  margin: "auto",
  textAlign: "center",
  fontFamily: vars.font.inter,
  fontSize: vars.fontSizing.H8,
  padding: "12px 10px",
  borderRadius: vars.radius.small,
  marginTop: "40px",

  ":hover": {
    backgroundColor: vars.color.mainBright,
  },
});

export const registerButton = style({
  textAlign: "end",
  color: vars.color.secondary,
  marginTop: vars.spacing.medium,
  marginRight: vars.spacing.big2,
  marginBottom: vars.spacing.big1,
  fontSize: vars.fontSizing.H9,

  ":hover": {
    textUnderlineOffset: "5px",
    fontWeight: "bolder",
    textDecoration: "underline",
  },
});
