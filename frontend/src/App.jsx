import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./Routes";
import { ThemeProvider, useMediaQuery } from "@mui/material";
import { darkTheme } from "./ui/darkTheme";
import { lightTheme } from "./ui/lightTheme";
import { useMemo } from "react";

const queryClient = new QueryClient();

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(() => (prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Toaster />
        <AppRoutes />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
