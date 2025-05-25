import { createTheme } from "@mui/material/styles";
import { baseThemeOptions } from "./baseThemeOptions";

const mainColor = "#FF8D4D";

export const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    ...baseThemeOptions.palette,
    mode: "light",
    primary: {
      main: mainColor,
    },
  },
  components: {
    ...baseThemeOptions.components,
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#000",
          "&.Mui-focused": {
            color: "#000",
          },
        },
      },
    },
  },
});
