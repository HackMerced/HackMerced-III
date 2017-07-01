import Joi from 'joi';

export const env = {
  'DB_URI': {
    description: 'URI of your ArangoDB instance'
  },
  'NODE_ENV':{
    description: 'Set to either production or development',
    filter: Joi.string().valid('production', 'development').required()
  }
}

export const Definitions = {
  server:{
    development: 'Tomoe_dev',
    test: 'Tomoe_test',
    production: 'Tomoe'
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
  ],
  collections:[
    'admins',
    'hackers',
  ]
}
