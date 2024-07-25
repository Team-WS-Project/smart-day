import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

export const headerFooterContainer = style({
  height: "65px",
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
  ":hover": {
    cursor: "pointer",
  },
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
  placeContent: "center",
  minWidth: "40%",
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
    cursor: "pointer",
  },
});

export const afterLogin = style({
  marginRight: "30px",
  ":hover": {
    textUnderlineOffset: "5px",
    fontWeight: "bold",
    textDecoration: "underline",
  },
});

export const afterLoginContainer = style({
  position: "relative",
  display: "inline-block",
});

export const afterLoginDropdown = style({
  position: "absolute",
  marginTop: "3%",
  marginRight: "10%",
  backgroundColor: vars.color.brightIcon,
  boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
  zIndex: "40000",
  right: "0",
  minWidth: "160px",
});

export const afterLoginDropdownButton = style({
  color: vars.color.darkIcon,
  fontFamily: vars.font.julius,
  fontSize: vars.fontSizing.H9,
  padding: "12px 16px",
  textDecoration: "none",
  display: "block",
  width: "100%",
  border: "none",
  background: "none",
  textAlign: "center",
  cursor: "pointer",

  ":hover": {
    backgroundColor: vars.color.darkIconHover,
  },
});
