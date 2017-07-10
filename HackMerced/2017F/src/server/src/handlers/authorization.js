import Boom from 'boom';
import axios from 'axios';
const TOMOE_URI = process.env.TOMOE_URI;

export function createUserSession(user){
  return new Promise((resolve, reject) => {
    req.server.app.cache.set(user.id, { account: user }, 0, (err) => {
        if (err) {
          reject(Boom.badImplementation(err));
          return;
        }

        req.cookieAuth.set({ sid: user.id });
        resolve(user);
    });
  });
}

export function parseError(err){
  const statusCode = err.statusCode;
  const validation = (err.validation && err.validation.errors) ? err.validation.errors : null;
  if(statusCode === 400){
    const boomMessage = Boom.badRequest(err.message);

    if(validation){
        boomMessage.output.payload.validation = validation;
    }

    return boomMessage;
  } else if(statusCode === 403){
    return Boom.forbidden(err.message);
  } else if(statusCode === 404){
    return Boom.notFound(err.message);
  } else {
    return Boom.badImplementation(err.message);
  }
}

export const authorizationHandlers = {
  postLogin: (req, reply) => {
    axios
      .post(TOMOE_URI + '/hackers/' + req.payload.email + '/validate', req.payload)
      .then((user) => {
        createUserSession(user).then((user) => {
          reply(user);
        }).catch((err) => {
          reply(err);
        });
      }).catch((err) => {
        reply(err);
      });
  },
  postSignup: (req, reply) => {
    axios
      .post(TOMOE_URI + '/hackers', req.payload)
      .then((user) => {
        createUserSession(user).then((user) => {
          reply(user);
        }).catch((err) => {
          reply(err);
        });
      }).catch((err) => {
         reply(parseError(err.response.data));
      });
  },
  postLogout: (req, reply) => {
    req.cookieAuth.clear();
    reply();
  }
}
