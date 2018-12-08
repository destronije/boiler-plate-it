//Constants:
const REDUX = 'redux'
const REACT_REDUX = 'react-redux'
const REDUX_THUNK = 'redux-thunk'
const REDUX_STORAGE = 'redux-storage'
const LOCAL_FORAGE = 'redux-storage-engine-localforage'


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
  {name: 'Enzyme', value:'enzyme'},
]

exports.REDUX = REDUX
exports.REACT_REDUX=REACT_REDUX
exports.REDUX_THUNK = REDUX_THUNK
exports.REDUX_STORAGE = REDUX_STORAGE
exports.LOCAL_FORAGE = LOCAL_FORAGE
exports.stateLibraries = stateLibraries
exports.storageLibraries = storageLibraries
exports.devLibraries = devLibraries
