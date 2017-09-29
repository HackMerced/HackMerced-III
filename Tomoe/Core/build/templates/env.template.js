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
