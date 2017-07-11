import Boom from 'boom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
const TOMOE_URI = process.env.TOMOE_URI;

export function createUserSession(req, response){
  return new Promise((resolve, reject) => {
    const user = response.data;
          user.meta.token = jwt.sign({ accountId: user.results.id }, process.env.COOKIE_SECRET, { algorithm: 'HS256'} );

    resolve(user);
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
    const boomMessage = Boom.notFound(err.message);

    if(validation){
        boomMessage.output.payload.validation = validation;
    }

    return boomMessage;
  } else {
    return Boom.badImplementation(err.message);
  }
}

export const hackerHandlers = {
  getMe: (req, reply) => {
    console.log(req)
    axios
      .get(TOMOE_URI + '/hackers/' + req.payload.token)
      .then((response) => {
        const user = response.data;
        reply(user);
        // TODO update user session
      }).catch((err) => {
        reply(err);
      });
  },
  postLogin: (req, reply) => {
    axios
      .post(TOMOE_URI + '/hackers/' + (req.payload.email || 'bad') + '/validate', { password: req.payload.password })
      .then((response) => {
        createUserSession(req, response).then((user) => {
          reply(user);
        }).catch((err) => {
          reply(err);
        });
      }).catch((err) => {
        reply(parseError(err.response.data));
      });
  },
  postSignup: (req, reply) => {
    axios
      .post(TOMOE_URI + '/hackers', req.payload)
      .then((response) => {
        createUserSession(req, response).then((user) => {
          reply(user);
        }).catch((err) => {
          reply(err);
        });
      }).catch((err) => {
         reply(parseError(err.response.data));
      });
  },
  postLogout: (req, reply) => {

    reply();
  }
}
