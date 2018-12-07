import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localforage';

import './index.css';
import App from './App/App';
import reducers from './reducers';

const reducer = storage.reducer(reducers);
// Default value, you can change the name of engine.
const engine = createEngine('app-store');
const localForageMiddleware = storage.createMiddleware(
  engine
);

// Add thunk and localForage
const createStoreWithMiddleware = applyMiddleware(
  reduxThunk,
  localForageMiddleware
)(createStore);

const store = createStoreWithMiddleware(reducer);

// Load state from localForage
storage.createLoader(engine)(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
