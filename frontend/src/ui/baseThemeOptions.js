// theme/baseTheme.ts
export const mainColor = "#FF8D4D";
export const secondaryColor = "#e6763d";

export const baseThemeOptions = {
  palette: {
    primary: {
      main: mainColor,
    },
    secondary: {
      main: secondaryColor,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "1rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "2rem",
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: mainColor,
          "&.Mui-checked": {
            color: mainColor,
          },
        },
      },
    },
  },
};
