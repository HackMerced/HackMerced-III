const fs = require('fs-extra');
const configs = require('../build.config.js');

for(i in configs){
  const config = configs[i];

  const dist = config.dist_folder + '/';
  const imports = config.imports;

  if(!fs.existsSync(dist)){
    fs.mkdirSync(dist);
  }

  for(i in imports){
    const origin = imports[i][0];

    if(fs.existsSync(origin)){
      const saveURL = dist + imports[i][1];
      fs.copySync(origin, saveURL);
    } else {
      throw `The following import, ${i}, does not exist at '${origin}'`;
    }
  }
}
