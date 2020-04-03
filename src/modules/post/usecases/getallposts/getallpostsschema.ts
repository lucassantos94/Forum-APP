import Joi from '@hapi/joi';

export const getAllPostsSchema = Joi.object({
  page: Joi.number().min(0).required(),
}).required();
