const inquirer = require('inquirer');
const fs = require('fs');

async function init() {
  let questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Enter reducer name'
    }
  ];

  let answers = await inquirer.prompt(questions);

  // read template file
  const template = __dirname + '/../../../templates/react/reducer/reducer.js';
  let templateString = await new Promise((resolve, reject) => {
    fs.readFile(template, 'utf8', (err, data) => {
      resolve(data);
    });
  });

  let finalName = `./${ answers.name }.js`;

  // save file
  await new Promise((resolve, reject) => {
    fs.writeFile(finalName, result, 'utf8', (err) => {
      if (err) {
        console.log('There was an error creating the reducer file');
      }
      resolve();
    });
  });

  console.log('React reducer generator');
}

exports.init = init;
