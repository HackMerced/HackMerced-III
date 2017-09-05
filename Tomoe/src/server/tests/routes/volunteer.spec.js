import Chai from 'chai';
import ChaiHttp from 'chai-http';
import { assert } from 'chai';

import { aql } from 'arangojs';

import { server } from '../../src/server';
import { Volunteer } from '../../src/collections';
import { sampleVolunteer, sampleVolunteer2 } from '../constants'
import { clearDocuments } from '../util'

Chai.use(ChaiHttp);
const mockServer = Chai.request(server.listener)
const should = Chai.should();

describe('route: volunteer', () => {
  let sampleVolunteerData;
  let sampleVolunteerData2;
  let testVolunteer;
  let testVolunteer2;
  let volunteerId;

  beforeEach((done) => {
    // create a user
    sampleVolunteerData = new sampleVolunteer();
    sampleVolunteerData2 = new sampleVolunteer2();

    testVolunteer = new Volunteer(sampleVolunteerData);
    testVolunteer2 = new Volunteer(sampleVolunteerData2);

    testVolunteer.setPassword(sampleVolunteerData.password);
    testVolunteer.save().then((user) => {
      volunteerId = user.id;
      done();
    }).catch((err) => {
      done(err);
    });
  });

  describe('GET /volunteers', () => {
    it('it should GET all volunteers', (done) => {
      mockServer
          .get('/volunteers')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a('array');
              res.body.results.length.should.be.eql(1);

            done();
          });
    });

    it('it should GET an empty list of volunteers', (done) => {
      mockServer
          .get('/volunteers?details.number.age=99')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a('array');
              res.body.results.length.should.be.eql(0);

            done();
          });
    });

  });

  describe('GET /volunteers/{user}', () => {
    it('it should GET a volunteer from an email', (done) => {
      mockServer
          .get('/volunteers/' + sampleVolunteerData.email)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.results.should.be.a('object');
            assert.equal(sampleVolunteerData.name, res.body.results.name);

            done();
          });
    });

    it('it should GET a volunteer an id', (done) => {
      mockServer
          .get('/volunteers/' + volunteerId)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a('object');
              assert.equal(sampleVolunteerData.name, res.body.results.name);

            done();
          });
    });


    it('it return GET a 404 if user is not found', (done) => {
      mockServer
          .get('/volunteers/' + 'blah@gmail.com')
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
    });
  });

  describe('POST /volunteers', () => {
    it('it should not make a volunteer when an email is not provided', (done) => {
      delete sampleVolunteerData.email;

      mockServer
          .post('/volunteers')
          .send(sampleVolunteerData)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            assert.equal('email is required', res.body.message);
            done();
          });
    });

    it('it should create a volunteer', (done) => {
      mockServer
          .post('/volunteers')
          .send(sampleVolunteerData2)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.results.should.be.a('object');
            assert.equal(res.body.results.name, sampleVolunteerData2.name);

            db.query( aql`
              FOR user IN volunteer
              RETURN user
            `).then((cursor) => {
              cursor.all().then((users) => {
                done();
             }).catch((err) => {
               done(err);
             });
            }).catch(err => {
              done(err);
            })
          });
    });
  });

  describe('POST /volunteers/{user}', () => {
    it('it should update a volunteer from an email', (done) => {
      mockServer
          .post('/volunteers/' + sampleVolunteerData.email)
          .send({name: 'blah'})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.results.should.be.a('object');
            assert.equal('blah', res.body.results.name);

            done();
          });
    });

    it('it should update a volunteer from an id', (done) => {
      mockServer
          .post('/volunteers/' + volunteerId)
          .send({ name: sampleVolunteerData.name })
          .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a('object');
              assert.equal(sampleVolunteerData.name, res.body.results.name);

            done();
          });
    });


    it('it return GET a 404 if user is not found', (done) => {
      mockServer
          .post('/volunteers/' + 'blah@gmail.com')
          .send()
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
    });
  });

  describe('POST /volunteers/{user}/status', () => {
    it('it should update a volunteer status from an email', (done) => {
      sampleVolunteerData.status = TOMOE_CONFIG.volunteerStatuses[1];

      mockServer
          .post('/volunteers/' + sampleVolunteerData.email + '/status')
          .send({status: sampleVolunteerData.status})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.results.should.be.a('object');
            assert.equal(sampleVolunteerData.status, res.body.results.status);

            done();
          });
    });

    it('it should update a volunteer status from an id', (done) => {
      sampleVolunteerData.status = TOMOE_CONFIG.volunteerStatuses[2];

      mockServer
      .post('/volunteers/' + volunteerId + '/status')
      .send({status: sampleVolunteerData.status})
          .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a('object');
              assert.equal(sampleVolunteerData.status, res.body.results.status);

            done();
          });
    });

    it('it return GET a 404 if user is not found', (done) => {
      sampleVolunteerData.status = TOMOE_CONFIG.volunteerStatuses[2];

      mockServer
          .post('/volunteers/' + 'blah@gmail.com' + '/status')
          .send({status: sampleVolunteerData.status})
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
    });

    it('it return an error if an invalid status is entered', (done) => {
      sampleVolunteerData.status = 'blah';

      mockServer
          .post('/volunteers/' + sampleVolunteerData.email + '/status')
          .send({status: sampleVolunteerData.status})
          .end((err, res) => {
            res.should.have.status(400);
            assert.equal('Please only enter the following statuses: ' + TOMOE_CONFIG.volunteerStatuses.join(', '), res.body.message);
            done();
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
