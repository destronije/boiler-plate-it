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

  const template = __dirname + '/../../../templates/express/__name__Controller.ts';
  fs.readFile(template, 'utf8', (err, data) => {
    let result = data.replace(/__path__/g, answers.path)
      .replace(/__name__/g, answers.name);
    let finalName = `./app/controllers/${ answers.name }Controller.ts`;
    console.log(finalName);
    fs.writeFile(finalName, result, 'utf8', (err) => {
      if (err) {
        console.log('There was an error writing the controller file');
      }
      console.log('success');
    });
  });
  console.log('Express controller creator');
}

exports.init = init;
