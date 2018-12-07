#!/usr/bin/env node

var config = require('./../config').config;
var inquirer = require('inquirer');

var choices = {
    packageManager: '',
    applicationType: '',
    framework: ''
}

async function startQuestioning() {
    var question = {
        type: 'list',
        name: 'name',
        message: 'Which package manager do you want to use?',
        choices: [
            new inquirer.Separator(),
            'npm',
            'yarn'
        ]
    }

    let packageManager = await inquirer.prompt(question);
    choices.packageManager = packageManager.name;

    question.message = 'Do you want to create frontend or backend application?';
    question.choices = [
        new inquirer.Separator(),
        'I want to create frontend application',
        'I want to create backend application'
    ];

    let appType = await inquirer.prompt(question);
    choices.applicationType = appType.name === 'I want to create frontend application' ? "frontendApp" : "backendApp";
    if (choices.applicationType === "frontendApp") {
        question.message = 'Which framework do you want to use?';
        question.choices = [
            new inquirer.Separator(),
            'React',
            'Angular',
            'Vue',
            'React Native'
        ];
        let frameworkType = await inquirer.prompt(question);
        choices.framework = frameworkType.name;
        switch (choices.framework) {
            case 'React': {
                config.frontend.react.class.init();
                break;
            }
            case 'Angular': {
                console.log('you picked Angular');
                break;
            }
            case 'Vue': {
                console.log('you picked Vue');
                break;
            }
            case 'React Native': {
                console.log('you picked React Native');
                break;
            }
            default: {
                console.log("Error");
            }
        }
    } else {
        console.log('You picked to create backend app')
        config.backend.express.class.init();
    }

}

startQuestioning();


