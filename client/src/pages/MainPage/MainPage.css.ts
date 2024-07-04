import { style } from "@vanilla-extract/css";
import { vars } from "../../App.css";

export const pageContainer = style({
    flex: "1",
    overflowY: "hidden",
    display: "flex",
    flexDirection: "column",
  });

export const locationTextArea = style({
    display: "flex",
    minWidth: "800px",
    justifyContent: "center",
    alignItems: "center",
    height: "8vh",
    minHeight: "50px",
    fontSize: vars.fontSizing.H8
});

export const textArea = style({
    height: "9vh",
    minWidth: "1050px",
    minHeight: "50px",
    display: "flex",
    alignItems: "center",
});

export const datePick = style({
    minWidth: "180px",
    marginLeft: "15%",
    fontWeight: "bold",
    cursor: "pointer",
    alignItems: "center",
    color: vars.color.main
    
});

export const weatherText = style({
    minWidth: "300px",
    marginLeft: "4%",
    fontSize: "22px"
});


export const linkCalendarPage = style({
    minWidth: "180px",
    marginLeft: "10%",
    fontWeight: "bold",
    cursor: "pointer",
    color: "blue"
});
