import { Button } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/5 backdrop-blur-sm">
      <div
        className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    w-full max-w-lg md:max-w-xl lg:max-w-2xl
    rounded-lg bg-white p-6 shadow-lg
    transition-all duration-300 mx-2 max-h-[calc(100vh-2rem)] overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b pb-2 mb-6">
          <h1 className="text-base font-bold">{title}</h1>
          <Button
            onClick={onClose}
            color="error"
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <CloseOutlinedIcon />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
