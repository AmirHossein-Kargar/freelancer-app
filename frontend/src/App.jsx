import { Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <div className="container mt-4 flex justify-center items-center mx-auto">
        <Routes>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}
