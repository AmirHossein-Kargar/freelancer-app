import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./Routes";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Toaster />
        <AppRoutes />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
