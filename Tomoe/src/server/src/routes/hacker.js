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
    path: '/hacker/{user}',
    method: 'GET',
    config: {
      handler: hackerHandlers.getHacker,
    }
};

const hackerRoutes = [
  getHackers,
  getHacker,
]

export default hackerRoutes;
