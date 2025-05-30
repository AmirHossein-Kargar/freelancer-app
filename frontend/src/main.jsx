import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
// import { ThemeProvider } from "@mui/material";
// import { theme } from "./ui/muiTheme.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <ThemeProvider theme={theme}> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </ThemeProvider> */}
  </StrictMode>
);
