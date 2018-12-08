//Constants:
const REDUX = 'redux'
const REACT_REDUX = 'react-redux'
const REDUX_THUNK = 'redux-thunk'
const LOCAL_FORAGE = 'localforage'


const stateLibraries = [
  {name: 'None', value:null},
  {name: 'Redux', value:{
      value:REDUX,
    } },
  {name: 'Redux thunk',value:{
      value:REDUX_THUNK,
    }},
  {name: 'Mobx', value:'mobx'}
]

const additionalLibraries = [
  {name: 'Enzyme', value:{
    value:'enzyme',
      dev:true,
    }},
  {name: 'ESLint', value:{
    value:'eslint',
      dev:true,
    }},
  {name: 'Husky', value:{
    value:'husky',
      dev:true,
    }},
  {name:'Redux persist',value:{
    value:'redux-persist',
      dep:REDUX,
    }},
  {name: 'Redux logger', value:{
    value:'redux-logger',
      dep: REDUX
  }},
  {name: 'Haul', value:{
    value:'haul',
      dev:true,
      init:'haul init'
    }},
  {name: 'React Navigation', value:{
    value:'react-navigation'
  }},
]

exports.REDUX = REDUX
exports.REACT_REDUX = REACT_REDUX
exports.REDUX_THUNK = REDUX_THUNK
exports.LOCAL_FORAGE = LOCAL_FORAGE
exports.stateLibraries = stateLibraries
exports.additionalLibraries = additionalLibraries
