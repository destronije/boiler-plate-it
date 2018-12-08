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
  if(stateLib.answer.value === constants.REDUX_THUNK ||
    stateLib.answer.value === constants.REDUX){
    pickedLibraries.push({name: 'React Redux', value:{
        value:constants.REACT_REDUX,
      }})
  }

  // let storageLib = {
  //   answer:null,
  // }

  // if(stateLib.answer === constants.REDUX_THUNK || stateLib.answer === constants.REDUX){
  //   storageLib = await inquirer.prompt([{
  //     type: 'list',
  //     choices: constants.storageLibraries,
  //     name: 'answer',
  //     message: 'Do you want any library for storage management',
  //     default: false,
  //   }])
  // }
  stateLib.answer && pickedLibraries.push(stateLib.answer)


  const addLibs = await inquirer.prompt([{
    type: 'checkbox',
    name:'answer',
    choices: constants.additionalLibraries.filter(lib=>
    {
      if(!lib.value.dep) return true

      return pickedLibraries.includes(lib.value.dep)
    }),
    message: 'Do you want any addition library included',
    default: false,
  }])

  addLibs.answer.forEach( lib => {
      if(lib.dev){
        pickedDevLibraries.push(lib)
      }else{
        pickedLibraries.push(lib)
      }

    })

  return {pickedLibraries,
    pickedDevLibraries}
}



exports.askQuestions = askQuestions
