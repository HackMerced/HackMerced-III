import { User } from './';

export class Admin extends User{
  constructor(data = {}){
    super(data);
    this.permissions = data.permissions;

  }

  static getCollection(){
    return db.collection('admin');
  }

  _get(){
    return {
      id: this.id,
      name: this.name,
      email:this.email,
      password:this.password,
      permissions: this.permissions
    }
  }


    static _get(user, protectSenstiveData = true){
      let data = {
        id: user.id,
        name: user.name,
        email:user.email,
        permissions: user.permissions
      }

      if(!protectSenstiveData){
        data.password = user.password;
        data._key = user._key;
        data._id = user._id;
      }

      return data;
    }

}
