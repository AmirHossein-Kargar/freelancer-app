import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useMutation } from "@tanstack/react-query";
import { getOtp } from "../../services/authService";
import Loading from "../../ui/Loading";
import toast from "react-hot-toast";

export default function SendOTPForm({ setStep, phoneNumber, onChange }) {
  const { isPending, error, data, mutateAsync } = useMutation({
    mutationFn: getOtp,
  });
  const sendOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateAsync({ phoneNumber });
      toast.success(data.message, {
        duration: 4000,
      });
      setStep(2);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={sendOtpHandler}>
        <TextField
          autoComplete="off"
          variant="standard"
          size="small"
          label="شماره موبایل"
          type="tel"
          id="phone-number-input"
          value={phoneNumber}
          helperText="شماره موبایل باید 11 رقم باشد"
          onChange={onChange}
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
        <>
          {isPending ? (
            <Loading />
          ) : (
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{
                width: "fit-content",
                margin: "0 auto",
              }}
            >
              ارسال کد تایید
            </Button>
          )}
        </>
      </form>
    </div>
  );
}
