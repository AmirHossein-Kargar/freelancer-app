import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { useMutation } from "@tanstack/react-query";
import { checkOtp } from "../../services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CheckOTPForm({ phoneNumber, setStep }) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const { isPending, error, data, mutateAsync } = useMutation({
    mutationFn: checkOtp,
  });

  // * Handles OTP verification, navigates user based on activation status, and displays notifications.
  const checkOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await mutateAsync({ phoneNumber, otp });
      toast.success(data.message);
      const { user } = data;

      if (data.user.isActive) {
        // * push to panel
        if (user.role === "OWNER") navigate("/owner");
        if (user.role === "FREELANCER") navigate("/freelancer");
      } else {
        navigate("/completed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطایی رخ داده است");
    }
  };

  return (
    <div className="select-none">
      <KeyboardBackspaceIcon
        onClick={() => setStep(1)}
        sx={{
          cursor: "pointer",
          color: "#CECECE",
        }}
      />
      <form action="" className="mt-8" onSubmit={checkOtpHandler}>
        <div className="md:text-center">
          <h2>Verification Code</h2>
          <p className="text-sm font-light my-4">
            We have sent the verification code to your email address
          </p>
        </div>
        <div className="mb-8 ">
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
                  color: "#000",
                  fontSize: "1rem",
                  textAlign: "center",
                  outline: "none",
                  transition: "border-color 0.2s",
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
        </div>

        <div className="flex">
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
        </div>
      </form>
    </div>
  );
}
