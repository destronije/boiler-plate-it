const react = require('./lib/react/react');
const reactReducer = require('./lib/react/generators/reducer');
const reactComponent = require('./lib/react/generators/component');

const express = require('./lib/express/express');
const expressController = require('./lib/express/generators/controller');

const angular = require('./lib/angular/angular');
const angularController = require('./lib/angular/generators/controller');

const reactNative = require('./lib/react-native/react-native');
const reactNativeReducer = require('./lib/react-native/generators/reducer');

const vue = require('./lib/vue/vue');
const vueController = require('./lib/vue/generators/controller');

const nestJS = require('./lib/nest-js/nest');


const inquirer = require('inquirer');

exports.config = {
    "frontend": {
        "react": {
            "class": react,
            "generators": {
                "reducer": reactReducer,
                "component": reactComponent
            }
        },
        "angular": {
            "class": angular,
            "generators": {
                "controller": angularController
            }
        },
        'reactnative': {
            "class": reactNative,
            "generators": {
                "reducer": reactNativeReducer
            }
        },
        "vue": {
            "class": vue,
            "generators": {
                "reducer": vueController
            }
        }
    },
    "backend": {
        "express": {
            "class": express,
            "generators": {
                "controller": expressController
            }
        },
        "nestJS": {
            "class": nestJS
        }
    }
};

exports.setup = {
    "basic": {
        "first": {
            "question": 'Do you want to implement unit test in your project?',
            "answers": [
                new inquirer.Separator(),
                "none",
                "jest"
            ]
        },
        "second": {
            "question": 'Which package manager do you want to use?',
            "answers": [
                new inquirer.Separator(),
                "npm",
                "yarn"
            ]
        },
        "third": {
            "question": 'Do you want to create frontend or backend application?',
            "answers": [
                new inquirer.Separator(),
                "I want to create frontend application",
                "I want to create backend application"
            ]
        }
    },
    "frontend": {
        "first": {
            "question": "Which framework do you want to use?",
            "answers": [
                new inquirer.Separator(),
                "react",
                "angular",
                "vue",
                "react-native"
            ]
        }
    },
    "backend": {
        "first": {
            "question": "Which framework do you want to use?",
            "answers": [
                new inquirer.Separator(),
                "express",
                "nestJS"
            ]
        }
    }
}
