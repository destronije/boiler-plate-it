#!/usr/bin/env node
const config = require('./../config').config;
const setup = require('./../config').setup;
const inquirer = require('inquirer');
const program = require('commander');
const chalk = require('chalk');

var choices = {
  packageManager: '',
  unitTests: ''
}

async function startQuestioning() {
  var question = {
    type: 'list',
    name: 'name',
    message: setup.basic.first.question,
    choices: setup.basic.first.answers
  }

  let unitTests = await inquirer.prompt(question);
  choices.unitTests = unitTests.name;

  question.message = setup.basic.second.question;
  question.choices = setup.basic.second.answers;

  let packageManager = await inquirer.prompt(question);
  choices.packageManager = packageManager.name;

  question.message = setup.basic.third.question;
  question.choices = setup.basic.third.answers;

  let appType = await inquirer.prompt(question);

  if (appType.name === setup.basic.third.answers[1]) {
    question.message = setup.frontend.first.question;
    question.choices = setup.frontend.first.answers;

    let frontendFramework = await inquirer.prompt(question);
    switch (frontendFramework.name) {
      case 'react': {
        config.frontend.react.class.init(choices);
        break;
      }
      case 'angular': {
        config.frontend.angular.class.init(choices);
        break;
      }
      case 'vue': {
        config.frontend.vue.class.init(choices);
        break;
      }
      case 'react-native': {
        config.frontend.reactnative.class.init(choices);
        break;
      }
      default: {
        console.log("Error, wrong frontend framework");
      }
    }
  }
  else {

    question.message = setup.backend.first.question;
    question.choices = setup.backend.first.answers;

    let backendFramwork = await inquirer.prompt(question);
    switch (backendFramwork.name) {
      case 'express': {
        config.backend.express.class.init(choices);
        break;
      }
      case 'nestJS': {
        config.backend.nestJS.class.init(choices);
        break;
      }
      default: {
        console.log('Error, wrong backend framework');
      }
    }

  }
}

async function startGenerator(argvFramework, argvGenerator) {
  let frameworks = [];
  for (let febetype in config) {
    for (let framework in config[febetype]) {
      frameworks.push(framework);
    }
  }

  // search for framework
  let choosenFramework;
  if (frameworks.includes(argvFramework)) {
    choosenFramework = argvFramework;
  }
  else {
    console.log("You inserted wrong framework.")
  }

  let generators = [];
  let chosenFeBeType;
  for (let febetype in config) {
    for (let framework in config[febetype]) {
      if (framework === choosenFramework) {
        chosenFeBeType = febetype;
        for (let generator in config[febetype][framework].generators) {
          generators.push(generator);
        }
      }
    }
  }

  if (! generators.includes(argvGenerator)) {
    console.log('You inserted wrong generator.')
    return;
  }

  console.log(`You have chosen ${ argvFramework } and ${ argvGenerator }.`);

  config[chosenFeBeType][argvFramework].generators[argvGenerator].init();
}

program.version('0.1.0')
  .usage('\n  ____        _ _           _____  _       _       _____ _______ \n' +
    ' |  _ \\      (_) |         |  __ \\| |     | |     |_   _|__   __|\n' +
    ' | |_) | ___  _| | ___ _ __| |__) | | __ _| |_ ___  | |    | |   \n' +
    ' |  _ < / _ \\| | |/ _ \\ \'__|  ___/| |/ _` | __/ _ \\ | |    | |   \n' +
    ' | |_) | (_) | | |  __/ |  | |    | | (_| | ||  __/_| |_   | |   \n' +
    ' |____/ \\___/|_|_|\\___|_|  |_|    |_|\\__,_|\\__\\___|_____|  |_|   \n')
  .option('-c, --create', 'BoilerPlateIT', () => {
    startQuestioning();
  })
  .option('-g, --generate [framework]:[generator]', 'Generate within already BoilerPlateIT-ed project', (input) => {
    let [framework, generator] = input.split(':');
    if (framework === undefined || generator === undefined) {
      console.log(chalk.green('Command syntax incorrect'));
      return;
    }

    startGenerator(framework, generator);
  })
  .parse(process.argv);


