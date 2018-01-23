import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import booksReducer from './reducer_books';
import userReducer from './reducer_user';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
posts: PostsReducer,
form: formReducer,
books: booksReducer,
user: userReducer,
});

export default rootReducer;
