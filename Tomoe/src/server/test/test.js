const chai = require('chai');
      chai.should();
      chai.use(require('chai-things'));

const assert = chai.assert; // define assert library

const request = require('supertest');
const should = require('should');

const dotenv = require('dotenv').config({path: '.env_test'});

const options = {
  Database_Names :{
    admin:"test_tomoe_admin",
    hackathon:"test_tomoe_hacks"
  },
  url: process.env.TEST_URL + ":" + process.env.PORT
}

console.log("Testing installer")
require('./setup/install.js')(dotenv, assert, request, should, chai, options);
require('./api/routes.js')(dotenv, assert, request, should, chai, options);

//require('./setup/users.js')(assert, request, should);
