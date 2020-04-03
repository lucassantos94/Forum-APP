import Joi from '@hapi/joi';

export const getAllPostCommentsSchema = Joi.object({
  page: Joi.number().min(0).required(),
  postId: Joi.string().required(),
}).required();
