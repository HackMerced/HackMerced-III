const packageDetail = require('../../package.json');
const colors = require('colors');

function checkVersion(resolve) {
    if( TOMOE_CONFIG.version === packageDetail.version) {
      return resolve();
    }

    console.log(colors.red('\n\Version mismatch in Tomoe instances, please run:\n'),colors.green('  yarn renew'))
    process.exit(1);
}

module.exports = checkVersion;
