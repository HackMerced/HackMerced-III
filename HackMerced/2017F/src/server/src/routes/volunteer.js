import Joi from 'joi';
import Boom from 'boom';
import { hackerHandlers } from '../handlers'
import { hackerValidators } from '../validators'

// [POST] /login
export const postVolunteer = {
	path: '/signup',
	method: 'POST',
	config: {
		handler: hackerHandlers.postVolunteer,
	}
};

// [GET] /me
export const getMe = {
    path: '/me',
    method: 'GET',
    config: {
      handler: hackerHandlers.getMe,
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
      handler: hackerHandlers.postSubmit,
      validate: hackerValidators.postSubmit,
      auth: {
          strategy: 'token',
      }
    }
};

// [POST] /me
export const postMe = {
    path: '/me',
    method: 'POST',
    config: {
      handler: hackerHandlers.postMe,
      auth: {
          strategy: 'token',
      }
    }
};

const volunteerRoutes = [
	postVolunteer,
	getMe,
	postMe,
	postSubmit
]

export default volunteerRoutes;

