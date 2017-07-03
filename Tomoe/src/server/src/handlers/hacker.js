import { Hacker } from '../collections'
import { operatorSearch, respond, transformData } from '../util';
import Joi from 'joi';

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
    let param = {};

    if(Joi.validate(user, Joi.string().email())){
      param.email = user;
    } else {
      param.id = user;
    }

    Hacker.find(param).then((user) => {
      return reply(respond(user))
    }).catch((err) => {
      return reply(err);
    })

  },
}
