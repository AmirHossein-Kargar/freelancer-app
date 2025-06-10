// * Project validation rules
export const projectValidation = {
  title: {
    required: "Title is Necessary",
    minLength: {
      value: 5,
      message: "Title must be at least 5 characters",
    },
  },
  description: {
    required: "Description is required",
    minLength: {
      value: 10,
      message: "Description must be at least 10 characters",
    },
    maxLength: {
      value: 1000,
      message: "Description must be less than 1000 characters",
    },
  },
  budget: {
    required: "Budget is required",
    valueAsNumber: true,
  },
};
