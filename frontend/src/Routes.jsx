import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Completed from "./pages/Completed";
import CompleteProfileForm from "./features/authentication/CompleteProfileForm";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/completed" element={<Completed />} />
      <Route path="/complete-profile" element={<CompleteProfileForm />} />
    </Routes>
  );
}
