
const reactQA = require('./reactQA')
const reactInstallDeps = require('./reactInstallDeps')
const reactInit = require('./reactInit')
const inquirer = require('inquirer')


const packages = [ {
  name:'npm',
  install: 'install',
  saveToJson : '--save',
  global: '-g',
  dev: '--dev',
},{
  name:'yarn',
  install: 'add',
  saveToJson : '--save',
  global: '-g',
  dev: '--dev',
}]

async function init(prop){

  function getPackager(packagerName) {
    return packages.find((packager)=>packager.name === packagerName)
  }

  try {
    const dependencies = await reactQA.askQuestions()
    const name = await inquirer.prompt([{
      type: 'input',
      message: `What's your project name?`,
      name: 'answer',
      default: "helloworld",
    }])
    const packager = getPackager(prop.packageManager)
    const isInstallOk = await reactInstallDeps.installDeps(packager, dependencies, name.answer)


    const isInitOk = await reactInit.setInitialFiles(dependencies, name.answer)
    

    console.log('Hack9 lets go!')
  }catch(error){
    console.log('Error happend: ',error)
  }
}

exports.init = init;
