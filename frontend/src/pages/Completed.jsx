import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Completed() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center flex-col text-center h-screen">
      <div className="mb-12">
        <img src="/images/completed.svg" alt="" />
      </div>
      <div>
        <h2 className="md:text-xl dark:text-white">Success!</h2>
        <p className="text-sm mt-2 mb-8 w-[300px] md:w-auto">
          Congratulations! You have been successfully authenticated
        </p>
      </div>
      <Button
        onClick={() => navigate("/complete-profile")}
        size="large"
        variant="contained"
        sx={{
          color: "#fff",
          width: { xs: "100%", md: "auto" },
        }}
      >
        Complete Profile
      </Button>
    </div>
  );
}
