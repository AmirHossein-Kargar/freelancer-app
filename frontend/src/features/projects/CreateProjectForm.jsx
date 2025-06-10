import { Button, InputAdornment, TextField } from "@mui/material";
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
    <div className="flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4  w-full max-w-xs"
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
        {/* Description */}
        <TextField
          size="small"
          label="Description"
          multiline
          rows={4}
          placeholder="Describe your project briefly..."
          {...register("description", projectValidation.description)}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        {/* Budget */}
        <TextField
          variant="outlined"
          label="Budget"
          size="small"
          type="number"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            },
          }}
          onKeyDown={(e) => {
            if (["-", "e", "E", "+"].includes(e.key)) {
              e.preventDefault();
            }
          }}
          {...register("budget", projectValidation.budget)}
          error={!!errors.budget}
          helperText={errors.budget?.message}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
}
