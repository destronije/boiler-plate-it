#!/usr/bin/env node

var config = require('./../config').config;
var inquirer = require('inquirer');

inquirer
    .prompt([
        {
            type: 'list',
            name: 'theme',
            message: 'Do you want to create frontend or backend application?',
            choices: [
                new inquirer.Separator(),
                'I want to create frontend application',
                'I want to create backend application',
            ]
        }
    ])
    .then(answers => {
        console.log(config);
        console.log(answers);
    });