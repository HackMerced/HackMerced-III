const fs = require('fs'),
      ENV_PATH = './.env';
const colors = require('colors');

// support for local .env files
if(!fs.existsSync(ENV_PATH)){
  require('dotenv').config({path: ENV_PATH});
}

// check if tomoe config is installed
if(fs.existsSync('./tomoe.config.js')){
  global.TOMOE_CONFIG = require('../../tomoe.config.js').Tomoe;

  require( 'babel-core/register' );
  require('./src/database.js')
  require('./src/server.js');

} else {
  console.log(colors.red('\n\nWe cannot find your tomoe.config.js file!'));
  console.log(colors.grey('Please install Tomoe before turning on the server by entering the following command:'));
  console.log('\n  npm run setup\n');
}
