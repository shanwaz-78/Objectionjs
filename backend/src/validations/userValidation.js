import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name should have at least 3 characters",
    "string.max": "Name should not exceed 50 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().trim().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email cannot be empty",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .trim()
    .min(6)
    .max(20)
    .messages({
      "string.base": "Password must be a string",
      "string.empty": "Password cannot be empty",
      "any.required": "Password is required",
    }),
});

export { userSchema };
