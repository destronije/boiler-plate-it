#!/usr/bin/env node

var config = require('./../config').config;

let frameworks = [];
for (let febetype in config) {
    for (let framework in config[febetype]) {
        frameworks.push(framework);
    }
}

let argvFramework = process.argv.find((argument) => argument.includes('-framework')).split('=')[1];
let argvGenerator = process.argv.find((argument) => argument.includes('-generator')).split('=')[1];

// search for framework
let choosenFramework;
if (frameworks.includes(argvFramework)) {
    choosenFramework = argvFramework;
} else {
    console.log("You inserted wrong framework.")
}

let generators = [];
let chosenFeBeType;
for (let febetype in config) {
    for (let framework in config[febetype]) {
        if(framework === choosenFramework) {
            chosenFeBeType = febetype;
            for(let generator in config[febetype][framework].generators) {
                generators.push(generator);
            }
        }
    }
}

if(! generators.includes(argvGenerator)) {
    console.log('You inserted wrong generator.')
    return;
}

console.log(`You have chosen ${argvFramework} and ${argvGenerator}.`);

config[chosenFeBeType][argvFramework].generators[argvGenerator].init();
