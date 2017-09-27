const packageDetail = require('../../package.json');
const colors = require('colors');
const LATEST_MAJOR_RELEASE = 20.2;

function checkVersion(resolve) {
  if(parseFloat(packageDetail.version.replace('.', '')) < LATEST_MAJOR_RELEASE) {
    console.log(colors.red('\n\You are running a deprecated version of Tomoe!\nPlease delete your "tomoe.config.js" file and run the following:\n\n'),colors.green('  yarn setup'))
    process.exit(1);
  }

  if(TOMOE_CONFIG.version === packageDetail.version) {
    return resolve();
  }

  console.log(colors.red('\n\Version mismatch in Tomoe instances, please run:\n'),colors.green('  yarn renew'))
  process.exit(1);
}

module.exports = checkVersion;
