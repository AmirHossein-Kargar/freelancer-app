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
  const [isLoading, setIsLoading] = useState(false);

  const { isPending, error, data, mutateAsync } = useMutation({
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

  // * Handles OTP verification, navigates user based on activation status, and displays notifications.
  const checkOtpHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await mutateAsync({ phoneNumber, otp });
      console.log(otpResponse);

      toast.success(data.message);
      const { user } = data;

      if (data.user.isActive) {
        // * push to panel
        if (user.role === "OWNER") navigate("/owner");
        if (user.role === "FREELANCER") navigate("/freelancer");
      } else {
        setTimeout(() => {
          navigate("/completed");
        }, 3000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطایی رخ داده است");
      setIsLoading(false);
    }
  };

  return (
    <div className="select-none">
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
            <button className="cursor-pointer ml-2" onClick={onBack}>
              <ModeOutlinedIcon fontSize="small" />
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
                style={{
                  ...props.style,
                  width: "2.5rem",
                  height: "2.5rem",
                  border: "1px solid #9ca3af",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  textAlign: "center",
                  outline: "none",
                  transition: "border-color 0.2s",
                  background: "transparent",
                  color: document.documentElement.classList.contains("dark")
                    ? "var(--color-secondary)"
                    : "#000",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#FF8D4D";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#9ca3af";
                }}
              />
            )}
            containerStyle="flex gap-x-2 justify-center "
            renderSeparator={<span className="w-2"></span>}
          />
          <div className="flex justify-center items-center mt-4">
            {time > 0 ? (
              <p>{time} Remaining</p>
            ) : (
              <Button size="small" onClick={onResendOtp}>
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
              fullWidth
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
