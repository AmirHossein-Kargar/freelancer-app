import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import { useMutation } from "@tanstack/react-query";
import { completeProfile } from "../../services/authService";
import toast from "react-hot-toast";
import Loading from "../../ui/Loading";
import { Controller, useForm } from "react-hook-form";
import { completeProfileValidation } from "./OTPValidation";
import UseHandleUserRedirect from "../../utils/handleUserRedirect";

export default function CompleteProfileForm() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: completeProfile,
  });

  const { handleRedirect, loading } = UseHandleUserRedirect(); // * Custom hook to manage user redirection based on their role and activation status

  const onSubmit = async (data) => {
    try {
      const res = await mutateAsync(data);
      toast.success(res.data.message);
      handleRedirect(res.data.user);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8">
      <section className="flex justify-center items-center">
        <img
          className="w-72 h-auto max-w-full"
          src="/images/complete-profile.svg"
          alt=""
        />
      </section>

      <h2 className="mt-10 md:text-center">Complete Your Profile</h2>

      <div className="flex mt-6 justify-center">
        <div className="flex flex-col gap-y-6 w-full md:w-1/2">
          <TextField
            label="Full Name"
            className="w-full"
            {...register("name", completeProfileValidation.name)}
            error={!!errors.name}
            helperText={errors.name?.message}
            type="text"
            InputProps={{
              startAdornment: (
                <span
                  style={{
                    paddingRight: 8,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PersonIcon color="primary" />
                </span>
              ),
            }}
          />

          <TextField
            label="Email"
            className="w-full"
            {...register("email", completeProfileValidation.email)}
            error={!!errors.email}
            helperText={errors.email?.message}
            type="email"
            InputProps={{
              startAdornment: (
                <span
                  style={{
                    paddingRight: 8,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MailIcon color="primary" />
                </span>
              ),
            }}
          />

          <FormControl sx={{ maxWidth: "600px", margin: "0 auto" }}>
            <FormLabel>Role</FormLabel>

            <Controller
              name="role"
              control={control}
              defaultValue="OWNER"
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value="FREELANCER"
                    control={<Radio />}
                    label="Freelancer"
                  />

                  <FormControlLabel
                    value="OWNER"
                    control={<Radio />}
                    label="Client"
                  />
                </RadioGroup>
              )}
            />
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </FormControl>

          {loading || isPending ? (
            <Loading />
          ) : (
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: { xs: "100%", md: "50%" },
                alignSelf: "center",
              }}
            >
              Confirm
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
