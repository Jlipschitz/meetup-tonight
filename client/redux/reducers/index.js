import { combineReducers } from 'redux';

// lib
import { routerReducer } from 'react-router-redux';

// app
import user from './user';
import events from './events';
import search from './search';
import hover from './listHover'

export default combineReducers({
  routing: routerReducer,
  user,
  events,
  search,
  hover
});
