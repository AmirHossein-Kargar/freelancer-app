import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UseHandleUserRedirect(delay = 3000) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRedirect = (user) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      switch (user.role?.toUpperCase()) {
        case "OWNER":
          return navigate("/owner");
        case "FREELANCER":
          return navigate("/freelancer");
        default:
          return navigate("/");
      }
    }, delay);
  };

  return { handleRedirect, loading };
}
export default UseHandleUserRedirect;
