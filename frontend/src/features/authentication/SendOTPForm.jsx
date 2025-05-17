import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
export default function SendOTPForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <div>
      <form className="flex flex-col gap-4">
        <TextField
          autoComplete="off"
          variant="standard"
          size="small"
          label="شماره موبایل"
          type="tel"
          id="phone-number-input"
          value={phoneNumber}
          helperText="شماره موبایل باید 11 رقم باشد"
          onChange={(e) => setPhoneNumber(e.target.value)}
          sx={{
            direction: "ltr",
            "& .MuiInputLabel-root": {
              textAlign: "center",
              width: "100%",
              transformOrigin: "center",
              "&.Mui-focused": {
                transform: "translate(0, -1.5px) scale(0.75)",
              },
              "&.MuiFormLabel-filled": {
                transform: "translate(0, -1.5px) scale(0.75)",
              },
            },
            "& .MuiFormHelperText-root": {
              textAlign: "right",
              marginRight: 0,
              marginLeft: "auto",
            },
          }}
        />
        <Button
          variant="contained"
          size="small"
          sx={{
            width: "fit-content",
            margin: "0 auto",
          }}
        >
          ارسال کد تایید
        </Button>
      </form>
    </div>
  );
}
