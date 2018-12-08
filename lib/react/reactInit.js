const templateIndexPath = __dirname + '/../../templates/react/index/';
const templateReducersPath = __dirname + '/../../templates/react/combineReducers/';
const workingDirectory = process.cwd();
const constants = require('./constants')
const shell = require('shelljs')

function createFileNames(pickedLibraries) {
  const isRedux = pickedLibraries.includes(constants.REDUX) || pickedLibraries.includes(constants.REDUX_THUNK)
  const isThunk = pickedLibraries.includes(constants.REDUX_THUNK)
  const hasStorage = pickedLibraries.includes(constants.LOCAL_FORAGE)

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

exports.setInitialFiles = setInitialFiles
