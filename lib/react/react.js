//Constants:
const REDUX = 'redux'
const REDUX_THUNK = 'redux-thunk'
const LOCAL_FORAGE = 'localforage'
//Paths
const workingDirectory = process.cwd();
const templateIndexPath = __dirname + '/../../templates/react/index/';
const templateReducersPath = __dirname + '/../../templates/react/combineReducers/';


const inquirer = require('inquirer')
const shell = require('shelljs')


async function init(){

  async function askQuestions(){
    const stateLibraries = [
      {name: 'None', value:null},
      {name: 'Redux', value:REDUX },
      {name: 'Redux thunk',value:REDUX_THUNK},
      {name: 'Mobx', value:'mobx'}
    ]

    const storageLibraries = [
      {name: 'None',value:undefined },
      {name:'Local Forage', value:LOCAL_FORAGE},
      {name:'Redux persist',value:'redux-persist'}
    ]
    const devLibraries = [
      {name: 'Enzyme', value:'enzyme',dev:true },
    ]


    const pickedLibraries = []
    const pickedDevLibraries = []
    const stateLib = await inquirer.prompt([{
      type: 'list',
      choices: stateLibraries,
      message: 'Do you want any  library for state management ',
      name:'answer',
      default: false,
    }])
    let storageLib = {
      answer:null,
    }
    if(stateLib.answer === REDUX_THUNK || stateLib.answer === REDUX){
       storageLib = await inquirer.prompt([{
        type: 'list',
        choices: storageLibraries,
        name: 'answer',
        message: 'Do you want any library for storage management',
        default: false,
      }])
    }


    const addLibs = await inquirer.prompt([{
      type: 'checkbox',
      name:'answer',
      choices: devLibraries,
      message: 'Do you want any addition library included',
      default: false,
    }])

      stateLib.answer && pickedLibraries.push(stateLib.answer)

      storageLib.answer && pickedLibraries.push(storageLib.answer)


    pickedDevLibraries.push(...addLibs.answer)
    return {pickedLibraries,
    pickedDevLibraries}
  }

  async function installDeps(packager,{pickedLibraries,
    pickedDevLibraries},name){

    if(!shell.which(packager.name)){
      console.log(`${packager.name} is not installed, please install it!`)
      return
    }



    if(!shell.which('create-react-app')){
      console.log('dont have create-react-app, we need to install it')
      shell.exec(`${packager.name} ${packager.save} create-react-app ${packager.global}`)
    }

    shell.exec(`create-react-app ${name.toLowerCase()}`)

    if(pickedLibraries.length !== 0){
      const depsInString = pickedLibraries.reduce((total,item)=>{return ' '+item},"")
      shell.exec(`${packager.name} ${packager.install} ${depsInString} ${packager.saveToJson} `)
    }
    if(pickedDevLibraries.length !== 0){
      const depsInString = pickedDevLibraries.reduce((total,item)=>{return ' '+item},"")
      shell.exec(`${packager.name} ${packager.install} ${depsInString} ${packager.saveToJson} ${packager.dev}`)
    }
  }


  function createFileNames(pickedLibraries) {
    const isRedux = pickedLibraries.includes(REDUX) || pickedLibraries.includes(REDUX_THUNK)
    const isThunk = pickedLibraries.includes(REDUX_THUNK)
    const hasStorage = pickedLibraries.includes(LOCAL_FORAGE)

    if(!isRedux) return null

    let indexFileName="Redux"
    indexFileName+=isThunk ?"Thunk":""

    let reducersFileName = `reducers${hasStorage?"Storage":""}.js`
    indexFileName+=hasStorage?"Storage":""

    indexFileName+=".js"

    return {
      reducers:reducersFileName,
      index: indexFileName
    }
  }


  async function setInitialFiles({pickedLibraries},name) {
    const fileNames  = createFileNames(pickedLibraries)

    if(!fileNames) return

    const {index,reducers} = fileNames
    const workDir = workingDirectory+"/"+name+"/src/"
    shell.cp(templateIndexPath+index,workDir+"index.js")
    shell.cp(templateReducersPath+reducers,workDir+"reducers.js")
  }


  const packager = {
    name:'npm',
    install: 'install',
    saveToJson : '--save',
    global: '-g',
    dev: '--dev',
  }

  const dependencies = await askQuestions()
  
  const name = await inquirer.prompt([{
    type: 'input',
    message: `What's your project name?`,
    name:'answer',
    default: "helloworld",
  }])

  await installDeps(packager,dependencies,name.answer)

  await setInitialFiles(dependencies,name.answer)
}

exports.init = init;
