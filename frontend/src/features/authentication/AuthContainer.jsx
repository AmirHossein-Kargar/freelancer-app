import { useState } from "react";
import SendOTPForm from "./SendOTPForm";
import CheckOTPForm from "./CheckOTPForm";

import { useMutation } from "@tanstack/react-query";
import { getOtp } from "../../services/authService";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function AuthContainer() {
  const [step, setStep] = useState(1);
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const {
    isPending: isSendOtp,
    data: otpResponse,
    mutateAsync,
  } = useMutation({
    mutationFn: getOtp,
  });

  const sendOtpHandler = async (data) => {
    try {
      const {message} = await mutateAsync(data);
      toast.success(message, {
        duration: 4000,
      });
      setStep(2);
    } catch (error) {
     toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };


  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm
            onSubmit={handleSubmit(sendOtpHandler)}
            setStep={setStep}
            isSendOtp={isSendOtp}
            register={register}
            errors={errors}
          />
        );
      case 2:
        return (
          <CheckOTPForm
            onBack={() => setStep(1)}
            phoneNumber={getValues("phoneNumber")}
            onResendOtp={handleSubmit(sendOtpHandler)}
            otpResponse={otpResponse}
          />
        );
      default:
        return null;
    }
  };

  return <>{renderStep()}</>;
}
