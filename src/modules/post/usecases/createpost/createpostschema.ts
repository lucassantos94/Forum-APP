import Joi from '@hapi/joi';

export const createPostSchema = Joi.object({
  text: Joi.string().min(1).max(500).required(),
});
