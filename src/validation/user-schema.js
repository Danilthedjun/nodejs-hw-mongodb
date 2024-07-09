import Joi from 'joi';
import email from '../constants/users-constants.js';

export const userSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(email).required(),
  password: Joi.string().required(),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(email).required(),
  password: Joi.string().required(),
});
