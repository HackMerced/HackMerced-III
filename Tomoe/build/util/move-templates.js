// DEPRECATION WARNING: This will be removed in later versions of tomoe
import fs from 'fs-extra';

const SERVER_DIR = './src/server/src/templates/'
const BUILD_DIR = './build/templates/'

function moveFile(fileName){
  if(!fs.existsSync(SERVER_DIR + fileName)){
    fs.createReadStream(BUILD_DIR + fileName).pipe(fs.createWriteStream(SERVER_DIR + fileName));
  }
}


// move email template

moveFile('email.template.html');
