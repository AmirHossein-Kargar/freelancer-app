import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { completeProfileValidation } from "./OTPValidation";

export default function CompleteProfileForm() {
  const [role, setRole] = useState("");
  const [showDelayLoading, setShowDelayLoading] = useState(false); // * State to control the display of a loading indicator with a delay after form submission
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: completeProfile,
  });

  const onSubmit = async (data) => {
    try {
      const res = await mutateAsync(data);
      toast.success(res.data.message);

      const userRole = res.data.user?.role?.toUpperCase();
      setShowDelayLoading(true);

      setTimeout(() => {
        setShowDelayLoading(false);
        if (userRole === "OWNER") return navigate("/owner");
        if (userRole === "FREELANCER") return navigate("/freelancer");

        navigate("/");
      }, 3000);
    }
     catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
    
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container p-8 select-none"
    >
      <section className="flex justify-center items-center">
        <img
          className="w-[300px] h-[246px]"
       src="/images/personal2.svg"
          alt=""
        />
      </section>

      <h2 className="mt-10 md:text-center dark:text-white">
        Complete Your Profile
      </h2>

      <div className="flex flex-col gap-y-8 mt-4 md:items-center md:justify-center md:w-full">
        <TextField
          label="Full Name"
          className="md:w-1/2"
          {...register("name", completeProfileValidation.name)}
          error={!!errors.name}
          helperText={errors.name?.message}
          required
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
          className="md:w-1/2"
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
        <FormControl>
          <FormLabel>Role</FormLabel>
          <RadioGroup
            row
            value={role}
            defaultValue="Client"
            onChange={(e) => setRole(e.target.value)}
          >
            <FormControlLabel
              value="FREELANCER"
              control={<Radio />}
              label="Freelancer"
              checked={role === "FREELANCER"}
            />
            <FormControlLabel
              value="OWNER"
              control={<Radio />}
              label="Client"
              onChange={(e) => setRole(e.target.value)}
              checked={role === "OWNER"}
            />
          </RadioGroup>
        </FormControl>

        {showDelayLoading || isPending ? (
          <Loading />
        ) : (
          <Button
            variant="contained"
            sx={{ color: "#fff" }}
            className="md:w-1/2"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Confirm
          </Button>
        )}
      </div>
    </form>
  );
}
