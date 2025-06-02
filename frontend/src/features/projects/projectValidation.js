// * Project validation rules
export const projectValidation = {
  title: {
    required: "Title is Necessary",
    minLength: {
      value: 5,
      message: "Title must be at least 5 characters",
    },
  },
};
