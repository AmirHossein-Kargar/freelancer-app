import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useMutation } from "@tanstack/react-query";
import { checkOtp } from "../../services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../ui/Loading";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";

// * OTP TIMER
const RESEND_OTP = 90;

export default function CheckOTPForm({
  phoneNumber,
  onBack,
  onResendOtp,
  otpResponse,
}) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(RESEND_OTP);
  const [showDelayLoading, setShowDelayLoading] = useState(false);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: checkOtp,
  });
  const isLoading = isPending || showDelayLoading;

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

  // * Handles OTP verification, navigates user based on activation status, and displays notifications.
  const checkOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await mutateAsync({ phoneNumber, otp });
      toast.success(data.message);
      const { user } = data;

      // * if user is not active, navigate to complete profile
      if (!data.user.isActive) {
        setShowDelayLoading(true);
        setTimeout(() => {
          setShowDelayLoading(false);
          navigate("/completed");
        }, 3000);
        return;
      }

      setShowDelayLoading(true);
      setTimeout(() => {
        setShowDelayLoading(false);
        if (user.role === "OWNER") return navigate("/owner");
        if (user.role === "FREELANCER") return navigate("/freelancer");
        // * fallback
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="py-8">
      <KeyboardBackspaceIcon
        onClick={onBack}
        sx={{
          cursor: "pointer",
          color: "var(--color-secondary)",
        }}
      />

      <form action="" className="mt-8" onSubmit={checkOtpHandler}>
        <div className="md:text-center">
          <h2 className="dark:text-white">Verification Code</h2>
          <div className="mt-2 flex items-center md:justify-center">
            {otpResponse && <p>code sent to {otpResponse?.phoneNumber}</p>}
            <button
              type="button"
              className="cursor-pointer ml-2"
              onClick={onBack}
            >
              <ModeOutlinedIcon
                fontSize="small"
                sx={{
                  color: {
                    xs: "inherit",
                    "@media (prefers-color-scheme: dark)": {
                      color: "#fff",
                    },
                  },
                }}
                className="dark:text-white"
              />
            </button>
          </div>
          <p className="text-sm font-light my-4">
            We have sent the verification code to your PhoneNumber
          </p>
        </div>
        <div className="mb-4 ">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                className="text-black dark:text-white border border-gray-400 rounded-lg text-center text-base outline-none transition-colors duration-200 bg-transparent focus:border-primary dark:border-gray-600"
              />
            )}
            inputStyle={{
              width: "2.5rem",
              height: "2rem",
            }}
            containerStyle="flex gap-x-2 justify-center "
            renderSeparator={<span className="w-2"></span>}
          />
          <div className="flex justify-center items-center mt-4">
            {time > 0 ? (
              <p>{time} Remaining</p>
            ) : (
              <Button
                size="small"
                onClick={onResendOtp}
                color="primary"
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                Send Again
              </Button>
            )}
          </div>
        </div>

        <div>
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
                display: "block",
                marginLeft: { md: "auto", xs: 0 },
                marginRight: { md: "auto", xs: 0 },
              }}
            >
              Confirm
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
