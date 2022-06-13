import Joi from "joi";

class PostValidation {
  static createPost = Joi.object({
    userId: Joi.string().required(),
    description: Joi.string().required(),
  });
  static updateLikes = Joi.object({
    userId: Joi.string().required(),
    postId: Joi.string().required(),
  });
}

export { PostValidation };
