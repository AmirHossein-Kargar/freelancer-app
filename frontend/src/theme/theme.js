import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#4a6dff",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "20px",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "20px",
                },
            },
        },
    },
});

export default theme;
