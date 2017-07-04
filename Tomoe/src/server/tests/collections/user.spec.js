import { assert } from 'chai';
import { User } from '../../src/collections';
import { sampleUser, sampleUser2 } from '../constants'
import { clearDocuments } from '../util'

describe('User', () =>  {
  let sampleUserData;
  let sampleUserData2;
  let testUser;
  let testUser2;
  let userId;

  beforeEach((done) => {
    // create a user
    sampleUserData = new sampleUser();
    sampleUserData2 = new sampleUser2();
    testUser = new User(sampleUserData);
    testUser2 = new User(sampleUserData2);

    testUser.save().then((user) => {
      userId = user.id;
      done();
    }).catch((err) => {
      done(err);
    });
  });

  describe('#constructor', () =>  {
    const sampleUserData = new sampleUser();

    it('access the User class', () =>  {
      const testUser = new User({ name: sampleUserData.name});
      assert.equal(testUser.name, sampleUserData.name);
    });
  });

  describe('#setEmail', () =>  {
    const sampleUserData = new sampleUser();
    const testUser = new User({ name: sampleUserData.name} );

    it('sets a user email', () =>  {
      testUser.setEmail(sampleUserData.email);

      assert.equal(testUser.email, sampleUserData.email);
    });
  });

  describe('#setPassword', () =>  {
    const sampleUserData = new sampleUser();
    const testUser = new User({ name: sampleUserData.name} );

    it('sets a temporary password', () =>  {
      testUser.setEmail(sampleUserData.email);
      testUser.setPassword(sampleUserData.tempPassword);

      assert.equal(testUser.tempPassword, sampleUserData.tempPassword);
    });
  });

  describe('#confirmPassword', () =>  {
    const sampleUserData = new sampleUser();
    const testUser = new User(sampleUserData);

    it('can confirm a password ', () =>  {
      const confirmStatus = testUser.confirmPassword(sampleUserData.tempPassword);

      assert.equal(confirmStatus, true);
    });
  });

  describe('#save', () =>  {
    it('can save a user to a database ', (done) =>  {
      testUser2.save().then((user) => {
        assert.equal(testUser2.name, sampleUserData2.name);
        done();
      }).catch((err) => {
        done(err);
      });
    });

    it('can prevent overwriting an existing user ', (done) =>  {
      testUser.save().then((user) => {
        done('A user was created somehow!');
      }).catch((err) => {
        assert.equal('A user exists with this email!', err.message);
        done();
      });
    });
  });

  describe('#find', () =>  {
    it('can find an existing user with email', (done) =>  {
      User.find({email: sampleUserData.email}).then((user) => {
        assert.equal(user.name, sampleUserData.name);
        done();
      }).catch((err) => {
        done(err);
      });
    });

    it('can find an existing user with id ', (done) =>  {
      User.find({id: userId}).then((user) => {
        assert.equal(user.name, sampleUserData.name);
        done();
      }).catch((err) => {
        done(err);
      });
    });

    it('can report an error if no user email or id is provided', (done) =>  {
      User.find().then((user) => {
        done('This should not happen');
      }).catch((err) => {
        assert.equal('You did not provide an id or email', err.message);
        done();
      });
    });

    it('can tell you it cannot find a user', (done) =>  {
      User.find({email: 'blah'}).then((user) => {
        done('This should not happen');
      }).catch((err) => {
        assert.equal('No user found with that email exists', err.message);
        done();
      });
    });
  });

  describe('#_modifyUserObject', () =>  {
    const originalData = {
			data: "b",
      data2: {
      	next: {
					internal: true,
        	souwu: true
        },
        next2: 'test2',
        next3: ['one', 'two']
			},
      data3: 'test3',
    }

    const modify = {
			data: "b",
      data2: {
      	next: {
					internal: false,
        },
        next2: 'test2',
        next3: ['one', 'two', 'three']
			},
      data3: '$delete',
    }

    const modifiedData = {
			data: "b",
      data2: {
      	next: {
					internal: false,
        	souwu: true,
        },
        next2: 'test2',
        next3: ['one', 'two', 'three']
			}
    }

    it('update a user object', () =>  {
      const finalData = User._modifyUserObject(modify, originalData, false);
      assert.equal(JSON.stringify(modifiedData), JSON.stringify(finalData));
    });
  });



  describe('#update', () =>  {
    it('can not update a user if that user does not exists', (done) =>  {
      testUser.id = 'blah';
      testUser.update().then(() => {
        done('This should not happen');
      }).catch((err) => {
        assert.equal('No user found with that id exists', err.message);
        done();
      });
    });

    it('can update your user account', (done) =>  {
      testUser.id = userId;
      sampleUserData.name = sampleUserData.newName;
      testUser.setName(sampleUserData.name);
      testUser.update().then((user) => {
        assert.equal(user.name, sampleUserData.name);
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });

  describe('#query', () =>  {
    it('can return a list of users', (done) =>  {
      User.query().then((users) => {
        assert.equal(users.length, 1);
        done();
      }).catch((err) => {
        done(err);
      });
    });

    it('can return a list of users based on a query', (done) =>  {
      const params = [
        {
          root: 'email',
          data: sampleUserData.email
        }
      ]

      User.query(params).then((users) => {
        assert.equal(users[0].email, params[0].data);
        done();
      }).catch((err) => {
        done(err);
      });
    });

    it('can return a list of users based on multiple queries', (done) =>  {
      const params = [
        {
          root: 'email',
          data: sampleUserData.email
        },
        {
          root: 'name',
          data: sampleUserData.name
        }
      ]

      User.query(params).then((users) => {
        assert.equal(users[0].email, params[0].data);
        done();
      }).catch((err) => {
        done(err);
      });
    });

    it('can return an empty list of users', (done) =>  {
      const params = [
        {
          root: 'email',
          data: 'blah'
        }
      ]

      User.query(params).then((users) => {
        assert.equal(users.length, 0);
        done()
      }).catch((err) => {

        done(err);
      });
    });
  });

  describe('#validate', () =>  {
    it('can notify if you are not validated', (done) =>  {
      testUser.setPassword('blah');
      testUser.validate().then(() => {
        done('This should not happen');
      }).catch((err) => {
        assert.equal('Your email or password is incorrect!', err.message);
        done();
      });
    });

    it('can validate your user account (login operation)', (done) =>  {
      testUser.setPassword(sampleUserData.tempPassword);
      testUser.validate().then((user) => {
        assert.equal(user.name, sampleUserData.name);
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });

  describe('#remove', () =>  {
    it('can remove a user', (done) =>  {
      testUser.remove().then(() => {
        User.find({ email: testUser.email }).then(() => {
          done('Should not be found');
        }).catch((err) => {
          assert.equal(err.message, 'No user found with that email exists');
          done();
        });
      }).catch((err) => {
        done(err);
      });
    });
  });

  afterEach((done) => {
    // delete any created users!!
    clearDocuments(db.collection('user-test')).then(() => {
      done();
    }).catch((err) => {
      done(err);
    });
  });
});
