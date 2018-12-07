const exec = require('child_process').exec;
const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs');

async function init() {
  let questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Enter controller name'
    },
    {
      type: 'input',
      name: 'path',
      message: 'Enter controller route path'
    }
  ];

  let answers = await inquirer.prompt(questions);

  // read template file
  const template = __dirname + '/../../../templates/express/__name__Controller.ts';
  let templateString = await new Promise((resolve, reject) => {
    fs.readFile(template, 'utf8', (err, data) => {
      resolve(data);
    });
  });

  // replace template strings
  let result = templateString.replace(/__path__/g, answers.path)
    .replace(/__name__/g, answers.name);
  let finalName = `./app/controllers/${ answers.name }Controller.ts`;

  // save file
  await new Promise((resolve, reject) => {
    fs.writeFile(finalName, result, 'utf8', (err) => {
      if (err) {
        console.log('There was an error writing the controller file');
      }
      resolve();
    });
  });

  await new Promise((resolve, reject) => {
    console.log(chalk.green('Rebuilding Express.js app'));
    exec('yarn build', () => {
      resolve();
    });
  }).catch(reason => {console.log(reason)});

  console.log('Express controller creator');
}

exports.init = init;
