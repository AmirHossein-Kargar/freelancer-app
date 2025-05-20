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
    <div className="select-none">
      <div className="flex justify-center items-center">
        <img src="/../public/images/Image.svg" alt="" />
      </div>
      <section className="mt-10 md:text-center space-y-4 px-2">
        <h2 className="text-lg m-0 md">OTP Verification</h2>
        <p className="font-light text-sm leading-[1.75] mt-2 mb-10">
          Enter phone number to send one time Password
        </p>
      </section>

      <form className="flex flex-col gap-4 w-full md:items-center" onSubmit={sendOtpHandler}>
        <div className="mb-4">
          <TextField
            autoComplete="off"
            label="Phone Number"
            variant="outlined"
            type="tel"
            fullWidth
            color="primary"
            id="phone-number-input"
            value={phoneNumber}
            onChange={onChange}
          />
        </div>
        <div>
          {isPending ? (
            <Loading />
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              // size={window.innerWidth < 768 ? "large" : "medium"}
              size="large"
            >
              <span> Continue</span>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
