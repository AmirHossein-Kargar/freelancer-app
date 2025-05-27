import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Completed from "./pages/Completed";
import CompleteProfileForm from "./features/authentication/CompleteProfileForm";
import NotFound from "./pages/NotFound";
import Freelancer from "./pages/Freelancer";
import Home from "./pages/Home";
import Owner from "./pages/OwnerDashboard";
import AppLayout from "./ui/AppLayout";
import Projects from "./pages/Projects";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/completed" element={<Completed />} />
      <Route path="/complete-profile" element={<CompleteProfileForm />} />

      <Route path="/owner" element={<AppLayout />}>
        <Route index element={<Navigate to="dashboard" replace/>} />
        <Route path="dashboard" element={<Owner />} />
        <Route path="projects" element={<Projects />} />
        {/* <Route path="projects/:id" element={<Projects />} /> */}
      </Route>

      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
