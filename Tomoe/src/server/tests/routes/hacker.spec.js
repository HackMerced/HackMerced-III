import Chai from 'chai';
import { assert } from 'chai';

import ChaiHttp from 'chai-http';
import { server } from '../../src/server';
import { sampleUser, sampleUser2 } from '../constants'

Chai.use(ChaiHttp);
const mockServer = Chai.request(server.listener)
const should = Chai.should();

describe('route: hacker', () => {
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

  describe('/GET hacker', () => {
    it('it should GET a hacker', (done) => {
      mockServer
          .get('/hacker/' + sampleUser.email)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a('object');
              assert.equal(sampleUser.name, res.body.results.name);

            done();
          });
    });

    it('it return GET a 404 if user is not found', (done) => {
      mockServer
          .get('/hacker/' + sampleUser2.email)
          .end((err, res) => {
              res.should.have.status(404);
            done();
          });
    });
  });

  after(() => {
    server.stop();
  });
});
