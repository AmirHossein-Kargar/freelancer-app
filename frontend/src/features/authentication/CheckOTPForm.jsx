import { Button } from "@mui/material";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { useMutation } from "@tanstack/react-query";
import { checkOtp } from "../../services/authService";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

export default function CheckOTPForm({ phoneNumber }) {
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

      if (data.user.isActive) {
        // * push to panel
      } else {
        navigate("/complete-profile");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطایی رخ داده است");
    }
  };

  return (
    <div>
      <form
        action=""
        className="text-center space-y-5"
        onSubmit={checkOtpHandler}
      >
        <p className="font-bold mb-4">کد تایید را وارد کنید</p>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => <input {...props} />}
          containerStyle="flex flex-row-reverse gap-x-2 justify-center"
          renderSeparator={<span className="w-2"></span>}
          inputStyle={{
            width: "2.5rem",
            height: "2.5rem",
            padding: "0.5rem",
            border: "1px solid #9ca3af",
            borderRadius: "0.5rem",
            color: "#000",
            fontSize: "1rem",
            textAlign: "center",
          }}
        />
        <div className="flex gap-4 items-center justify-center">
          <Button
            size="small"
            variant="contained"
            color="primary"
            type="submit"
          >
            تایید
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => setOtp("")}
          >
            پاک کردن
          </Button>
        </div>
      </form>
    </div>
  );
}
