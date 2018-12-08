//Constants:
const REDUX = 'redux'
const REDUX_THUNK = 'redux-thunk'
const LOCAL_FORAGE = 'localforage'


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

exports.REDUX = REDUX
exports.REDUX_THUNK = REDUX_THUNK
exports.LOCAL_FORAGE = LOCAL_FORAGE
exports.stateLibraries = stateLibraries
exports.storageLibraries = storageLibraries
exports.devLibraries = devLibraries
