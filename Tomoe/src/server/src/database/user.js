import { aql } from 'arangojs';
import { passwordValidator, saltAndHashPassword } from '../util';
import uuidv4 from 'uuid/v4'

class User{
  constructor(data = {}, collection = 'test'){
    // user information
    this.id = data.id || uuidv4();
    this.name = data.name || null;
    this.email = data.email || null;
    this.password = null;
    this.temp_password = null;

    // database information
    this.collection = db.collection(collection);
  }

  _get(){
    return {
      name: this.name,
      email:this.email,
      password:this.password
    }
  }

  setEmail(email){
    this.email = email;
  }

  setName(name){
    this.name = name;
  }

  setPassword(temp_password){
    this.temp_password = temp_password;
  }

  confirmPassword(confirmedPassword){
    return confirmedPassword === this.temp_password;
  }

  securePassword(password){
   let securedPassword = saltAndHashPassword(password);
   this.password = securedPassword;
   this.temp_password = null; // sets any temp password to none
 }

  static find(userData){
    return new Promise((resolve, reject) => {
      if(!userData.email && !userData.id){
        reject('You did not provide an id or email');
        return;
      }

      let query;

      if(userData.id){
         query = aql`FOR u IN ${this.collection}
                        FILTER u._id == ${userData.id}
                        RETURN u`;
      } else {
        query = aql`FOR u IN ${this.collection}
                          FILTER u.email == ${userData.email}
                          RETURN u`;
      }


      db.query(query, (err, cursor) => {
         if(err){
           reject(err);
           return;
         }

         cursor.all(function(err, users){
            if(err){
              reject(err);
              return;
            }

            if(users && users[0] && users[0].email){
              resolve(users[0]); // we found a user!
            } else {
              resolve(false); // no user returned
            }
          });
      });
    });
  }

  static validate(userData, password){
    return new Promise((resolve, reject) => {
      User.find(userData).then((user) => {
        if(passwordValidator(user.password, password)){
          resolve(user);
          return;
        }

        reject('Passwords do not match');
      }, (err) => {
          reject(err);
      })
    });
  }

  save(){
    return new Promise((resolve, reject) => {
      User.find({ email: this.email }, (user) => {
        if(user){
            reject('This user exists!');
            return;
        }

        this.securePassword();
        let userDetails = this.get();
        this.collection.save(userDetails, function(err, meta){
          if(err){
            reject(err);
            return;
          }

          resolve(meta);
        });
      });
    });

  }
}

export class Admin extends User{
  constructor(data = {}){
    super(data, 'admin');
    this.permissions = data.permissions;

  }

  _get(){
    return {
      name: this.name,
      email:this.email,
      password:this.password,
      permissions: this.permissions
    }
  }
}
