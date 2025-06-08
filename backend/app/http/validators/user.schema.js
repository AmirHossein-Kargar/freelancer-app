const Joi = require("joi");
const createHttpError = require("http-errors");

const getOtpSchema = Joi.object({
  phoneNumber: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(createHttpError.BadRequest("The entered phone number is invalid")),
});

const checkOtpSchema = Joi.object({
  otp: Joi.string()
    .min(5)
    .max(6)
    .error(createHttpError.BadRequest("The provided OTP code is invalid")),
  phoneNumber: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(createHttpError.BadRequest("The entered phone number is invalid")),
});

const completeProfileSchema = Joi.object({
  name: Joi.string()
    .min(5)
    .max(100)
    .error(createHttpError.BadRequest("The entered username is invalid")),
  email: Joi.string()
    .email()
    .error(createHttpError.BadRequest("The entered email is invalid")),
  role: Joi.string()
    .required()
    .valid("FREELANCER", "OWNER")
    .error(createHttpError.BadRequest("The entered role is invalid")),
});

const updateProfileSchema = Joi.object({
  name: Joi.string()
    .min(5)
    .max(50)
    .required()
    .error(createHttpError.BadRequest("The entered username is invalid")),
  email: Joi.string()
    .required()
    .email()
    .error(createHttpError.BadRequest("The entered email is invalid")),
  phoneNumber: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(createHttpError.BadRequest("The entered phone number is invalid")),
  biography: Joi.string()
    .max(30)
    .allow("")
    .error(createHttpError.BadRequest("The entered biography is invalid")),
});

module.exports = {
  getOtpSchema,
  completeProfileSchema,
  checkOtpSchema,
  updateProfileSchema,
};
