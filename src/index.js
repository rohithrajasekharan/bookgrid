import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from './reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';//theme the material ui components
import 'typeface-roboto'
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import AuthCheck from './components/authCheck';
import promise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(

  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <MuiThemeProvider>
  <AuthCheck/>
</MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
) // link app component to html
