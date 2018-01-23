import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from './reducers';
import 'typeface-roboto'
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './components/App';
import promise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(

  <Provider store={createStoreWithMiddleware(rootReducer)}>
  <App/>
  </Provider>,
  document.getElementById('root')
)
