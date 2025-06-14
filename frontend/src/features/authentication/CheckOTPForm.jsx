import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useMutation } from "@tanstack/react-query";
import { checkOtp } from "../../services/authService";
import toast from "react-hot-toast";
import Loading from "../../ui/Loading";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import UseHandleUserRedirect from "../../utils/handleUserRedirect";

// * OTP TIMER
const RESEND_OTP = 90; // * 90 seconds for OTP resend

export default function CheckOTPForm({
  phoneNumber,
  onBack,
  onResendOtp,
  otpResponse,
}) {
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(RESEND_OTP);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: checkOtp,
  });

  useEffect(() => {
    const timer =
      time > 0 &&
      setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  const { handleRedirect, loading } = UseHandleUserRedirect(3000);
  const isLoading = isPending || loading;

  // * Handles OTP verification, navigates user based on activation status, and displays notifications.
  const checkOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await mutateAsync({ phoneNumber, otp });
      toast.success(data.message);
      handleRedirect(data.user);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <main>
      <KeyboardBackspaceIcon
        titleAccess="Go Back"
        aria-label="Go Back"
        onClick={onBack}
        sx={{
          cursor: "pointer",
          "&:hover": {
            color: "var(--color-primary)",
          },
        }}
      />

      <form className="mt-8" onSubmit={checkOtpHandler}>
        <section className="md:text-center">
          <h1>Verification Code</h1>
          <div className=" flex items-center md:justify-center">
            <p className="text-sm font-light my-4">
              We’ve sent a code to{" "}
              <span className="font-bold">{otpResponse?.phoneNumber}</span>
            </p>
            <button
              type="button"
              className="cursor-pointer ml-2"
              onClick={onBack}
            >
              <ModeOutlinedIcon
                fontSize="small"
                sx={{ fontSize: "15px " }}
                aria-label="Edit Phone Number"
              />
            </button>
          </div>
        </section>

        <div className="space-y-6">
          <div>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              containerStyle="flex gap-2 justify-center"
              renderInput={(props) => (
                <input
                  {...props}
                  className="text-black transition-all-custom border border-secondary rounded-lg text-center text-base outline-none bg-transparent focus:border-primary hover:border-primary"
                />
              )}
              inputStyle={{
                width: "2.5rem",
                height: "2rem",
              }}
              renderSeparator={<span className="w-1"></span>}
            />
          </div>

          <div className="flex justify-center items-center mb-2">
            {time > 0 ? (
              <p>{time} Remaining</p>
            ) : (
              <Button
                size="small"
                onClick={onResendOtp}
                color="primary"
                variant="text"
              >
                Send Again
              </Button>
            )}
          </div>
        </div>

        <div className="text-center">
          {isLoading ? (
            <Loading />
          ) : (
            <Button
              size="large"
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                color: "#fff",
                width: { xs: "100%", md: "auto" },
                mx: "auto",
              }}
            >
              Confirm
            </Button>
          )}
        </div>
      </form>
    </main>
  );
}
