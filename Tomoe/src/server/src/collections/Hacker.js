import { User } from './';

export class Hacker extends User{
  constructor(data = {}){
    super(data);

    this.details = data.details || {};
    this.status = data.status || TOMOE_CONFIG.hackerStatuses[0]; // will pick the first status provided
  }

  static getCollection(){
    return db.collection('hacker');
  }

  _get(){
    return {
      id: this.id,
      name: this.name,
      email:this.email,
      password:this.password,
      status: this.status,
      details: this.details
    }
  }

  static _get(user, protectSenstiveData = true){
    let data = {
      id: user.id,
      name: user.name,
      email:user.email,
      status: user.status,
      details: user.details
    }

    if(!protectSenstiveData){
      data.password = user.password;
      data._key = user._key;
      data._id = user._id;
    }

    return data;
  }

}
