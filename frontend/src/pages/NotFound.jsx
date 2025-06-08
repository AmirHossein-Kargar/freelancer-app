import { Button } from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import useMoveBack from "../hooks/useMoveBack";

export default function NotFound() {
  const moveBack = useMoveBack();
  return (
    <div className="p-6 md:p-8 flex flex-col justify-center items-center min-h-screen space-y-6">
      <section>
        <img
          src="/images/NotFound.svg"
          className="w-[320px] md:w-[640px] h-[246px]"
          alt="not found"
        />
      </section>

      <section className="text-center my-8 md:my-10 space-y-2">
        <h2 className="text-2xl">404 - Page Not Found</h2>
        <p>Sorry, the page you’re looking for doesn’t exist.</p>
      </section>

      <Button
        variant="contained"
        onClick={moveBack}
        className="w-full md:w-48 gap-1"
      >
        GO BACK <KeyboardReturnIcon fontSize="small" />
      </Button>
    </div>
  );
}
