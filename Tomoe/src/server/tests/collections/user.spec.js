import { assert } from 'chai';
import { User, Admin, Hacker } from '../../src/collections/user';

const sampleUser = {
  name: 'Shubham Naik',
  email: 'shub@hackmerced.com',
  temp_password: 'testing2',
  newName: 'Shubham D Naik',
  permissions: 'rw',
  details: {
    age: 20
  }
}

const sampleUser2 = {
  name: 'Jan Tanja',
  email: 'jan@hackmerced.com',
  temp_password: 'testing3',
  permissions: 'rw',
  details: {
    age: 20
  }
}

describe('User', () =>  {
  let testUser;

  describe('#constructor', () =>  {
    it('accesss the User class', () =>  {
      testUser = new User({ name: sampleUser.name} );
      assert.equal(testUser.name, sampleUser.name);
    });
  });

  describe('#setEmail', () =>  {
    it('sets a user email', () =>  {
      testUser.setEmail(sampleUser.email);
      assert.equal(testUser.email, sampleUser.email);
    });
  });

  describe('#setPassword', () =>  {
    it('sets a temporary password', () =>  {
      testUser.setPassword(sampleUser.temp_password);
      assert.equal(testUser.temp_password, sampleUser.temp_password);
    });
  });

  describe('#confirmPassword', () =>  {
    it('can confirm a password ', () =>  {
      const confirmStatus = testUser.confirmPassword(sampleUser.temp_password);
      assert.equal(confirmStatus, true);
    });
  });

  describe('#save', () =>  {

    it('can save a user to a database ', (done) =>  {
      testUser.save().then((user) => {
        assert.equal(testUser.name, sampleUser.name);
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
    let catchUser;

    it('can find an existing user with email', (done) =>  {
      User.find({email: sampleUser.email}).then((user) => {
        catchUser = user;
        assert.equal(catchUser.name, sampleUser.name);
        done();
      }).catch((err) => {
        done(err);
      });
    });

    it('can find an existing user with id ', (done) =>  {
      User.find({id: catchUser.id}).then((user) => {
        assert.equal(testUser.name, catchUser.name);
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
      const finalData = testUser._modifyUserObject(modify, originalData, false);
      assert.equal(JSON.stringify(modifiedData), JSON.stringify(finalData));
    });
  });

  describe('#update', () =>  {
    let tempId;
    it('can not update a user if that user does not exists', (done) =>  {
      tempId = testUser.id;
      testUser.id = 'blah';
      testUser.update().then(() => {
        done('This should not happen');
      }).catch((err) => {
        assert.equal('No user found with that id exists', err.message);
        done();
      });
    });

    it('can update your user account', (done) =>  {
      testUser.id = tempId;
      sampleUser.name = sampleUser.newName;
      testUser.setName(sampleUser.name);
      testUser.update().then((user) => {
        assert.equal(user.name, sampleUser.name);
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });

  describe('#query', () =>  {
    before((done) => {
      // save another user
      let testUser2 = new User({ name: sampleUser2.name, email: sampleUser2.email });

      testUser2.setPassword(sampleUser2.temp_password);

      testUser2.save().then(() => {
         done();
      }).catch((err) => {
        throw 'Failed to create second user:' + err;
      });
    });

    it('can return a list of users', (done) =>  {
      User.query().then((users) => {
        assert.equal(users.length, 2);
        done();
      }).catch((err) => {
        done(err);
      });
    });

    it('can return a list of users based on a query', (done) =>  {
      const params = [
        {
          root: 'email',
          data: sampleUser.email
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
          data: sampleUser.email
        },
        {
          root: 'name',
          data: sampleUser.name
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
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });

  describe('#validate', () =>  {
    it('can notify if your passwords do not match', (done) =>  {
      testUser.setPassword('blah');
      testUser.validate().then(() => {
        done('This should not happen');
      }).catch((err) => {
        assert.equal('Passwords do not match', err.message);
        done();
      });
    });

    it('can validate your user account (login operation)', (done) =>  {
      testUser.setPassword(sampleUser.temp_password);
      testUser.validate().then((user) => {
        assert.equal(user.name, sampleUser.newName);
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
});


describe('Admin', () =>  {
  let testAdmin;

  describe('#constructor', () =>  {
    it('accesss the Admin class', () =>  {
      testAdmin = new Admin({ permissions: sampleUser.permissions} );
      assert.equal(testAdmin.permissions, sampleUser.permissions);
    });
  });

});

describe('Hacker', () =>  {
  let testHacker;

  describe('#constructor', () =>  {
    it('accesss the User class', () =>  {
      const hackerData = {
        name: sampleUser.name,
        email: sampleUser.email,
        details: {
          age: sampleUser.details.age
        }
      }

      testHacker = new Hacker(hackerData);
      testHacker.setPassword(sampleUser.temp_password);

      assert.include(testHacker, hackerData);
    });
  });

  describe('#query', () =>  {
    before((done) => {
      testHacker.save().then(() => {
        done();
      }).catch((err) => {
        throw 'Failed to create a hacker:' + err;
      });
    });

    it('can query hackers with data inside of objects inside documents', (done) =>  {
      const params = [
        {
          root: 'details',
          option: 'age',
          data: sampleUser.details.age
        }
      ]

      Hacker.query(params).then((users) => {
        assert.equal(users[0].details.age, params[0].data);
        done();
      }).catch((err) => {
        done(err);
      });
     });

     it('can query hackers with data inside of objects inside documents and normal values', (done) =>  {
       const params = [
         {
           root: 'details',
           option: 'age',
           data: sampleUser.details.age
         },
         {
           root: 'name',
           data: sampleUser.name
         }
       ]

       Hacker.query(params).then((users) => {
         assert.equal(users[0].details.age, params[0].data);
         done();
       }).catch((err) => {
         done(err);
       });
      });
  });

});
