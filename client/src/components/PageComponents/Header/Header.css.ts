import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

export const headerFooterContainer = style({
  height: "65px", // header와 footer의 높이 global css로 지정 필요
  backgroundColor: vars.color.main,
  display: "flex",
  color: vars.color.brightText,
  justifyContent: "space-between",
  alignItems: "center",
  flexShrink: "0",
});

export const mainLogo = style({
  fontSize: vars.fontSizing.H5,
  fontFamily: vars.font.julius,
  marginLeft: vars.spacing.big1,
});

export const headerTwoButtons = style({
  marginRight: vars.spacing.big1,
  width: "200px",
  height: "43px",
  alignContent: "center",
  display: "flex",
  justifyContent: "space-between",
});

export const headerButton = style({
  backgroundColor: vars.color.brightIcon,
  color: vars.color.darkIcon,
  fontSize: vars.fontSizing.H8,
  fontFamily: vars.font.inter,
  fontWeight: "bold",
  borderRadius: vars.radius.small,
  width: "45%",
  height: "100%",

  ":hover": {
    backgroundColor: vars.color.darkIconHover,
    transition: "transform 200ms",
    transform: "scale(1.03)",
  },
});

export const headerNavigator = style({
  display: "flex",
  alignItems: "center",
  width: "40%",
});

export const headerNaviButtons = style({
  width: "24%",
  textAlign: "center",
  fontSize: vars.fontSizing.H8,
  fontFamily: vars.font.arial,

  ":hover": {
    transform: "scale(1.03)",
    textUnderlineOffset: "5px",
    fontWeight: "bold",
    textDecoration: "underline",
    transition: "transform 100ms",
  },
});

export const afterLogin = style({
  marginRight: "30px",
});
