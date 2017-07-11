import Joi from 'joi';

export const hackerValidators = {
  postLogin: {
    // tomoe handles this
  },
  postSignup: {
    // tomoe handles this
  },
  getMe:{
    payload:{
      id: Joi.string().required()
    }

  }
}
