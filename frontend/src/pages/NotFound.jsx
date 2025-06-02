import { Button } from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import useMoveBack from "../hooks/useMoveBack";

export default function NotFound() {
  const moveBack = useMoveBack();
  return (
    <div className="p-8 select-none flex flex-col justify-center items-center min-h-screen">
      <section>
        <img
          src="/images/NotFound.svg"
          className="w-[320px] md:w-[640px] h-[246px]"
          alt=""
        />
      </section>
      <section className="text-center my-8 md:my-10 space-y-4">
        <h2 className="dark:text-white">404 Not Found</h2>
        <p>Oops! This page doesn’t exist.</p>
      </section>
      <Button
        variant="outlined"
        className="w-full md:w-auto"
        onClick={moveBack}
      >
        GO BACK <KeyboardReturnIcon fontSize="small" />
      </Button>
    </div>
  );
}
