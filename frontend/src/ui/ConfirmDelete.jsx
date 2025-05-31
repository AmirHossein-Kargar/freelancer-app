import { Button } from "@mui/material";

export default function ConfirmDelete({ resource, onClose, onConfirm,disabled }) {
  return (
    <div className="">
      <h2>Are You sure You want to delete {resource}?</h2>
      <div className="flex justify-between items-center mt-4">
        <Button variant="text" color="error" size="small" onClick={onConfirm} disabled={disabled}>
          I'm sure
        </Button>
        <Button variant="text" size="small" onClick={onClose} disabled={disabled}>
          No, keep it
        </Button>
      </div>
    </div>
  );
}
