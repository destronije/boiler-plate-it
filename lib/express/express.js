const chalk = require('chalk');
const ncp = require('ncp').ncp;
const { functions, npm } = require('../helpers');
const jestInit = require('../jest/jest').init;

async function init(options) {
  let packageManager = npm[options.packageManager];
  let unitTestFramework = (options.unitTests === 'none') ? false : options.unitTests;

  let workingDirectory = process.cwd();
  let expressTemplatePath = __dirname + '/../../templates/express/app';

  // copy Express.js template
  console.log(chalk.green('Prepairing Express.js template'));
  await new Promise((resolve, reject) => {
    ncp(expressTemplatePath, workingDirectory, (err) => {
      if (err) {
        reject();
      }

      resolve();
    });
  }).catch(reason => {});

  // install dependencies
  console.log(chalk.green('Installing needed dependencies'));
  await functions.commandPromise(packageManager.install);

  if (unitTestFramework) {
    await jestInit(options);
  }

  // building the app
  console.log(chalk.green('Building Express.js app'));
  await functions.commandPromise(`${ packageManager.runScript } build`);

  console.log(chalk.green('Done!'));
}

exports.init = init;
