// styles.css.ts
import { style } from "@vanilla-extract/css";

export const wrapper = style({
  width: "100vw",
  height: "100vh",
  position: "absolute",
  zIndex: 40000,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.3)",
  overflow: "auto",
});

export const modalContainer = style({
  backgroundColor: "#002366",
  borderRadius: "30px",
  padding: "20px",
  width: "300px",
  color: "white",
});

export const header = style({
  display: "flex",
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  marginTop: "2%",
  marginBottom: "10%",
});

export const title = style({
  fontSize: "32px",
  margin: "0 auto",
  textAlign: "center",
});

export const closeButton = style({
  fontSize: "24px",
  marginTop: -30,
  ":hover": {
    cursor: "pointer",
    opacity: "0.5",
  },
});

export const selectBox = style({
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "none",
});

export const favoriteArea = style({
  marginTop: "20px",
  paddingTop: "10px",
  paddingBottom: "10px",
  flexDirection: "column",
  borderTop: "solid 1px white",
  borderBottom: "solid 1px white",
});

export const subTitle = style({
  fontSize: 20,
  textAlign: "center",
  marginBottom: "4%",
});

export const locationItem = style({
  padding: "10px",
  backgroundColor: "#004080",
  borderRadius: "5px",
  marginBottom: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "white",
  ":hover": {
    cursor: "pointer",
  },
});

export const currentLocationArea = style({
  marginTop: "10px",
  display: "flex",
  flexDirection: "column",
  color: "#ffff00",
});

export const okButton = style({
  marginTop: "20px",
  padding: "10px",
  backgroundColor: "#004080",
  borderRadius: "5px",
  border: "none",
  color: "white",
  width: "100%",
  cursor: "pointer",
  ":hover": {
    opacity: "0.7",
  },
});

export const starFilledIcon = style({
  marginLeft: "auto",

  ":hover": {
    cursor: "pointer",
  },
  color: "yellow",
});

export const starEmptyIcon = style({
  marginLeft: "auto",
  ":hover": {
    cursor: "pointer",
  },
});
