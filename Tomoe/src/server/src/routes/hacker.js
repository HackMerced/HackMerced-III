/*
  The Hacker Object

  The Hacker Object is the core to Tomoe's hackathon management system. Hackers are the people who apply to your hackathon.

  {
   "_id":"user-id",
   "name":"user-name",
   "email":"hackathon@email.com",
   "password":"userpasswordhash", // not returned normally
   "status":"applied", // applied, denied, approved, waitlisted
   "survey":{
      ... // array of attributes that can be customized and sent to the user
   }
  }

*/


import Joi from 'joi';
import Boom from 'boom';
import { hackerHandlers } from '../handlers'
import { hackerValidators } from '../validators'


// [GET] /hackers
export const getHackers = {
    path: '/hackers',
    method: 'GET',
    config: {
      handler: hackerHandlers.getHackers,
    }
};

// [GET] /hackers/{user-email}
// [GET] /hackers/{user-id}
export const getHacker = {
    path: '/hackers/{user}',
    method: 'GET',
    config: {
      handler: hackerHandlers.getHacker,
    }
};

// [POST] /hackers
export const postHacker = {
    path: '/hackers',
    method: 'POST',
    config: {
      handler: hackerHandlers.postHacker,
      validate: hackerValidators.postHacker
    }
};

// [POST] /hackers/{user-email}
// [POST] /hackers/{user-id}
export const updateHacker = {
    path: '/hackers/{user}',
    method: 'POST',
    config: {
      handler: hackerHandlers.updateHacker,
    }
};

// [DELETE] /hackers/{user-email}
// [DELETE] /hackers/{user-id}
export const deleteHacker = {
    path: '/hackers/{user}',
    method: 'DELETE',
    config: {
      handler: hackerHandlers.deleteHacker,
    }
};

// [POST] /hackers/{user-email}/validate
// [POST] /hackers/{user-id}/validate
export const validateHacker = {
    path: '/hackers/{user}/validate',
    method: 'POST',
    config: {
      handler: hackerHandlers.validateHacker,
      validate: hackerValidators.validateHacker
    }
};

// [POST] /hackers/{user-email}/status
// [POST] /hackers/{user-id}/status
export const updateHackerStatus = {
    path: '/hackers/{user}/status',
    method: 'POST',
    config: {
      handler: hackerHandlers.updateHackerStatus,
      validate: hackerValidators.updateHackerStatus
    }
};


const hackerRoutes = [
  getHackers,
  getHacker,
  postHacker,
  updateHacker,
  deleteHacker,
  validateHacker,
  updateHackerStatus
]

export default hackerRoutes;
