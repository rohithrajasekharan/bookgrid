import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import booksReducer from './reducer_books';
import userReducer from './reducer_user';
import { reducer as formReducer } from 'redux-form';
//get all reducers and pass it on to each component when called
const rootReducer = combineReducers({
posts: PostsReducer,
form: formReducer,
books: booksReducer,
user: userReducer,
});

export default rootReducer;
