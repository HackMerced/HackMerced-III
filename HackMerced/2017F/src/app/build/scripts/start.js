const logger = require('../lib/logger')
const fs = require('fs');

// support for local .env files
if(!fs.existsSync('../../../.env')){
  require('dotenv').config({path: './.env'});
}


const PORT = process.env.REACT_DEV_PORT || 3000;

logger.info('Starting server...')
require('../server/main').listen(PORT, () => {
  logger.success('Server is running at http://localhost:' + PORT)
})
