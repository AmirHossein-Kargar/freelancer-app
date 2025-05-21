import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Loading from "../../ui/Loading";

export default function SendOTPForm({
  onSubmit,
  phoneNumber,
  onChange,
  isSendOtp
}) {
  return (
    <div className="select-none">
      <div className="flex justify-center items-center">
        <img src="/../public/images/Image.svg" alt="" />
      </div>
      <section className="mt-10 md:text-center space-y-4 px-2">
        <h2 className="text-lg m-0 md dark:text-white">OTP Verification</h2>
        <p className="font-light text-sm leading-[1.75] mt-2 mb-10">
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
            value={phoneNumber}
            onChange={onChange}
            slotProps={{
              input: {
                startAdornment: (
                  <span style={{ marginRight: 8, color: "#888" }}>+98</span>
                ),
              },
            }}
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
              <span> Continue</span>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
