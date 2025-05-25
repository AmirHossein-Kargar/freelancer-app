import { createTheme } from "@mui/material/styles";
import { baseThemeOptions } from "./baseThemeOptions";

const mainColor = "#FF8D4D";

export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    ...baseThemeOptions.palette,
    mode: "dark",
    primary: {
      main: mainColor,
    },
  },
  components: {
    ...baseThemeOptions.components,
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#fff",
          "&.Mui-focused": {
            color: "#fff",
          },
        },
      },
    },
  },
});
