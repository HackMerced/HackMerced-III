const aql = require('arangojs').aql;
const utilities = require('../tools/util.js');
const request = require('request');

class user{
  constructor(email){
    this.email = email;
    this.password = null;
  }

  assign(){
    return utilities.createKey([4,6,3]);
  }

  get(){
    return {
      _id:this._id,
      email:this.email,
      password:this.password
    }
  }

  setPassword(password){
    let new_pass = utilities.generate.saltAndHash(password);
    this.password = new_pass;

    this.temp_password = null; // sets any temp password to none
  }



  static find(db, collection, user_or_resolve, resolve_or_reject, try_reject){
    let resolve;
    let reject;
    let input;

    // check if user_or_resolve is sent
    if(utilities.validate.isFunction(user_or_resolve)){
      resolve = user_or_resolve;
      reject = resolve_or_reject;
      input = this._id;
    } else {
      resolve = resolve_or_reject;
      reject = try_reject;
      input = user_or_resolve;
    }

    if(input){
      let query = aql`FOR u IN ${collection}
                        FILTER u._id == ${input}
                        RETURN u`;

      if(utilities.validate.email(input)){
        query = aql`FOR u IN ${collection}
                      FILTER u.email == ${input}
                      RETURN u`;
      }


      db.query(query, function (err, cursor) {

        if(err){
          reject(err);
        } else {
          cursor.all(function(err, users){
            if(err){
              reject(err);
            } else {
              if(users && users[0] && users[0].email){
                resolve(users[0]);
              } else {
                resolve(false);
              }
            }
          });
        }
      })
    } else {
      resolve(false);
    }

  }

  static destroy(db, collection, user_or_resolve, resolve_or_reject, try_reject){
    let resolve;
    let reject;
    let input;

    // check if user_or_resolve is sent
    if(utilities.validate.isFunction(user_or_resolve)){
      resolve = user_or_resolve;
      reject = resolve_or_reject;
      input = this._id;
    } else {
      resolve = resolve_or_reject;
      reject = try_reject;
      input = user_or_resolve;
    }

    this.find(db, collection, input, function(user){
      if(user){
        collection.removeByKeys([user._key], function(err){
          if(err){
            reject(err);
          } else {
            resolve(false);
          }
        });
      } else {
        resolve(true);
      }
    }, function(err){
      reject(err);
    });
  }

  update(db, collection, resolve, reject){

    let user_id = this._id;
    let update_data = this.get();

    collection.update(user_id, update_data, function(err){
      if(err){
        reject(err);
      } else {
        user.find(db, collection, user_id, function(user){
          resolve(user);
        }, function(err){
          reject(err);
        })
      }
    });

  }

  save(db, collection, resolve, reject){
    // check if email already exists
    let that = this;

    this.email = this.get().email;

    user.find(db, collection, this.email, function(user){
      if(user){
          resolve(false); // the user exists
      } else {
        let new_user = that.get();

        collection.save(new_user, function(err, meta){
          if(err){
            reject(err);
          } else {
            resolve(meta);
          }
        });
      }
    }, function(err){
      reject(err);
    });
  }



}

class admin extends user{
  constructor(user_package){
    super(user_package.email);
    this.rank = user_package.rank; // "all" for now
  }
}


class hacker extends user{
  constructor(user_package){
    if(user_package && user_package.email){
      super(user_package.email);
      this._id = user_package._id

      this.name = (user_package.name) ? user_package.name : "";
      this.survey = (user_package.survey) ? user_package.survey : {};
      this.status = (user_package.status) ? user_package.status : "applied";
      this.hackathon = process.env.HACKATHON;

      if(user_package.password){
        this.password = user_package.password;
      }

      if(user_package.new_password){
        this.setPassword(user_package.new_password); // set password
      }


    } else {
      return undefined;
    }
  }

  get(){
    return {
      name: this.name,
      email: this.email,
      survey: this.survey,
      status: this.status,
      password: this.password,
      hackathon: this.hackathon,
    };
  }
}

class staff extends user{
  constructor(user_package){
    super(user_package.email)
    this.name = user_package.name;
    this.survey = user_package.survey;
  }
}


exports.user = user;
exports.admin = admin;
exports.staff = staff;
exports.hacker = hacker;
