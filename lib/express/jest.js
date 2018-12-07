const editJsonFile = require('edit-json-file');
const chalk = require('chalk');
const ncp = require('ncp').ncp;
const exec = require('child_process').exec;

async function init() {
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
    console.log(config.packages[dependency]);
    if (dependency === 'devDependencies') {
      additionalJestParams += '--dev';
    }

    let packagesString = config.packages[dependency].join(' ');

    await new Promise((resolve, reject) => {
      console.log(chalk.green('Adding Jest packages'));
      exec(`yarn add ${ packagesString } ${ additionalJestParams }`, () => {
        resolve();
      });
    }).catch(reason => {});
  }

  console.log(chalk.green('Adding Jest scripts'));
  let packagejson = editJsonFile('./package.json', {});
  let scripts = config.scripts;
  for (let scriptKey in scripts) {
    packagejson.set(`scripts.${ scriptKey }`, scripts[scriptKey]);
  }

  packagejson.save();
}

exports.init = init;
