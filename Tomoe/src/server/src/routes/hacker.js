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


// [GET] /hackers
export const getHackers = {
    path: '/hackers',
    method: 'GET',
    handler: ( request, reply ) => {
        return reply();
    }
};

// [GET] /hackers/{user-email}
// [GET] /hackers/{user-id}
export const getHacker = {
    path: '/hacker/{user}',
    method: 'GET',
    handler: ( request, reply ) => {
      const userData = encodeURIComponent(request.params.user);

      if(Joi.validate({ content: userData }, { content: Joi.string().email() })){
        // is email

        return reply();
      }


      return reply();
    }
};

const hacker = [
  getHackers,
  getHacker
]

export default hacker;
