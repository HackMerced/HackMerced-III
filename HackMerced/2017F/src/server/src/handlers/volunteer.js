import axios from 'axios';
import parseError from '../handlers'
const TOMOE_URI = process.env.TOMOE_URI;

export const volunteerHandlers = {
  postVolunteer: (req, reply) => {
      const email = req.payload.email ? req.payload.email.toLowerCase() : 'bad';
      const name = req.payload.name ? req.payload.name : '';
      axios
          .post(TOMOE_URI + '/volunteers', {
              name,
              email,
              status: 'applied',
              details: req.payload
          })
          .then((response) => {
            const user = response.data;
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
