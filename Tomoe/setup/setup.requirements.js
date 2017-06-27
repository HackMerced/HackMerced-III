import Joi from 'joi';

export const env = {
  'DB_URI': {
    description: 'URI of your ArangoDB instance'
  },
  'MODE':{
    description: 'Set to either DEVELOPMENT or PRODUCTION',
    filter: Joi.string().valid('PRODUCTION', 'DEVELOPMENT').required()
  }
}

export const Definitions = {
  server:{
    'DEVELOPMENT': 'Tomoe_dev',
    'PRODUCTION': 'Tomoe'
  },
  userTypes:['admin', 'hacker'],
  apiVersion: '2.0',
  defaultStatuses:[
    'registered',
    'applied',
    'accepted',
    'waitlisted',
    'confirmed',
    'attending',
    'inactive'
  ]
}
