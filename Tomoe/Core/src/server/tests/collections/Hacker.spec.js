import { assert } from 'chai';
import { Hacker } from '../../src/collections';
import { sampleHacker } from '../constants'
import { clearDocuments } from '../util'

describe('Hacker', () =>  {
  let sampleHackerData;
  let testHacker;

  beforeEach((done) => {
    // create a user
    sampleHackerData = new sampleHacker();
    testHacker = new Hacker(sampleHackerData);

    testHacker.save().then((user) => {
      done();
    }).catch((err) => {
      done(err);
    });
  });

  describe('#constructor', () =>  {
    it('accesss the Hacker class', () =>  {
      testHacker.setPassword(sampleHackerData.tempPassword);

      assert.include(testHacker.email, sampleHackerData.email);
    });
  });

  describe('#query', () =>  {
    it('can query hackers with data inside of objects inside documents', (done) =>  {
      const params = [
        {
          root: 'details',
          option: 'age',
          data: sampleHackerData.details.age
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
           data: sampleHackerData.details.age
         },
         {
           root: 'name',
           data: sampleHackerData.name
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

  afterEach((done) => {
    // delete any created users!!
    clearDocuments(db.collection('hacker')).then(() => {
      done();
    }).catch((err) => {
      done(err);
    });
  });

});
