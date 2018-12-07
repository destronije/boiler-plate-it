async function init(){
  const inquirer = require('inquirer')
  const shell = require('shelljs')

  async function askQuestions(){
    const stateContainers = [
      {name: 'None', value:undefined },
      {name: 'Redux', value:'redux' },
      {name: 'Mobx', value:'mobx'}
    ]
    const storageLibraries = [
      {name: 'None',value:undefined },
      {name:'Redux persist', value:'redux-persist'},
      {name:'Local Forage', value:'localforage'}
    ]

    const anotherLibraries = [
      {name: 'Enzyme', value:'enzyme' },
    ]


    const additionalLibraries = []
    const stateLib = await inquirer.prompt([{
      type: 'list',
      choices: stateContainers,
      message: 'Do you want any  library for state management ',
      name:'answer',
      default: false,
    }])

    const storageLib = await inquirer.prompt([{
      type: 'list',
      choices: storageLibraries,
      name: 'answer',
      message: 'Do you want any library for storage management',
      default: false,
    }])

    const addLibs = await inquirer.prompt([{
      type: 'checkbox',
      name:'answer',
      choices: anotherLibraries,
      message: 'Do you want any addition library included',
      default: false,
    }])

      stateLib.answer && additionalLibraries.push(stateLib.answer)

      storageLib.answer && additionalLibraries.push(storageLib.answer)


    additionalLibraries.push(...addLibs.answer)
    return additionalLibraries
  }

  async function installDeps(packager,dependencies){

    if(!shell.which(packager.name)){
      console.log(`${packager.name} is not installed, please install it!`)
      return
    }

    const name = await inquirer.prompt([{
      type: 'input',
      message: `What's your project name?`,
      name:'answer',
      default: "helloworld",
    }])

    if(!shell.which('create-react-app')){
      console.log('dont have create-react-app, we need to install it')
      shell.exec(`${packager.name} ${packager.save} create-react-app ${packager.global}`)
    }

    shell.exec(`create-react-app ${name.toLowerCase()}`)

    if(dependencies.length !== 0){
      const depsInString = dependencies.reduce((total,item)=>{return ' '+item},"")
      shell.exec(`${packager.name} ${packager.save} ${depsInString} ${packager.saveDev}`)
    }
  }

  async function setInitialFiles() {

  }

  const packager = {
    name:'npm',
    save: 'install',
    saveDev : '--save',
    global: '-g',
  }

  const dependencies = await askQuestions()

  await installDeps(packager,dependencies)


  await setInitialFiles()
}

exports.init = init;
