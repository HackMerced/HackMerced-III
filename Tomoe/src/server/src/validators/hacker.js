import Joi from 'joi';

export const hackerValidators = {
  postHacker: {
    payload: {
      email: Joi.string().required().email(),
      password: Joi.string().min(6).required(),
      confirmPassword: Joi.string().required(),
      name: Joi.string(),
      details: Joi.object()
    }
  }
}
