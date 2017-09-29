import { assert } from 'chai';
import { Admin } from '../../src/collections';
import { sampleAdmin } from '../constants'
import { clearDocuments } from '../util'

describe('Admin', () =>  {
  let sampleAdminData;
  let testAdmin;

  beforeEach((done) => {
    // create a user
    sampleAdminData = new sampleAdmin();
    testAdmin = new Admin(sampleAdminData);

    testAdmin.save().then((user) => {
      done();
    }).catch((err) => {
      done(err);
    });
  });



  describe('#constructor', () =>  {
    it('accesss the Admin class', () =>  {
      assert.equal(testAdmin.permissions, sampleAdminData.permissions);
    });
  });

  afterEach((done) => {
    // delete any created admins!!
    clearDocuments(db.collection('admin')).then(() => {
      done();
    }).catch((err) => {
      done(err);
    });
  });

});
