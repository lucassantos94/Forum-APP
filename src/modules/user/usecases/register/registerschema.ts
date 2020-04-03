import Joi from '@hapi/joi';

export const registerSchema = Joi.object({
  user: Joi.string().min(5).max(40).required(),
  alias: Joi.string().min(5).max(40).required(),
  pass: Joi.string().min(5).max(15).required(),
  email: Joi.string().email().required(),
}).required();
