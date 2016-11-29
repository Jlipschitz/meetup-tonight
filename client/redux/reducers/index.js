import { combineReducers } from 'redux';

// lib
import { routerReducer } from 'react-router-redux';

// app
import user from './user';
import events from './events';
import postForm from './postForm';


export default combineReducers({
  routing: routerReducer,
  user,
  events,
  postForm
});
