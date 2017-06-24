import { aql } from 'arangojs';
import { passwordValidator, saltAndHashPassword } from '../util';
import { HACKATHON } from '../config'
import 'uuid/v4'
import 'request';

class user{
  constructor(email){
    this.email = email;
    this.password = null;
  }
}
