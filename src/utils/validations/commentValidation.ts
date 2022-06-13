import Joi from "joi";

class CommentValidation {
  static createComment = Joi.object({
    userId: Joi.string().required(),
    postId: Joi.string().required(),
    description: Joi.string().required(),
  });
}

export { CommentValidation };
