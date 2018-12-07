import { combineReducers } from 'redux';
import { reducer as storageMergeReducer } from 'redux-storage';

const rootReducer = combineReducers({
  // Place your reducers here.
  // e.g.: auth: authReducer,
});

export default storageMergeReducer(rootReducer);
