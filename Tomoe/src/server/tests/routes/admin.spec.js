import Chai from 'chai';
import ChaiHttp from 'chai-http';
import { assert } from 'chai';

import { aql } from 'arangojs';

import { server } from '../../src/server';
import { Admin } from '../../src/collections';
import { sampleAdmin, sampleAdmin2 } from '../constants'
import { clearDocuments } from '../util'

Chai.use(ChaiHttp);
const mockServer = Chai.request(server.listener)
const should = Chai.should();

describe('route: admin', () => {
  let sampleAdminData;
  let sampleAdminData2;
  let testAdmin;
  let testAdmin2;
  let adminId;

  beforeEach((done) => {
    // create a user
    sampleAdminData = new sampleAdmin();
    sampleAdminData2 = new sampleAdmin2();

    testAdmin = new Admin(sampleAdminData);
    testAdmin2 = new Admin(sampleAdminData2);

    testAdmin.setPassword(sampleAdminData.password);
    testAdmin.save().then((user) => {
      adminId = user.id;
      done();
    }).catch((err) => {
      done(err);
    });
  });

  describe('GET /admins', () => {
    it('it should GET all admins', (done) => {
      mockServer
          .get('/admins')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a('array');
              res.body.results.length.should.be.eql(1);

            done();
          });
    });

    it('it should GET an empty list of admins', (done) => {
      mockServer
          .get('/admins?details.number.age=99')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a('array');
              res.body.results.length.should.be.eql(0);

            done();
          });
    });

    it('it should GET a list of admins from a query', (done) => {
      mockServer
          .get('/admins?permissions=read')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a('array');
              res.body.results.length.should.be.eql(1);

            done();
          });
    });
  });

  describe('GET /admins/{user}', () => {
    it('it should GET a admin from an email', (done) => {
      mockServer
          .get('/admins/' + sampleAdminData.email)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.results.should.be.a('object');
            assert.equal(sampleAdminData.name, res.body.results.name);

            done();
          });
    });

    it('it should GET a admin an id', (done) => {
      mockServer
          .get('/admins/' + adminId)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a('object');
              assert.equal(sampleAdminData.name, res.body.results.name);

            done();
          });
    });


    it('it return GET a 404 if admin is not found', (done) => {
      mockServer
          .get('/admins/' + 'blah@gmail.com')
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
    });
  });

  describe('POST /admins', () => {
    it('it should not make a admin when an email is not provided', (done) => {
      delete sampleAdminData.email;

      mockServer
          .post('/admins')
          .send(sampleAdminData)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            assert.equal('email is required', res.body.message);
            done();
          });
    });

    it('it should not make a admin when a password is not provided', (done) => {
      delete sampleAdminData.password;

      mockServer
          .post('/admins')
          .send(sampleAdminData)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            assert.equal('password is required, confirmPassword and password must match', res.body.message);
            done();
          });
    });

    it('it should not make a admin when a confirmed password is not provided', (done) => {
      delete sampleAdminData.confirmPassword;

      mockServer
          .post('/admins')
          .send(sampleAdminData)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            assert.equal('confirmPassword is required', res.body.message);
            done();
          });
    });

    it('it should not make a admin with matching passwords', (done) => {
      sampleAdminData.confirmPassword = 'blah';

      mockServer
          .post('/admins')
          .send(sampleAdminData)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            assert.equal('confirmPassword and password must match', res.body.message);
            done();
          });
    });

    it('it should create a admin', (done) => {
      mockServer
          .post('/admins')
          .send(sampleAdminData2)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.results.should.be.a('object');
            assert.equal(res.body.results.name, sampleAdminData2.name);

            db.query( aql`
              FOR user IN admin
              RETURN user
            `).then((cursor) => {
              cursor.all().then((users) => {
                assert.equal(res.body.results.email, users[1].email);
                assert.equal(res.body.results.name, users[1].name);
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

  describe('POST /admins/{user}', () => {
    it('it should update a admin from an email', (done) => {
      mockServer
          .post('/admins/' + sampleAdminData.email)
          .send({name: 'blah'})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.results.should.be.a('object');
            assert.equal('blah', res.body.results.name);

            done();
          });
    });

    it('it should update a admin from an id', (done) => {
      mockServer
          .post('/admins/' + adminId)
          .send({ name: sampleAdminData.name })
          .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a('object');
              assert.equal(sampleAdminData.name, res.body.results.name);

            done();
          });
    });


    it('it return GET a 404 if user is not found', (done) => {
      mockServer
          .post('/admins/' + 'blah@gmail.com')
          .send()
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
    });
  });

  describe('POST /admins/{user}/validate', () => {
    it('it should validate a admin from an email', (done) => {
      mockServer
          .post('/admins/' + sampleAdminData.email + '/validate')
          .send({ password: sampleAdminData.password })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.results.should.be.a('object');
            assert.equal(sampleAdminData.name, res.body.results.name);

            done();
          });
    });

    it('it should validate a admin from an id', (done) => {
      mockServer
          .post('/admins/' + adminId + '/validate')
          .send({ password: sampleAdminData.password })
          .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a('object');
              assert.equal(sampleAdminData.name, res.body.results.name);

            done();
          });
    });


    it('it return GET a 403 if user is not validated', (done) => {
      mockServer
          .post('/admins/' + sampleAdminData.email + '/validate')
          .send({ password: 'blah' })
          .end((err, res) => {
            res.should.have.status(401);
            assert.equal('password is incorrect', res.body.message);
            done();
          });
    });

    it('it return GET a 400 if user has not send a password', (done) => {
      mockServer
          .post('/admins/' + sampleAdminData.email + '/validate')
          .send({})
          .end((err, res) => {
            res.should.have.status(400);
            assert.equal('password is required', res.body.message);
            done();
          });
    });
  });

  describe('/POST admins/{user}/permissions', () => {
    it('it should update a admin permission from an email', (done) => {
      sampleAdminData.permissions = TOMOE_CONFIG.adminPermissions[0];

      mockServer
          .post('/admins/' + sampleAdminData.email + '/permissions')
          .send({permissions: sampleAdminData.permissions})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.results.should.be.a('object');
            assert.equal(sampleAdminData.permissions, res.body.results.permissions);

            done();
          });
    });

    it('it should update a admin permission from an id', (done) => {
      sampleAdminData.permissions = TOMOE_CONFIG.adminPermissions[1];

      mockServer
      .post('/admins/' + adminId + '/permissions')
      .send({permissions: sampleAdminData.permissions})
          .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a('object');
              assert.equal(sampleAdminData.permissions, res.body.results.permissions);

            done();
          });
    });


    it('it return GET a 404 if user is not found', (done) => {
      mockServer
          .post('/admins/' + 'blah@gmail.com' + '/permissions')
          .send({permissions: sampleAdminData.permissions})
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
    });

    it('it return an error if an invalid permission is entered', (done) => {
      sampleAdminData.permissions = 'blah';

      mockServer
          .post('/admins/' + sampleAdminData.email + '/permissions')
          .send({permissions: sampleAdminData.permissions})
          .end((err, res) => {
            res.should.have.status(400);
            assert.equal('Please only enter the following permissions: ' + TOMOE_CONFIG.adminPermissions.join(', '), res.body.message);
            done();
          });
    });
  });

  afterEach((done) => {
    // delete any created users!!
    clearDocuments(db.collection('admin')).then(() => {
      done();
    }).catch((err) => {
      done(err);
    });
  });

});
