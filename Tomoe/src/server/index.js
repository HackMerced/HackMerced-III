const args = process.argv.slice(2);
const fs = require("fs");


if(args && args[0] && (args[0] === "live" || args[0] === "dev" || args[0] === "test")){
  require('./runtime.js')(args[0]);
} else if(fs.existsSync(".env")){
  const dotenv = require('dotenv');
  require('./runtime.js')(process.env.MODE);
} else if(fs.existsSync(".env_test")){
  require('./runtime.js')("test");
} else {
  console.log("Can't start server, please specify mode (dev or live) or set up your .env file");
}
