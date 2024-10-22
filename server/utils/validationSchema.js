const Joi = require("@hapi/joi");

const authRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).required(),
  code: Joi.string().required(),
  currentUrl: Joi.string().required(),
});

const authLoginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});

const contactSchema = Joi.object({
  language: Joi.string().required().valid("vi", "jp"),
  address: Joi.string().required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  email: Joi.string().email().required(),
});

const recruitEmailSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  gender: Joi.string().required(),
  birthday: Joi.string().required(),
  university: Joi.string(),
  major: Joi.string().required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  email: Joi.string().email().required(),
  content: Joi.string().required(),
});

module.exports = {
  authRegisterSchema,
  authLoginSchema,
  contactSchema,
  recruitEmailSchema,
};
