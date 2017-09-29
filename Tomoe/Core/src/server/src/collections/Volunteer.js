import { User } from './';

export class Volunteer extends User{
  constructor(data = {}){
    super(data);

    this.details = data.details || {};
    this.status = data.status || TOMOE_CONFIG.volunteerStatuses[0]; // will pick the first status provided
  }

  static getCollection(){
    return db.collection('volunteer');
  }

  _get(){
    return {
      id: this.id,
      name: this.name,
      email:this.email,
      age:this.age,
      status: this.status,
      availability: this.availability,
      details: this.details
    }
  }

  static _get(user, protectSenstiveData = true){
    let data = {
      id: user.id,
      name: user.name,
      email:user.email,
      status: user.status,
      availability: user.availability,
      details: user.details
    }

    if(!protectSenstiveData){
      data._key = user._key;
      data._id = user._id;
    }

    return data;
  }

}
