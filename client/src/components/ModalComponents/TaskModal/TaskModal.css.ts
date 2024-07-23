import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

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

export const scheduleContainer = style({
  padding: "10px 15px",
  backgroundColor: vars.color.main,
  borderRadius: vars.radius.medium,
  display: "flex",
  color: vars.color.brightText,
  width: "30%",
  fontFamily: vars.font.inter,
  justifyContent: "space-between",
});

export const scheduleLeft = style({
  width: "10%",
  alignSelf: "end",
});

export const scheduleTrash = style({
  background: vars.color.warningButton,
  textAlign: "center",
  placeContent: "center",
  width: "23px",
  height: "23px",
  borderRadius: vars.radius.large,
  border: "1px solid ${vars.color.brightIcon}",

  ":hover": {
    backgroundColor: vars.color.warningButtonHover,
  },
});

export const trash = style({
  marginTop: "3.5px",
  fontSize: vars.fontSizing.H9,
});

export const scheduleCenter = style({
  width: "70%",
});

export const scheduleTitle = style({
  textAlign: "center",
  fontSize: vars.fontSizing.H7,
  fontWeight: "bold",
  marginBottom: vars.spacing.big2,
});

export const scheduleDate = style({
  display: "flex",
  marginBottom: vars.spacing.small,
});

export const scheduleTime = style({
  display: "flex",
  marginBottom: vars.spacing.small,
  justifyContent: "space-between",
  width: "40%",
});

export const scheduleString = style({
  fontSize: vars.fontSizing.P1,
  minWidth: "10%",
});

export const scheduleDatePicker = style({
  textAlign: "center",
  width: "60%",
  marginLeft: "10px",
});

export const scheduleContent = style({
  marginTop: vars.spacing.medium,
  borderRadius: vars.radius.medium,
  backgroundColor: vars.color.brightIcon,
  color: vars.color.darkText,
  padding: vars.spacing.medium,
  width: "90%",
  height: "80px",
});

export const scheduleSaveBackground = style({
  marginTop: vars.spacing.medium,
  textAlign: "center",
});

export const scheduleSave = style({
  width: "35%",
  backgroundColor: vars.color.brightIcon,
  borderRadius: vars.radius.medium,
  fontSize: vars.fontSizing.H9,
  padding: "2px",
  fontWeight: "bolder",

  ":hover": {
    backgroundColor: vars.color.darkIconHover,
    transition: "transform 100ms",
    transform: "scale(1.03)",
  },
});

export const timePicker = style({
  width: "90px",
});

globalStyle(`${timePicker} > div > input`, {
  textAlign: "right",
  backgroundColor: vars.color.brightIcon,
  height: "1px",
  fontSize: vars.fontSizing.P1,
  padding: "10px",
  paddingRight: "0",
  borderRadius: vars.radius.large,
});

globalStyle(`.MuiFormControl-root`, {
  backgroundColor: vars.color.brightIcon,
  borderRadius: vars.radius.large,
});

globalStyle(`.MuiSvgIcon-root`, {
  fontSize: "15px !important",
  color: vars.color.darkIcon,
  padding: "0 !important",
});

globalStyle(`.MuiPickersPopper-root `, {
  zIndex: "20000 !important",
});

globalStyle(`.css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root`, {
  padding: "0 !important",
  paddingRight: "2px !important",
});

globalStyle(`.TaskModal_scheduleTime__1e5u3jl8`, {
  paddingLeft: "3%",
});

export const scheduleClose = style({
  width: "10%",
});
