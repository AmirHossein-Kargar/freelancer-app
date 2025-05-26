import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Completed from "./pages/Completed";
import CompleteProfileForm from "./features/authentication/CompleteProfileForm";
import NotFound from "./pages/NotFound";
import Freelancer from "./pages/Freelancer";
import Home from "./pages/Home";
import Owner from "./pages/Owner";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/completed" element={<Completed />} />
      <Route path="/complete-profile" element={<CompleteProfileForm />} />
      <Route path="/" element={<Home/>}/>
      <Route path="*" element={<NotFound/>} />
      <Route path="/freelancer" element={<Freelancer/>}/>
      <Route path="/owner" element={<Owner/>}/>
    </Routes>
  );
}
