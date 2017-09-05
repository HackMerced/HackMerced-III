import Joi from 'joi';

export const hackerValidators = {
  postHacker: {
    failAction: require('relish')({
      stripQuotes: true,
      messages: {
        'status': 'Please only enter the following statuses: ' + TOMOE_CONFIG.hackerStatuses.join(', '),
      }
    }).failAction,
    payload: {
      email: Joi.string().required().email(),
      password: Joi.string().min(6).required(),
      confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'and password must match' } } }),
      name: Joi.string(),
      details: Joi.object(),
      status: Joi.any().valid(TOMOE_CONFIG.hackerStatuses)
    }
  },
  validateHacker: {
    payload: {
      password: Joi.string().required()
    }
  },
  updateHackerStatus: {
    failAction: require('relish')({
      stripQuotes: true,
      messages: {
         'status': 'Please only enter the following statuses: ' + TOMOE_CONFIG.hackerStatuses.join(', '),
      }
    }).failAction,
    payload: {
      status: Joi.any().valid(TOMOE_CONFIG.hackerStatuses).required()
    }
  },
}
