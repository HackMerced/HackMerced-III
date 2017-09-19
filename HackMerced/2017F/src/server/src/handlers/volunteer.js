import Boom from 'boom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import parseError from '../handlers'
const TOMOE_URI = process.env.TOMOE_URI;

export const volunteerHandlers = {
  postVolunteer: (req, reply) => {
    axios
      .post(TOMOE_URI + '/volunteers/', req.payload)
      .then((response) => {
        reply(user);
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
          reply(user);
        }).catch((err) => {
           reply(parseError(err.response.data));
        });
  }
}
