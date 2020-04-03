import Joi from '@hapi/joi';

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  pass: Joi.string().required(),
}).required();
