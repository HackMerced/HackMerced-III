const utilities = require("../../api/tools/util.js");


module.exports = function(dotenv, assert, request, should, chai, options){
  const url = options.url;
  const user = {
    email: "test@testmail.com",
    password: "testpassword",
    survey: {
      age:18,
      foo:true,
      bar:["foo","bar"]
    },
    name:"test"
  }

  describe('Hacker Object', function() {
    describe('POST /hackers', function() {
      it("Returns error on unauthorized", function(done){
        request(url).post('/1.0/hackers')
          .end(function(err, res) {
              if (err) {
                throw err;
              }
              assert.equal(res.body.errors[0].text, "Your authentication is invalid, please provide a proper authorization key!");
              done();
            });
      });

      it("Returns error on bad authorization", function(done){
        request(url).post('/1.0/hackers')
          .set('Authorization', 'Bearer badauth')
          .end(function(err, res) {
              if (err) {
                throw err;
              }
              assert.equal(res.body.errors[0].text, "Your authentication is invalid, please provide a proper authorization key!");
              done();
            });
      });

      it("Returns error on missing email", function(done){
        request(url).post('/1.0/hackers')
          .set('Authorization', 'Bearer INERT')
          .end(function(err, res) {
              if (err) {
                throw err;
              }
              assert.equal(res.body.errors[0].text, "Please enter a valid email!");
              done();
            });
      });

      it("Returns error on missing password", function(done){
        request(url).post('/1.0/hackers')
          .set('Authorization', 'Bearer INERT')
          .send({
              email:user.email
            })
          .end(function(err, res) {
              if (err) {
                throw err;
              }
              assert.equal(res.body.errors[0].text, "Please enter a valid password! (Must at least be 6 characters long!)");
              done();
            });
      });

      it("Returns error on short password", function(done){
        request(url).post('/1.0/hackers')
          .set('Authorization', 'Bearer INERT')
          .send({
                 email:user.email,
                 password:"short"
               })
          .end(function(err, res) {
              if (err) {
                throw err;
              }
              assert.equal(res.body.errors[0].text, "Please enter a valid password! (Must at least be 6 characters long!)");
              done();
            });
      });

      it("Returns error on invalid survey", function(done){
        request(url).post('/1.0/hackers')
          .set('Authorization', 'Bearer INERT')
          .send({
                 email:user.email,
                 password:user.password,
                 survey:"fail"
               })
          .end(function(err, res) {
              if (err) {
                throw err;
              }
              assert.equal(res.body.errors[0].text, "Survey must be a object literal when sent!");
              done();
            });
      });

      it("Creates user successfully", function(done){
        request(url).post('/1.0/hackers')
          .send(user)
          .set('Authorization', 'Bearer INERT')
          .end(function(err, res) {
              if (err) {
                throw err;
              }
              assert.equal(res.status, 201);
              done();
            });
      });
    });

    describe('GET /hackers/{user-id}\n        /hackers/{user-email}', function() {

      it("Returns error on unauthorized", function(done){
        request(url).get('/1.0/hackers/not-valid-id')
          .end(function(err, res) {
              if (err) {
                throw err;
              }
              assert.equal(res.body.errors[0].text, "Your authentication is invalid, please provide a proper authorization key!");
              done();
            });
      });

      it("Returns error on bad authorization", function(done){
        request(url).get('/1.0/hackers/not-valid-id')
          .set('Authorization', 'Bearer badauth')
          .end(function(err, res) {
              if (err) {
                throw err;
              }
              assert.equal(res.body.errors[0].text, "Your authentication is invalid, please provide a proper authorization key!");
              done();
            });
      });

      it("Returns error on invalid id", function(done){
        request(url)
          .get('/1.0/hackers/not-valid-id')
          .set('Authorization', 'Bearer INERT')
          .end(function(err, res) {
              if (err) {
                throw err;
              }
              assert.isDefined(res.body.errors[0].text);
              done();
            });
      });

      it("Returns error on invalid email", function(done){
        request(url)
          .get('/1.0/hackers/notvalid@email.com')
          .set('Authorization', 'Bearer INERT')
          .end(function(err, res) {
              if (err) {
                throw err;
              }
              assert.equal(res.body.errors[0].text, "We could not find the user you are looking for!");
              done();
            });
      });

      it("Returns a user on valid email", function(done){
        request(url)
          .get('/1.0/hackers/' + user.email)
          .set('Authorization', 'Bearer INERT')
          .end(function(err, res) {
              if (err) {
                throw err;
              }
              assert.equal(res.body.hacker.email, user.email);
              done();
            });
      });
    });

    describe('POST /hackers/{user-id}\n         /hackers/{user-email}', function() {
      it("Returns error on unauthorized", function(done){
        request(url).post('/1.0/hackers/not-valid-id')
          .end(function(err, res) {
              if (err) {
                throw err;
              }
              assert.equal(res.body.errors[0].text, "Your authentication is invalid, please provide a proper authorization key!");
              done();
            });
      });

      it("Returns error on bad authorization", function(done){
        request(url).post('/1.0/hackers/not-valid-id')
          .set('Authorization', 'Bearer badauth')
          .end(function(err, res) {
              if (err) {
                throw err;
              }
              assert.equal(res.body.errors[0].text, "Your authentication is invalid, please provide a proper authorization key!");
              done();
            });
      });

      it("Returns error on invalid id", function(done){
        request(url)
          .post('/1.0/hackers/not-valid-id')
          .set('Authorization', 'Bearer INERT')
          .end(function(err, res) {
              if (err) {
                throw err;
              }
              assert.isDefined(res.body.errors[0].text);
              done();
            });
      });

      it("Returns error on invalid email", function(done){
        request(url)
          .post('/1.0/hackers/notvalid@email.com')
          .set('Authorization', 'Bearer INERT')
          .end(function(err, res) {
              if (err) {
                throw err;
              }
              assert.equal(res.body.errors[0].text, "We could not find the user you are looking for!");
              done();
            });
      });

      it("Updates a user on valid email", function(done){
        request(url)
          .post('/1.0/hackers/' + user.email)
          .set('Authorization', 'Bearer INERT')
          .send({
                 survey:{
                   age:19
                 }
          })
          .end(function(err, res) {
              if (err) {
                throw err;
              }

              assert.equal(res.body.hacker.survey.age, 19);
              done();
            });
      });
    });

    describe('DELETE /hackers/{user-id}\n            /hackers/{user-email}', function() {
      it("Returns error on unauthorized", function(done){
        request(url)
          .delete('/1.0/hackers/not-valid-id')
          .end(function(err, res) {
              if (err) {
                throw err;
              }

              assert.equal(res.body.errors[0].text, "Your authentication is invalid, please provide a proper authorization key!");
              done();
            });
      });

      it("Returns error on bad authorization", function(done){
        request(url)
          .delete('/1.0/hackers/not-valid-id')
          .set('Authorization', 'Bearer badauth')
          .end(function(err, res) {
              if (err) {
                throw err;
              }
              assert.equal(res.body.errors[0].text, "Your authentication is invalid, please provide a proper authorization key!");
              done();
            });
      });

      it("Returns error on invalid id", function(done){
        request(url)
          .delete('/1.0/hackers/not-valid-id')
          .set('Authorization', 'Bearer INERT')
          .end(function(err, res) {
              if (err) {
                throw err;
              }
              assert.isDefined(res.body.errors[0].text);
              done();
            });
      });

      it("Returns error on invalid email", function(done){
        request(url)
          .delete('/1.0/hackers/notvalid@email.com')
          .set('Authorization', 'Bearer INERT')
          .end(function(err, res) {
              if (err) {
                throw err;
              }
              assert.equal(res.body.errors[0].text, "We could not find the user you are looking for!");
              done();
            });
      });

      it("Deletes a user on valid email", function(done){
        request(url)
          .delete('/1.0/hackers/' + user.email)
          .set('Authorization', 'Bearer INERT')
          .end(function(err, res) {
              if (err) {
                throw err;
              }

              assert.equal(res.body.status, "User has been deleted!");
              done();
            });
      });
    });
  });
};
