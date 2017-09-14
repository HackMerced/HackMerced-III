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
  } else if(statusCode === 401){
    const boomMessage = Boom.unauthorized(err.message);

    if(validation){
        boomMessage.output.payload.validation = validation;
    }

    return boomMessage;
  } else {
    return Boom.badImplementation(err.message);
  }
}

export const volunteerHandlers = {
  postVolunteer: (req, reply) => {
    axios
      .post(TOMOE_URI + '/volunteers/', req.payload)
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

  getMe: (req, reply) => {
    axios
      .get(TOMOE_URI + '/volunteers/' + req.auth.credentials.id)
      .then((response) => {
        const user = response.data;
        reply(user);
      }).catch((err) => {
        reply(err);
      });
  },

  postSubmit: (req, reply) => {
      axios
        .post(TOMOE_URI + '/volunteers/' + req.auth.credentials.id, {
          status: 'submitted',
          details: req.payload
        })
        .then((response) => {
          createUserSession(req, response).then((user) => {
            reply(user);
          }).catch((err) => {
            reply(err);
          });
        }).catch((err) => {
           reply(parseError(err.response.data));
        });
  }
}

