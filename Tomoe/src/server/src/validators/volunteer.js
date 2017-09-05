import Joi from 'joi';


export const volunteerValidators = {
  postVolunteer: {
    failAction: require('relish')({
      stripQuotes: true,
      messages: {
        'status': 'Please only enter the following statuses: ' + TOMOE_CONFIG.volunteerStatuses.join(', '),
      }
    }).failAction,
    payload: {
      email: Joi.string().required().email(),
      name: Joi.string(),
      details: Joi.object(),
      availability: Joi.string(),
      status: Joi.any().valid(TOMOE_CONFIG.volunteerStatuses)
    }
  },
  validateVolunteer: {
    payload: {
      password: Joi.string().required()
    }
  },
  updateVolunteerStatus: {
    failAction: require('relish')({
      stripQuotes: true,
      messages: {
        'status': 'Please only enter the following statuses: ' + TOMOE_CONFIG.volunteerStatuses.join(', '),
      }
  }).failAction,
    payload: {
      status: Joi.any().valid(TOMOE_CONFIG.volunteerStatuses).required()
    }
  },
}
