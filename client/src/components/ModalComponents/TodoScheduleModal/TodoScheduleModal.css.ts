import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

export const todoScheduleContainer = style({
  padding: "10px 15px",
  backgroundColor: vars.color.main,
  borderRadius: vars.radius.medium,
  display: "flex",
  color: vars.color.brightText,
  width: "20%",
  fontFamily: vars.font.inter,
  justifyContent: "space-between",
});

export const todoScheduleLeft = style({
  width: "10%",
  alignSelf: "end",
});

export const todoTrash = style({
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

export const todoScheduleCenter = style({
  width: "70%",
});

export const todoScheduleTitle = style({
  textAlign: "center",
  fontSize: vars.fontSizing.H7,
  fontWeight: "bold",
});

export const todoDate = style({
  display: "flex",
  marginTop: vars.spacing.big2,
});

export const todoString = style({
  marginRight: vars.spacing.medium,
  fontSize: vars.fontSizing.P1,
  minWidth: "18%",
});

export const todoDatePicker = style({
  textAlign: "center",
  width: "85%",
});

export const todoInput = style({
  width: "65%",
});

export const todoContent = style({
  marginTop: vars.spacing.medium,
  borderRadius: vars.radius.medium,
  backgroundColor: vars.color.brightIcon,
  color: vars.color.darkText,
  padding: vars.spacing.medium,
  width: "90%",
  height: "80px",
});

export const todoSaveBackground = style({
  marginTop: vars.spacing.medium,
  textAlign: "center",
});

export const todoSave = style({
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

export const todoClose = style({
  width: "10%",
});
