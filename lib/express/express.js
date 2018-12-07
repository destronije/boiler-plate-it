const inquirer = require('inquirer');
const ncp = require('ncp').ncp;

async function init() {
  // let loader = ['/ Installing', '| Installing', '\\ Installing', '- Installing'];
  // let i = 4;
  // let ui = new inquirer.ui.BottomBar({ bottomBar: loader[i % 4] });
  //
  // setInterval(() => {
  //   ui.updateBottomBar(loader[i++ % 4]);
  // }, 300);

  let workingDirectory = process.cwd();
  let templatePath = __dirname + '/../../templates/express/app';
  ncp(templatePath, workingDirectory);
}

exports.init = init;
