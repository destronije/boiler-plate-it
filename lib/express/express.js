const chalk = require('chalk');
const ncp = require('ncp').ncp;
const exec = require('child_process').exec;

async function init() {
  let workingDirectory = process.cwd();
  let templatePath = __dirname + '/../../templates/express/app';

  await new Promise((resolve, reject) => {
    console.log(chalk.green('Prepairing Express.js template'));
    ncp(templatePath, workingDirectory, (err) => {
      if (err) {
        reject();
      }

      resolve();
    });
  }).catch(reason => {});

  await new Promise((resolve, reject) => {
    console.log(chalk.green('Installing needed dependencies'));
    exec('yarn', () => {
      resolve();
    });
  }).catch(reason => {});

  await new Promise((resolve, reject) => {
    console.log(chalk.green('Building Express.js app'));
    exec('yarn build', () => {
      resolve();
    });
  }).catch(reason => {});

  console.log(chalk.green('Done!'));
}

exports.init = init;
