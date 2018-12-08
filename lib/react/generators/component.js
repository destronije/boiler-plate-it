const inquirer = require('inquirer');
const fs = require('fs');

const CLASS_COMPONENT = 'Class';
const FUNCTIONAL_COMPONENT = 'Functional';

async function init() {
  let questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Enter component name'
    },
    {
      type: 'list',
      choices: [
        {name: 'Class', value:CLASS_COMPONENT},
        {name: 'Functional', value:FUNCTIONAL_COMPONENT}
      ],
      message: 'Choose component type',
      name:'type',
      default: CLASS_COMPONENT,
    }
  ];

  let answers = await inquirer.prompt(questions);

  // read template file
  const template = __dirname + `/../../../templates/react/components/${answers.type}.js`;
  let templateString = await new Promise((resolve, reject) => {
    fs.readFile(template, 'utf8', (err, data) => {
      resolve(data);
    });
  });

  // replace template strings
  let result = templateString.replace(/__COMPONENT_NAME__/g, answers.name);
  let finalName = `./${ answers.name }.js`;

  // save file
  await new Promise((resolve, reject) => {
    fs.writeFile(finalName, result, 'utf8', (err) => {
      if (err) {
        console.log('There was an error creating the component');
      }
      resolve();
    });
  });

  console.log('React component generator');
}

exports.init = init;
