// theme/lightTheme.ts
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
    ...baseThemeOptions.components
    //  MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       color: "#fff"
    //     },
    //     containedPrimary: {
    //       "&:hover": {
    //         backgroundColor: "#e6763d",
    //       },
    //     },
    //   },
    // },
  },
});
