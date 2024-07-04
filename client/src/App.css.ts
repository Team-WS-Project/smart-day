import { createGlobalTheme, style } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    // 메인 컬러
    main: "rgb(20, 35, 91)",
    mainDarker: "rgb(0, 0, 70)",
    mainBright: "rgb(40, 68, 139)",

    // 부메인 컬러
    secondary: "rgb(201, 207, 216)",
    secondaryDarker: "rgb(131, 139, 159)",
    secondaryBright: "rgb(222, 234, 252)",

    buttonHighlight: "rgb(204, 237, 255)",
    buttonHighlightHover: "rgb(123,197,238)",
    buttonBlack: "rgb(0,0,0)",
    buttonBlackHover: "rgb(103,106,118)",

    brightText: "rgb(255,255,255)",
    darkText: "rgb(0,0,0)",
    greyText: "rgb(147,147,147)",

    warningButton: "rgb(203, 0, 0)",
    warningButtonHover: "rgb(110, 0, 0)",
    darkIcon: "rgb(0,0,0)",
    darkIconHover: "rgb(131,139,159)",
    brightIcon: "rgb(255,255,255)",
  },

  fontSizing: {
    H1: "60px",
    H2: "52px",
    H3: "48px",
    H4: "42px",
    H5: "36px",
    H6: "32px",
    H7: "24px",
    H8: "18px",
    H9: "14px",
    P1: "12px",
  },

  spacing: {
    small: "5px",
    medium: "10px",
    big1: "20px",
    big2: "15px",
    listSpacing: "30px",
  },

  font: {
    arial: "arial",
    inter: "Inter",
    julius: "Julius Sans One",
    akshar: "Akshar",
  },

  radius: {
    small: "10px",
    medium: "20px",
    large: "30px",
  },

  shadow: {
    basic: "4px 4px 8px 0px rgba(34, 60, 80, 0.2)",
  },
});

export const pageContainer = style({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
});
