const fs = require('fs'),
      ENV_PATH = '.env';

// support for local .env files

if(fs.existsSync(ENV_PATH)){
  require('dotenv').config({path: ENV_PATH})
}

require('babel-core/register');
require('./build.js')
