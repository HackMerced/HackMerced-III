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
}
