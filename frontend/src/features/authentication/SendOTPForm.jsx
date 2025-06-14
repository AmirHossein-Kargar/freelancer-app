import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Loading from "../../ui/Loading";
import { PhoneNumberValidation } from "./OTPValidation";

// * This component renders a form for sending an OTP to a phone number.
// * It uses Material UI components and custom validation logic.

export default function SendOTPForm({ onSubmit, register, errors, isSendOtp }) {
  return (
    <div>
      <div className="flex justify-center items-center">
        <img src="/images/authentication.svg" className="w-[209px] h-[246px]" alt="" />
      </div>

      <section className="my-10 md:text-center space-y-2 px-2">
        <h2 className="text-lg">OTP Verification</h2>
        <p className="font-light text-sm leading-[1.75]">
          Enter phone number to send one time Password
        </p>
      </section>

      <form
        className="flex flex-col gap-4 w-full md:items-center"
        onSubmit={onSubmit}
      >
        <div className="mb-4">
          <TextField
            autoComplete="off"
            label="Phone Number"
            variant="outlined"
            type="tel"
            fullWidth
            color="primary"
            id="phone-number-input"
            {...register("phoneNumber", PhoneNumberValidation
          )
          }
            slotProps={{
              input: {
                startAdornment: (
                  <span style={{ marginRight: 8, color: "#888" }}>+98</span>
                ),
              },
            }}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
        </div>
        <div>
          {isSendOtp ? (
            <Loading />
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              <span className="text-white"> Continue</span>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
