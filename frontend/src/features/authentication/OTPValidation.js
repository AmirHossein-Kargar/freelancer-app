// * Validation rules for phone number input in the authentication feature.
// * Ensures the phone number is required and exactly 11 digits (numeric only).

export const PhoneNumberValidation = {
  required: "Phone number is required",
  pattern: {
    value: /^[0-9]{11}$/,
    message: "Phone number must be 11 digits",
  },
};
export const completeProfileValidation = {
  name: {
    required: "Please enter your full name",
    minLength: {
      value: 5,
      message: "Name must be at least 5 characters",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Email must be valid and contain @",
    },
  }
};
