import { createTheme } from "@mui/material/styles";

const isDarkMode = document.documentElement.classList.contains("dark");

export const theme = createTheme({
  palette: {
    mode: isDarkMode ? "dark" : "light",
    primary: {
      main: "#FF8D4D",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "1rem",
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#e6763d",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "1rem",
        },
      },
    },
  },
});
