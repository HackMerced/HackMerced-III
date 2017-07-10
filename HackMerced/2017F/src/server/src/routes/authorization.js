/*

*/


import Joi from 'joi';
import Boom from 'boom';
import { authorizationHandlers } from '../handlers'
import { authorizationValidators } from '../validators'


// [POST] /login
export const postLogin = {
    path: '/login/{email}',
    method: 'POST',
    config: {
      handler: authorizationHandlers.postLogin,
    }
};

// [POST] /login
export const postSignup = {
    path: '/signup',
    method: 'POST',
    config: {
      handler: authorizationHandlers.postSignup,
    }
};

// [POST] /logout
export const postLogout = {
    path: '/logout',
    method: 'POST',
    config: {
      handler: authorizationHandlers.postLogout,
    }
};



const authorizationRoutes = [
  postLogin,
  postSignup,
  postLogout
]

export default authorizationRoutes;
