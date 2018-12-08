#!/usr/bin/env node
var config = require('./../config').config;
var setup = require('./../config').setup;
var inquirer = require('inquirer');

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
    } else {

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

startQuestioning();


