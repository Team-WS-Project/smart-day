import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

export const modal = style({
  backgroundColor: vars.color.main,
  borderRadius: vars.radius.medium,
  color: vars.color.brightText,
  display: "flex",
}); // global로 해야할 듯...?

export const dayModalLeft = style({
  width: "30%",
  margin: "2.5%",
});

export const dayModalRight = style({
  width: "55%",
  margin: "2.5%",
  backgroundColor: vars.color.mainBright,
  borderRadius: vars.radius.small,
  display: "flex",
  flexWrap: "wrap",
  padding: "5px 30px",
});

export const dayModalClose = style({
  width: "5%",
  marginTop: "2.5%",
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
  marginRight: "40px", // vars.spacing의 다양한게 필요
  alignSelf: "center",
});

export const dailyTodoColumn = style({
  padding: "10px",
});

export const scheduleAddButton = style({
  width: "27%",
  backgroundColor: vars.color.brightIcon,
  fontSize: vars.fontSizing.H8,
  fontFamily: vars.font.inter,
  height: "50px",
  borderRadius: vars.radius.small,
  alignSelf: "end",
  marginBottom: "20px",

  ":hover": {
    backgroundColor: vars.color.darkIconHover,
    transition: "transform 100ms",
    transform: "scale(1.03)",
  },
});
