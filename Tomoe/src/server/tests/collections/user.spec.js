import assert from 'assert';
import { User } from '../../src/collections/user';

const sampleUser = {
  name: 'Shubham Naik',
  email: 'shub@hackmerced.com',
  temp_password: 'testing2'
}

describe('User', function() {
  let testUser;

  describe('#constructor', function() {
    it('accesss the User class', function() {
      testUser = new User({ name: sampleUser.name} );
      assert.equal(testUser.name, sampleUser.name);
    });
  });

  describe('#setEmail', function() {
    it('sets a user email', function() {
      testUser.setEmail(sampleUser.email);
      assert.equal(testUser.email, sampleUser.email);
    });
  });

  describe('#setPassword', function() {
    it('sets a temporary password', function() {
      testUser.setPassword(sampleUser.temp_password);
      assert.equal(testUser.temp_password, sampleUser.temp_password);
    });
  });

  describe('#confirmPassword', function() {
    it('can confirm a password ', function() {
      const confirmStatus = testUser.confirmPassword(sampleUser.temp_password);
      assert.equal(confirmStatus, true);
    });
  });

  describe('#save', function() {

    it('can save a user to a database ', function(done) {
      testUser.save().then((user) => {
        assert.equal(testUser.name, sampleUser.name);
        done();
      }).catch((err) => {
        done(err);
      });
    });

    it('can prevent overwriting an existing user ', function(done) {
      testUser.save().then((user) => {
        done('A user was created somehow!');
      }).catch((err) => {
        assert.equal('This user exists!', err);
        done();
      });
    });
  });

  describe('#find', function() {
    let catchUser;

    it('can find an existing user with email', function(done) {
      User.find({email: sampleUser.email}).then((user) => {
        catchUser = user;
        assert.equal(catchUser.name, sampleUser.name);
        done();
      }).catch((err) => {
        done(err);
      });
    });

    it('can find an existing user with id ', function(done) {
      User.find({id: catchUser.id}).then((user) => {
        assert.equal(testUser.name, catchUser.name);
        done();
      }).catch((err) => {
        done(err);
      });
    });

    it('can report an error if no user email or id is provided', function(done) {
      User.find().then((user) => {
        done('This should not happen');
      }).catch((err) => {
        assert.equal('You did not provide an id or email', err);
        done();
      });
    });

    it('can tell you it cannot find a user', function(done) {
      User.find({email: 'blah'}).then((user) => {
        assert.equal(user, false);
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });

  describe('#validate', function() {
    it('can notify if your passwords do not match', function(done) {
      testUser.setPassword('blah');
      testUser.validate().then(() => {
        done('This should not happen');
      }).catch((err) => {
        assert.equal('Passwords do not match', err);
        done();
      });
    });

    it('can validate your user account (login operation)', function(done) {
      testUser.setPassword(sampleUser.temp_password);
      testUser.validate().then((user) => {
        assert.equal(user.name, sampleUser.name);
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });


});
