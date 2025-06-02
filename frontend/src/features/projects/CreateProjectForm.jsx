import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { projectValidation } from "./projectValidation";

// * title, description, tags, category, budget, deadline
export default function CreateProjectForm() {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-[300px]"
      >
        <TextField
          label="Title"
          type="text"
          {...register("title", projectValidation.title)}
          error={!!errors.title}
          helperText={errors.title?.message}
          variant="outlined"
          size="small"
        />
        {/* <TextField
        size="small"
        type="text"

        /> */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            color: "#fff",
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
