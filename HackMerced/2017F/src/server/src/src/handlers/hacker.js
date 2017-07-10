import { Hacker } from '../collections'
import { operatorSearch, respond, transformData, setSearchParam } from '../util';
import Joi from 'joi';
import Boom from 'boom';

export const hackerHandlers = {
  getHackers: ( request, reply ) => {
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

    Hacker.query(params).then((users) => {
      return reply(respond(users))
    }).catch((err) => {
      return reply(err);
    })
  },
  getHacker: ( request, reply ) => {
    const { user } = request.params;
    const param = setSearchParam(user);

    Hacker.find(param).then((user) => {
      return reply(respond(user))
    }).catch((err) => {
      return reply(err);
    })

  },
  postHacker: ( request, reply ) => {
    const { name, email, password, confirmPassword, details, status } = request.payload;

    // if passwords do not match...
    if(password !== confirmPassword){
      return reply(Boom.badRequest('Your passwords do not match!'))
    }

    const saveHacker = new Hacker({
      tempPassword: password,
      name: name,
      email: email,
      details: details,
      status: status
    });

    saveHacker.save().then((user) => {
      return reply(respond(user, { created: true }, 201)).code(201);
    }).catch((err) => {
      return reply(err);
    })
  },
  updateHacker: ( request, reply ) => {
    const { user } = request.params;
    const { payload } = request;
    const param = setSearchParam(user);

    Hacker.update(param, payload).then((user) => {
      return reply(respond(user))
    }).catch((err) => {
      return reply(err);
    })

  },
  deleteHacker: ( request, reply ) => {
    const param = setSearchParam(user);

    Hacker.remove(param).then((user) => {
      return reply(respond({}, { deleted: true }, 204)).code(204);
    }).catch((err) => {
      return reply(err);
    })

  },
  validateHacker: ( request, reply ) => {
    const { user } = request.params;
    const { password } = request.payload;
    const param = setSearchParam(user);

    Hacker.validate(param, password).then((user) => {
      return reply(respond(user))
    }).catch((err) => {
      return reply(err);
    })
  },
  updateHackerStatus: ( request, reply ) => {
    const { user } = request.params;
    const { status } = request.payload;
    const param = setSearchParam(user);

    Hacker.update(param, { status: status }).then((user) => {
      return reply(respond(user))
    }).catch((err) => {
      return reply(err);
    })

  },
}
