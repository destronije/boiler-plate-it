const constants = require('./constants')
const inquirer = require('inquirer')

async function askQuestions(){

  const pickedLibraries = []
  const pickedDevLibraries = []
  const stateLib = await inquirer.prompt([{
    type: 'list',
    choices: constants.stateLibraries,
    message: 'Do you want any library for state management ',
    name:'answer',
    default: false,
  }])

  let storageLib = {
    answer:null,
  }

  if(stateLib.answer === constants.REDUX_THUNK || stateLib.answer === constants.REDUX){
    pickedLibraries.push(constants.REACT_REDUX)
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

  if(storageLib.answer === constants.LOCAL_FORAGE) {
    pickedLibraries.push(constants.REDUX_STORAGE)
    pickedLibraries.push(constants.LOCAL_FORAGE)
  }

  pickedDevLibraries.push(...addLibs.answer)
  return {pickedLibraries,
    pickedDevLibraries}
}

exports.askQuestions = askQuestions
