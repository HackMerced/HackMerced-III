const fs = require('fs'),
      ENV_PATH = '.env';

// support for local .env files

if(fs.existsSync(ENV_PATH)){
  require('dotenv').config({path: ENV_PATH})
}

// this environment is always test  
process.env.NODE_ENV = 'test';

require('babel-core/register');
require('./test-starter.js')
