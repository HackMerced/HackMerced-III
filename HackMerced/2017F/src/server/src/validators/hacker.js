import Joi from 'joi';
import fs from 'fs';
import path from 'path';

import { notMercedOptions } from '../../../app/src/constants'

export const hackerValidators = {
  postLogin: {
  },
  postSignup: {
  },
  getMe:{
    payload:{
      id: Joi.string().required()
    }

  },
  postSubmit: {
    payload:{
      age: Joi.number().integer().min(14).max(121).required().options({ language: { any: { allowOnly: 'Sorry we only allow people older than age 14 and younger than 121!' } } }),
      status: Joi.required(),
      university: Joi.any().when('status', {
        is: Joi.string().valid(['Undergraduate University Student', 'Graduate University Student']).required(),
        then: Joi.string().required(),
      }),
      expected_graduation: Joi.any().when('status', {
        is: Joi.string().valid(['Undergraduate University Student', 'Graduate University Student']).required(),
        then: Joi.string().required().label('Expected graduation')
      }),
      high_school: Joi.any().when('status', {
        is: Joi.string().valid(['High School Student']).required(),
        then: Joi.string().required().label('High School')
      }),
      shirt_size: Joi.string().required(),
      general_location: Joi.string().required(),
      city_of_residence: Joi.any().when('general_location', {
        is: Joi.string().valid(notMercedOptions).required(),
        then: Joi.string().required().label("This question"),
      }),
      pay_20_for_bus: Joi.any().when('general_location', {
        is: Joi.string().valid(notMercedOptions).required(),
        then: Joi.string().required().label("This question"),
      }),
      resume: Joi.string().required(),
      github: Joi.string().allow([null, '']).optional().regex(/((http?s:\/\/)?(www.)?github.com\/.*)/),
      linkedin: Joi.string().allow([null, '']).optional().regex(/(http?s:\/\/)?(www.)?linkedin.com\/in\/.*/),
      devpost: Joi.string().allow([null, '']).optional().regex(/(http?s:\/\/)?(www.)?devpost.com\/.*/),
      experience: Joi.string().required(),
      dietary_restrictions: Joi.string().required(),
      allergies: Joi.string().allow([null, '']).optional(),
      mlh: Joi.string().valid('Yes').required()
    }
  }
}
