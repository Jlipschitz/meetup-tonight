import { combineReducers } from 'redux';

// lib
import { routerReducer } from 'react-router-redux';

// app
import user from './user';
import events from './events';
import search from './search';

export default combineReducers({
  routing: routerReducer,
  user,
  events,
  search
});
