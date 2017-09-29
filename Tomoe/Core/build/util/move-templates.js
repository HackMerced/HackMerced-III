// DEPRECATION WARNING: This will be removed in later versions of tomoe
import fs from 'fs-extra';

const SERVER_DIR = './src/server/src/templates/'
const BUILD_DIR = './build/templates/'

export function moveFile(fileName){
  return new Promise((resolve, reject) => {
    if(!fs.existsSync(SERVER_DIR + fileName)){
      fs.createReadStream(BUILD_DIR + fileName).pipe(fs.createWriteStream(SERVER_DIR + fileName));
    }

    resolve();
  })
}
