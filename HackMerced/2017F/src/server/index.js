const fs = require('fs'),
      ENV_PATH = '../../.env';
const colors = require('colors');

// support for local .env files
if(!fs.existsSync(ENV_PATH)){
  require('dotenv').config({path: './.env'});
}

require( 'babel-core/register' );
require('./src/server.js');
