import axios from 'axios';
import { parseError } from '../handlers'
const TOMOE_URI = process.env.TOMOE_URI;

export const volunteerHandlers = {
  postVolunteer: (req, reply) => {
      const email = req.payload.email ? req.payload.email.toLowerCase() : 'bad';
      const name = req.payload.name ? req.payload.name : '';
      axios.post(TOMOE_URI + '/volunteers', {
              name,
              email,
              status: 'applied',
              details: req.payload
          })
          .then(({ data }) => {
            reply(data);
          }).catch((err) => {
            reply(parseError(err.response.data));
          });
  }
}
