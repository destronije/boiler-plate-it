const ncp = require('ncp').ncp;

async function init() {
  let workingDirectory = process.cwd();
  let templatePath = __dirname + '/../../templates/express/app';
  ncp(templatePath, workingDirectory);
}

exports.init = init;
