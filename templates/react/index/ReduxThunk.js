import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import './index.css';
import App from './App/App';
import reducers from './reducers';

// Add thunk and localForage
const createStoreWithMiddleware = applyMiddleware(
  reduxThunk
)(createStore);

const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
