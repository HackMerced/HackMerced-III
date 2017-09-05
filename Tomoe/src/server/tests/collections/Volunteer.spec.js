import { assert } from 'chai';
import { Volunteer } from '../../src/collections';
import { sampleVolunteer } from '../constants'
import { clearDocuments } from '../util'

describe('Volunteer', () =>  {
  let sampleVolunteerData;
  let testVolunteer;

  beforeEach((done) => {
    // create a user
    sampleVolunteerData = new sampleVolunteer();
    testVolunteer = new Volunteer(sampleVolunteerData);

    testVolunteer.save().then((user) => {
      done();
    }).catch((err) => {
      done(err);
    });
  });

  describe('#constructor', () =>  {
    it('accesss the Volunteer class', () =>  {
      testVolunteer.setPassword(sampleVolunteerData.tempPassword);

      assert.include(testVolunteer.email, sampleVolunteerData.email);
    });
  });

  describe('#query', () =>  {
    it('can query volunteers with data inside of objects inside documents', (done) =>  {
      const params = [
        {
          root: 'details',
          option: 'age',
          data: sampleVolunteerData.details.age
        }
      ]

      Volunteer.query(params).then((users) => {
        assert.equal(users[0].details.age, params[0].data);
        done();
      }).catch((err) => {
        done(err);
      });
     });

     it('can query volunteers with data inside of objects inside documents and normal values', (done) =>  {
       const params = [
         {
           root: 'details',
           option: 'age',
           data: sampleVolunteerData.details.age
         },
         {
           root: 'name',
           data: sampleVolunteerData.name
         }
       ]

       Volunteer.query(params).then((users) => {
         assert.equal(users[0].details.age, params[0].data);
         done();
       }).catch((err) => {
         done(err);
       });
      });
  });

  afterEach((done) => {
    // delete any created users!!
    clearDocuments(db.collection('volunteer')).then(() => {
      done();
    }).catch((err) => {
      done(err);
    });
  });

});
