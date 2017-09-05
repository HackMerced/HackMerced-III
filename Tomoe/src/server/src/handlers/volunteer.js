import { Volunteer } from '../collections'
import { operatorSearch, respond, transformData, setSearchParam } from '../util';
import Joi from 'joi';
import Boom from 'boom';

export const volunteerHandlers = {
  getVolunteers: ( request, reply ) => {
    let params = [];

    for(let searchTerm in request.query){
      const searchString = searchTerm.split('.');

      params.push({
        root: searchString[0],
        data: transformData(searchString[1], request.query[searchTerm]),
        option: (searchString.length > 2) ? searchString.splice(2,searchString.length).join('.') : null,
        operator: operatorSearch(searchString[1])
      });
    }

    Volunteer.query(params).then((users) => {
      return reply(respond(users))
    }).catch((err) => {
      return reply(err);
    })
  },
  getVolunteer: ( request, reply ) => {
    const { user } = request.params;
    const param = setSearchParam(user);

    Volunteer.find(param).then((user) => {
      return reply(respond(user))
    }).catch((err) => {
      return reply(err);
    })

  },
  postVolunteer: ( request, reply ) => {
    const { name, email, availability, details, status } = request.payload;

    const saveVolunteer = new Volunteer({
      availability: availability,
      name: name,
      email: email,
      details: details,
      status: status
    });

    saveVolunteer.save().then((user) => {
      return reply(respond(user, { created: true }, 201)).code(201);
    }).catch((err) => {
      return reply(err);
    })
  },
  updateVolunteer: ( request, reply ) => {
    const { user } = request.params;
    const { payload } = request;
    const param = setSearchParam(user);

    Volunteer.update(param, payload).then((user) => {
      return reply(respond(user))
    }).catch((err) => {
      return reply(err);
    })

  },
  deleteVolunteer: ( request, reply ) => {
    const param = setSearchParam(user);

    Volunteer.remove(param).then((user) => {
      return reply(respond({}, { deleted: true }, 204)).code(204);
    }).catch((err) => {
      return reply(err);
    })

  },
  updateVolunteerStatus: ( request, reply ) => {
    const { user } = request.params;
    const { status } = request.payload;
    const param = setSearchParam(user);

    Volunteer.update(param, { status: status }).then((user) => {
      return reply(respond(user))
    }).catch((err) => {
      return reply(err);
    })

  },
}
