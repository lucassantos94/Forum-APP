import Joi from '@hapi/joi';

export const commentPostSchema = Joi.object({
  postId: Joi.string().required(),
  text: Joi.string().min(1).max(200).required(),
}).required();
