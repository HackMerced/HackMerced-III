import Joi from 'joi'

export function setSearchParam(user){

  let param = {}
  if(Joi.validate(user, Joi.string().email().required()).error){
    param.id = user;
  } else {
    param.email = user;
  }

  return param;
}
