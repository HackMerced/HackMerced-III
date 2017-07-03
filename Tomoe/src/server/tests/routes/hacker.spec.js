import Chai from 'chai';
import { assert } from 'chai';

import ChaiHttp from 'chai-http';
import { server } from '../../src/server';
import { sampleUser, sampleUser2, sampleHacker } from '../constants'

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

  describe('/GET hackers/{user}', () => {
    let userId;

    it('it should GET a hacker from an email', (done) => {
      mockServer
          .get('/hackers/' + sampleUser.email)
          .end((err, res) => {
            userId = res.body.results.id;
            res.should.have.status(200);
            res.body.results.should.be.a('object');
            assert.equal(sampleUser.name, res.body.results.name);

            done();
          });
    });

    it('it should GET a hacker an id', (done) => {
      mockServer
          .get('/hackers/' + userId)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a('object');
              assert.equal(sampleUser.name, res.body.results.name);

            done();
          });
    });


    it('it return GET a 404 if user is not found', (done) => {
      mockServer
          .get('/hackers/' + sampleUser2.email)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
    });
  });

  describe('/POST hackers', () => {


    it('it should not make a hacker with no email ', (done) => {
      const body = new sampleHacker();
      delete  body.email;

      mockServer
          .post('/hackers')
          .send(body)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            assert.equal(res.body.message, 'You did not provide an email!');
            done();
          });
    });

    it('it should not make a hacker with no password', (done) => {
      const body = new sampleHacker();
      delete body.password;

      mockServer
          .post('/hackers')
          .send(body)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            assert.equal(res.body.message, 'You did not provide a password!');
            done();
          });
    });

    it('it should not make a hacker with no confirmed password', (done) => {
      const body = new sampleHacker();
      delete body.confirmPassword;

      mockServer
          .post('/hackers')
          .send(body)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            assert.equal(res.body.message, 'You did not confirm your password!');
            done();
          });
    });

    it('it should not make a hacker with matching passwords', (done) => {
      const body = new sampleHacker();
            body.confirmPassword = 'blah';

      mockServer
          .post('/hackers')
          .send(body)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            assert.equal(res.body.message, 'Your passwords do not match!');
            done();
          });
    });

    it('it should create a hacker', (done) => {
      const body = new sampleHacker();

      mockServer
          .post('/hackers')
          .send(body)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.results.should.be.a('object');
            assert.equal(res.body.results.name, body.name);

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

    describe('/POST hackers', () => {

      let userId;

      it('it should update a hacker from an email', (done) => {
        const body = new sampleHacker();

        mockServer
            .post('/hackers/' + body.email)
            .send({name: 'blah'})
            .end((err, res) => {
              userId = res.body.results.id;
              res.should.have.status(200);
              res.body.results.should.be.a('object');
              assert.equal('blah', res.body.results.name);

              done();
            });
      });

      it('it should GET a hacker an id', (done) => {
        const body = new sampleHacker();

        mockServer
            .post('/hackers/' + userId)
            .send({ name: body.name })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.results.should.be.a('object');
                assert.equal(body.name, res.body.results.name);

              done();
            });
      });


      it('it return GET a 404 if user is not found', (done) => {
        mockServer
            .post('/hackers/' + sampleUser2.email)
            .send({})
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
