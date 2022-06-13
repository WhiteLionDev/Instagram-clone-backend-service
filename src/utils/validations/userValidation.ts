import Joi from "joi";

class UserValidation {
  static retrieveInfo = Joi.object({
    userId: Joi.string().required(),
  });
  static signIn = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  static signUp = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(), 
    password: Joi.string().min(6).required(),
  });
  static updateFollowers = Joi.object({
    userId: Joi.string().required(),
    followId: Joi.string().required(), 
  });
}

export { UserValidation };
