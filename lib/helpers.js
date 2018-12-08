const exec = require('child_process').exec;

function commandPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, () => {
      resolve();
    });
  }).catch(reason => {});
}

module.exports = {
  functions: {
    commandPromise: commandPromise
  },
  npm: {
    yarn: {
      install: "yarn",
      addPackage: "yarn add",
      runScript: "yarn"
    },
    npm: {
      install: "npm install",
      addPackage: "npm install",
      runScript: "npm run"
    }
  }
};
