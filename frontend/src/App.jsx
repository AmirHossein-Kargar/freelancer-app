import { Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";


export default function App() {
  return (
      <div className="container mt-4 flex justify-center items-center mx-auto">
        <Routes>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
  );
}

//  auth with OTP
// form => get otp => input + button
// form => check OTP => request => ...phoneNumber is verified ??

// ? axios
// ? useFetch
// ? react query (remote state) can handle fetch
