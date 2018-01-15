import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers'
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Route, BrowserRouter } from 'react-router-dom';
import App from './components/App';
import promise from 'redux-promise';
import booksRead from './components/booksRead';
import PostsNew from './components/posts_new';
import bookDetail from './components/bookDetail';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(

  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <BrowserRouter>
      <div>
<Route path='/' exact component={App}/>
<Route path='/posts' exact component={booksRead}/>
<Route path='/post/new' exact component={PostsNew}/>
<Route path='/posts/:id' component={bookDetail}/>
    </div>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();
