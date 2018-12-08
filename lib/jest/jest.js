const editJsonFile = require('edit-json-file');
const chalk = require('chalk');
const ncp = require('ncp').ncp;
const { functions, npm } = require('../helpers');

async function init(options) {
  let packageManager = npm[options.packageManager];
  let workingDirectory = process.cwd();
  let jestTemplatePath = __dirname + '/../../templates/jest';
  let config = require(`${ jestTemplatePath }/config`).config;

  await new Promise((resolve, reject) => {
    console.log(chalk.green('Prepairing Jest template'));
    ncp(`${ jestTemplatePath }/src`, workingDirectory, (err) => {
      if (err) {
        reject();
      }

      resolve();
    });
  }).catch(reason => {});

  for (let dependency in config.packages) {
    let additionalJestParams = '';
    if (dependency === 'devDependencies') {
      additionalJestParams += '--dev';
    }

    let packagesString = config.packages[dependency].join(' ');

    await functions.commandPromise(`${ packageManager.addPackage } ${ packagesString } ${ additionalJestParams }`);
  }

  console.log(chalk.green('Adding Jest scripts'));
  let packagejson = editJsonFile('./package.json', {});
  let scripts = config.scripts;
  for (let scriptKey in scripts) {
    packagejson.set(`scripts.${ scriptKey }`, scripts[scriptKey]);
  }

  packagejson.save();
}

module.exports = {
  init: init
};
