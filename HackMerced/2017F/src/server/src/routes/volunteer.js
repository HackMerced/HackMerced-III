import Joi from 'joi';
import Boom from 'boom';
import { volunteerHandlers } from '../handlers'
import { volunteerValidators } from '../validators'

// [POST] /login
export const postVolunteer = {
	path: '/signup',
	method: 'POST',
	config: {
		handler: volunteerHandlers.postVolunteer,
	}
};a

// [GET] /me
export const getMe = {
    path: '/me',
    method: 'GET',
    config: {
      handler: volunteerHandlers.getMe,
      auth: {
          strategy: 'token',
      }
    }
};

// [POST] /submit
export const postSubmit = {
    path: '/submit',
    method: 'POST',
    config: {
      handler: volunteerHandlers.postSubmit,
      validate: volunteerValidators.postSubmit,
      auth: {
          strategy: 'token',
      }
    }
};

const volunteerRoutes = [
	postVolunteer,
	getMe,
	postSubmit
]

export default volunteerRoutes;

