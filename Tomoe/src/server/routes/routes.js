const path          = require("path"),
      utilities     = require("../tools/util.js"),
      status        = require("../tools/apiManager.js").status,
      validator     = require("../tools/apiManager.js").validate,
      user_types    = require("../tools/users.js");

const hacker        = user_types.hacker,
      user          = user_types.user,
      admin         = user_types.admin;

const api_version   = "/1.0/";



module.exports = function(app, db, collections){
  const validate = new validator(process.env.AUTHORIZATION);

  // all
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/../../views/index.html'));
  });

  app.get(api_version + 'hackers', (req, res) => {
    res.send(404);
  });

  app.get(api_version + 'hackers/:user_input', (req, res) => {
    validate.api(req, res, function(){
      const user_input = req.params.user_input;
      const verifyLogin = (req.query.verifyLogin === "true" || req.query.verifyLogin === true) ? true : false;
      const password = req.headers.password;

      hacker.find(db, collections.Hackers, user_input, function(found_user){
        if(found_user){
          if(verifyLogin){
            if(password){
              if(password && utilities.validate.password(password, found_user.password)){
                status.ok(res, {hacker:found_user});
              } else {
                status.notAuthorized(res, {text:"The password or email you provided is incorrect!", issue:["email", "id", "password"]});
              }
            } else {
              status.notAuthorized(res, {text:"You have not provided a password!", issue:["password"]});
            }
          } else {
            status.ok(res, {hacker:found_user});
          }

        } else {
          status.notFound(res, {text: "We could not find the user you are looking for!", issue:["email", "id"]});
        }
      }, function(err){
        status.serverError(res, err);
      });
    });
  });

  app.post(api_version + 'hackers', (req, res) => {
    validate.api(req, res, function(){
      let hacker_package = {
        email: req.body.email,
        name: (req.body.name) ? req.body.name : false,
        new_password: req.body.password,
        status: (req.body.status) ? req.body.status : "applied",
        survey: (req.body.survey) ? req.body.survey : {},
      };

      if(hacker_package.email && utilities.validate.email(hacker_package.email)){
        if(hacker_package.new_password && utilities.validate.password(hacker_package.new_password)){
          if(req.body.survey && utilities.validate.isObjectLiteral(hacker_package.survey)){
            let new_hacker = new hacker(hacker_package);
            new_hacker.save(db, collections.Hackers, function(new_user){
              if(new_user){
                hacker.find(db, collections.Hackers, hacker_package.email, function(found_user){
                  status.created(res, {hacker:found_user} );
                }, function(err){
                  status.serverError(res, err);
                });
              } else {
                status.conflict(res, {text:"Sorry, we cannot create a new user since your email is in use.", issue:["email"]});
              }
            }, function(err){
              status.serverError(res, err);
            });
          } else {
            status.incomplete(res, {text:"Survey must be a object literal when sent!", issue:["survey"]});
          }
        } else {
          status.incomplete(res, {text:"Please enter a valid password! (Must at least be 6 characters long!)", issue:["password"]});
        }
      } else {
        status.incomplete(res, {text:"Please enter a valid email!", issue:["email"]});
      }
    });
  });

  app.post(api_version + 'hackers/:user_input', (req, res) => {
    validate.api(req, res, function(){
      const user_input = req.params.user_input;

      hacker.find(db, collections.Hackers, user_input, function(found_user){
        if(found_user){
          let edit_user = new hacker(found_user);
              edit_user.name = (req.body.name) ? req.body.name : edit_user.name;
              edit_user.status = (req.body.status) ? req.body.status : edit_user.status;
              edit_user.email = (req.body.email) ? req.body.email : edit_user.email;

          if(req.body.survey){
            let survey = req.body.survey;

            for(let i in survey){
              edit_user.survey[i] = survey[i];
            }
          }

          if(req.body.password){
            edit_user.setPassword(req.body.password);
          } else {
            edit_user.password = undefined;
          }

          edit_user.update(db, collections.Hackers, function(updated_user){
            if(updated_user){
              status.ok(res, {hacker:updated_user});
            } else {
              status.notFound(res, {text:"We could not update your account!", issue:["email", "id"]});
            }
          }, function(err){
            status.serverError(res, err);
          });

        } else {
          status.notFound(res, {text:"We could not find the user you are looking for!", issue:["email", "id"]});
        }
      }, function(err){
        status.serverError(res, err);
      });
    });
  });

  app.delete(api_version + 'hackers/:user_input', (req, res) => {
    validate.api(req, res, function(){
      const user_input = req.params.user_input;

      user.destroy(db, collections.Hackers, user_input, function(stillThere) {
        if(stillThere){
          status.notFound(res, {text:"We could not find the user you are looking for!", issue:["email", "id"]});
        } else {
          status.ok(res, {status:"User has been deleted!"});
        }
      }, function(err){
        status.serverError(res, err);
      })
    });
  });

};
