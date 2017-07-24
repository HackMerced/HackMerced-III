import Joi from 'joi';

export const adminValidators = {
  postAdmin: {
    payload: {
      email: Joi.string().required().email(),
      password: Joi.string().min(6).required(),
      confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'and password must match' } } }),
      name: Joi.string().required(),
      permissions: Joi.any().valid(TOMOE_CONFIG.adminPermissions)
    }
  },
  validateAdmin: {
    payload: {
      password: Joi.string().required()
    }
  },
  updateAdminPermissions: {
    payload: {
      permissions: Joi.any().valid(TOMOE_CONFIG.adminPermissions).required()
    }
  },
}
