import joi from "joi";

export const validateRegister = joi.object({
  username: joi.string().min(3).max(50).required(),
  email: joi.string().required().email(),
  password: joi.string().min(3).max(10).required(),
});

export const validateLogin = joi.object({
  email: joi.string().required().email(),
  password: joi.string().min(3).max(10).required(),
});

export const validateUsername = joi.object({
  username: joi.string().min(3).max(50),
});

export const validatePassword = joi.object({
  password: joi.string().min(3).max(10),
});
