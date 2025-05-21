import { Button } from "@mui/material";

export default function Completed() {
  return (
    <div className="flex items-center justify-center flex-col text-center select-none h-screen">
      <div className="mb-12">
        <img src="../../../public/images/completed.svg" alt="" />
      </div>
      <div>
        <h2 className="md:text-xl dark:text-white">Success!</h2>
        <p className="text-sm mt-2 mb-8 w-[300px] md:w-auto">
          Congratulations! You have been successfully authenticated
        </p>
      </div>
      <Button
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
