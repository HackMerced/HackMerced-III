import { Admin } from '../collections'
import { operatorSearch, respond, transformData, setSearchParam } from '../util';
import Joi from 'joi';
import Boom from 'boom';

export const adminHandlers = {
  getAdmins: ( request, reply ) => {
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

    Admin.query(params).then((users) => {
      return reply(respond(users))
    }).catch((err) => {
      return reply(err);
    })
  },
  getAdmin: ( request, reply ) => {
    const { user } = request.params;
    const param = setSearchParam(user);

    Admin.find(param).then((user) => {
      return reply(respond(user))
    }).catch((err) => {
      return reply(err);
    })

  },
  postAdmin: ( request, reply ) => {
    const { name, email, password, confirmPassword, details } = request.payload;

    // if passwords do not match...
    if(password !== confirmPassword){
      return reply(Boom.badRequest('Your passwords do not match!'))
    }

    const saveAdmin = new Admin({
      tempPassword: password,
      name: name,
      email: email
    });

    saveAdmin.save().then((user) => {
      return reply(respond(user, { created: true }, 201)).code(201);
    }).catch((err) => {
      return reply(err);
    })
  },
  updateAdmin: ( request, reply ) => {
    const { user } = request.params;
    const { payload } = request;
    const param = setSearchParam(user);

    Admin.update(param, payload).then((user) => {
      return reply(respond(user))
    }).catch((err) => {
      return reply(err);
    })

  },
  deleteAdmin: ( request, reply ) => {
    const param = setSearchParam(user);

    Admin.remove(param).then((user) => {
      return reply(respond({}, { deleted: true }, 204)).code(204);
    }).catch((err) => {
      return reply(err);
    })

  },
  validateAdmin: ( request, reply ) => {
    const { user } = request.params;
    const { password } = request.payload;
    const param = setSearchParam(user);

    Admin.validate(param, password).then((user) => {
      return reply(respond(user))
    }).catch((err) => {
      return reply(err);
    })
  },
  updateAdminPermissions: ( request, reply ) => {
    const { user } = request.params;
    const { permissions } = request.payload;
    const param = setSearchParam(user);

    Admin.update(param, { permissions: permissions }).then((user) => {
      return reply(respond(user))
    }).catch((err) => {
      return reply(err);
    })

  },
}
