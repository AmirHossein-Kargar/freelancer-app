import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Completed() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center flex-col text-center min-h-screen space-y-8 md:space-y-10 lg:space-y-12">
      <div>
        <img
          src="/images/completed.svg"
          className="w-[209px] h-[246px]"
          alt=""
        />
      </div>
      <div className="space-y-2">
        <h2 className="md:text-xl">Success!</h2>
        <p className="text-sm max-w-xs md:max-w-md mx-auto">
          Congratulations! You have been successfully authenticated
        </p>
      </div>
      <div>
        <Button
          onClick={() => navigate("/complete-profile")}
          size="large"
          variant="contained"
        >
          Complete Profile
        </Button>
      </div>
    </div>
  );
}
