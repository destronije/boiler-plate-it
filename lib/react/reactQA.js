const constants = require('./constants')
const inquirer = require('inquirer')

async function askQuestions(){

  const pickedLibraries = []
  const pickedDevLibraries = []
  const stateLib = await inquirer.prompt([{
    type: 'list',
    choices: constants.stateLibraries,
    message: 'Do you want any  library for state management ',
    name:'answer',
    default: false,
  }])

  let storageLib = {
    answer:null,
  }

  if(stateLib.answer === constants.REDUX_THUNK || stateLib.answer === constants.REDUX){
    storageLib = await inquirer.prompt([{
      type: 'list',
      choices: constants.storageLibraries,
      name: 'answer',
      message: 'Do you want any library for storage management',
      default: false,
    }])
  }


  const addLibs = await inquirer.prompt([{
    type: 'checkbox',
    name:'answer',
    choices: constants.devLibraries,
    message: 'Do you want any addition library included',
    default: false,
  }])

  stateLib.answer && pickedLibraries.push(stateLib.answer)

  storageLib.answer && pickedLibraries.push(storageLib.answer)


  pickedDevLibraries.push(...addLibs.answer)
  return {pickedLibraries,
    pickedDevLibraries}
}



exports.askQuestions = askQuestions
