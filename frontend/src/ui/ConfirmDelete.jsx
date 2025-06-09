import { Button } from "@mui/material";

export default function ConfirmDelete({ resource, onClose, onConfirm,disabled }) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm">Are You sure You want to delete <span className="font-semibold">{resource}</span>?</h2>
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
