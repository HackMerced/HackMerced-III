import { aql } from 'arangojs';
import uuidv4 from 'uuid/v4'
import sha256 from 'sha256';

export class User{
  constructor(data = {}){
    // user information
    this.id = data.id || uuidv4();
    this.name = data.name || null;
    this.email = data.email || null;
    this.password = null;
    this.temp_password = null;
  }

  static getCollection(){
    return db.collection('user-test');
  }

  _get(){
    return {
      id: this.id,
      name: this.name,
      email:this.email,
      password:this.password
    }
  }

  _validatePasswords(plainPass, hashedPass){

    const salt = hashedPass.substr(0, 10);
    const validHash = salt + sha256(plainPass + salt);

    return hashedPass === validHash;
  }

  _saltAndHashPassword(password){
    function generateSalt(){
        let set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
        let salt = '';
        for (let i = 0; i < 10; i++) {
            let p = Math.floor(Math.random() * set.length);
            salt += set[p];
        }
        return salt;
    }

    let salt = generateSalt();

    let newPassword = (salt + sha256(password + salt));

    return newPassword;
  }

  _securePassword(){
   this.password = this._saltAndHashPassword(this.temp_password);;
   this.temp_password = null; // sets any temp password to none
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



  static find(userData){
    return new Promise((resolve, reject) => {
      const collection = this.getCollection();

      if(!userData || (userData && !userData.email && !userData.id)){
        reject('You did not provide an id or email');
        return;
      }

      let query;

      if(userData.id){
         query = aql`FOR u IN ${collection}
                        FILTER u.id == ${userData.id}
                        RETURN u`;
      } else {
        query = aql`FOR u IN ${collection}
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
              resolve(false);
            }
          });
      });
    });
  }

  validate(){
    return new Promise((resolve, reject) => {
      this.constructor.find({ email: this.email }).then((user) => {

        if(this._validatePasswords(this.temp_password, user.password)){

          for(let i in this){
            if((this[i] && typeof this[i] !== '[object Function]') && user[i]){
              this[i] = user[i];
            }
          }

          resolve(user);
          return;
        }

        reject('Passwords do not match');
      }).catch((err) => {
        reject(err);
      });
    });
  }

  save(){
    return new Promise((resolve, reject) => {
      this.constructor.find({ email: this.email }).then((user) => {
        if(user){
           reject('This user exists!');
           return;
        }

        this._securePassword();
        let userDetails = this._get();
        this.constructor.getCollection().save(userDetails, (err, meta) =>{
          if(err){
            reject(err);
            return;
          }

          this.constructor.find({ email: this.email }).then((user) => {
            if(user){
               resolve(user);
               return;
            }

            reject('There was an issue creating your user!');
            return;

          }).catch((err) => {

            reject(err);
            return;
          });
        });
      }).catch((err) => {
        reject(err);
      });
    });

  }
}

export class Admin extends User{
  constructor(data = {}){
    super(data, 'admin');
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
