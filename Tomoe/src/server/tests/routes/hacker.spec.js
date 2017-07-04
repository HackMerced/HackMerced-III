import Chai from 'chai';
import { assert } from 'chai';
import ChaiHttp from 'chai-http';

import { server } from '../../src/server';
import { Hacker } from '../../src/collections';
import { sampleHacker, sampleHacker2 } from '../constants'
import { clearDocuments } from '../util'

Chai.use(ChaiHttp);
const mockServer = Chai.request(server.listener)
const should = Chai.should();

describe('route: hacker', () => {
  let sampleHackerData;
  let sampleHackerData2;
  let testHacker;
  let testHacker2;
  let hackerId;

  beforeEach((done) => {
    // create a user
    sampleHackerData = new sampleHacker();
    sampleHackerData2 = new sampleHacker2();

    testHacker = new Hacker(sampleHackerData);
    testHacker2 = new Hacker(sampleHackerData2);

    testHacker.setPassword(sampleHackerData.password);
    testHacker.save().then((user) => {
      hackerId = user.id;
      done();
    }).catch((err) => {
      done(err);
    });
  });

  describe('/GET hackers', () => {
    it('it should GET all hackers', (done) => {
      mockServer
          .get('/hackers')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a('array');
              res.body.results.length.should.be.eql(1);

            done();
          });
    });

    it('it should GET an empty list of hackers', (done) => {
      mockServer
          .get('/hackers?details.number.age=99')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a('array');
              res.body.results.length.should.be.eql(0);

            done();
          });
    });

    it('it should GET a list of hackers from a query', (done) => {
      mockServer
          .get('/hackers?details.number.age=20')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a('array');
              res.body.results.length.should.be.eql(1);

            done();
          });
    });
  });

  describe('/GET hackers/{user}', () => {
    it('it should GET a hacker from an email', (done) => {
      mockServer
          .get('/hackers/' + sampleHackerData.email)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.results.should.be.a('object');
            assert.equal(sampleHackerData.name, res.body.results.name);

            done();
          });
    });

    it('it should GET a hacker an id', (done) => {
      mockServer
          .get('/hackers/' + hackerId)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a('object');
              assert.equal(sampleHackerData.name, res.body.results.name);

            done();
          });
    });


    it('it return GET a 404 if user is not found', (done) => {
      mockServer
          .get('/hackers/' + 'blah@gmail.com')
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
    });
  });

  describe('/POST hackers', () => {


    it('it should not make a hacker with no email', (done) => {
      delete sampleHackerData.email;

      mockServer
          .post('/hackers')
          .send(sampleHackerData)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            assert.equal(res.body.message, 'You did not provide an email!');
            done();
          });
    });

    it('it should not make a hacker with no password', (done) => {
      delete sampleHackerData.password;

      mockServer
          .post('/hackers')
          .send(sampleHackerData)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            assert.equal(res.body.message, 'You did not provide a password!');
            done();
          });
    });

    it('it should not make a hacker with no confirmed password', (done) => {
      delete sampleHackerData.confirmPassword;

      mockServer
          .post('/hackers')
          .send(sampleHackerData)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            assert.equal(res.body.message, 'You did not confirm your password!');
            done();
          });
    });

    it('it should not make a hacker with matching passwords', (done) => {
      sampleHackerData.confirmPassword = 'blah';

      mockServer
          .post('/hackers')
          .send(sampleHackerData)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            assert.equal(res.body.message, 'Your passwords do not match!');
            done();
          });
    });

    it('it should create a hacker', (done) => {
      mockServer
          .post('/hackers')
          .send(sampleHackerData2)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.results.should.be.a('object');
            assert.equal(res.body.results.name, sampleHackerData2.name);

            db.collection('hacker').lookupByKeys([res.body.results._key]).then((user) => {

              assert.equal(res.body.results.password, user[0].password);
              assert.equal(res.body.results.email, user[0].email);
              assert.equal(res.body.results.name, user[0].name);
              done();
            }).catch(err => {
              done(err);
            })
          });
    });
  });

  describe('/POST hackers/{user}', () => {
    it('it should update a hacker from an email', (done) => {
      mockServer
          .post('/hackers/' + sampleHackerData.email)
          .send({name: 'blah'})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.results.should.be.a('object');
            assert.equal('blah', res.body.results.name);

            done();
          });
    });

    it('it should update a hacker from an id', (done) => {
      mockServer
          .post('/hackers/' + hackerId)
          .send({ name: sampleHackerData.name })
          .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a('object');
              assert.equal(sampleHackerData.name, res.body.results.name);

            done();
          });
    });


    it('it return GET a 404 if user is not found', (done) => {
      mockServer
          .post('/hackers/' + 'blah@gmail.com')
          .send()
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
    });
  });

  describe('/POST hackers/{user}/validate', () => {
    it('it should validate a hacker from an email', (done) => {
      mockServer
          .post('/hackers/' + sampleHackerData.email + '/validate')
          .send({ password: sampleHackerData.password })
          .end((err, res) => {
            hackerId = res.body.results.id;
            res.should.have.status(200);
            res.body.results.should.be.a('object');
            assert.equal(sampleHackerData.name, res.body.results.name);

            done();
          });
    });

    it('it should validate a hacker from an id', (done) => {
      mockServer
          .post('/hackers/' + hackerId + '/validate')
          .send({ password: sampleHackerData.password })
          .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a('object');
              assert.equal(sampleHackerData.name, res.body.results.name);

            done();
          });
    });


    it('it return GET a 403 if user is not validated', (done) => {
      mockServer
          .post('/hackers/' + sampleHackerData.email + '/validate')
          .send({ password: 'blah' })
          .end((err, res) => {
            res.should.have.status(401);
            assert.equal('Your email or password is incorrect!', res.body.message);
            done();
          });
    });

    it('it return GET a 400 if user has not send a password', (done) => {
      mockServer
          .post('/hackers/' + sampleHackerData.email + '/validate')
          .send({})
          .end((err, res) => {
            res.should.have.status(400);
            assert.equal('You did not provide a password!', res.body.message);
            done();
          });
    });
  });

  describe('/POST hackers/{user}/status', () => {
    it('it should update a hacker status from an email', (done) => {
      sampleHackerData.status = TOMOE_CONFIG.hackerStatuses[1];

      mockServer
          .post('/hackers/' + sampleHackerData.email + '/status')
          .send({status: sampleHackerData.status})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.results.should.be.a('object');
            assert.equal(sampleHackerData.status, res.body.results.status);

            done();
          });
    });

    it('it should update a hacker status from an id', (done) => {
      sampleHackerData.status = TOMOE_CONFIG.hackerStatuses[2];

      mockServer
      .post('/hackers/' + hackerId + '/status')
      .send({status: sampleHackerData.status})
          .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a('object');
              assert.equal(sampleHackerData.status, res.body.results.status);

            done();
          });
    });

    it('it return GET a 404 if user is not found', (done) => {
      sampleHackerData.status = TOMOE_CONFIG.hackerStatuses[2];

      mockServer
          .post('/hackers/' + 'blah@gmail.com' + '/status')
          .send({status: sampleHackerData.status})
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
    });

    it('it return an error if an invalid status is entered', (done) => {
      sampleHackerData.status = 'blah';

      mockServer
          .post('/hackers/' + sampleHackerData.email + '/status')
          .send({status: sampleHackerData.status})
          .end((err, res) => {
            res.should.have.status(400);
            assert.equal('Please only enter the following statuses: ' + TOMOE_CONFIG.hackerStatuses.join(', '), res.body.message);
            done();
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
