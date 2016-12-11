import * as actionTypes from '../../actionTypes';
import request from '../../../utils/request';


export function initializeUserAndEvents({ user, events }) {
  return {
    type: actionTypes.INITIALIZE_APP,
    user,
    events
  };
}

export function initializationRequests() {
  return dispatch =>
    // retrieve app initialization data once root component has mounted
    Promise.all([
      request.get('/auth/session'),
      request.get('/api/events/search')
    ])
    .then(([{ data: user }, { data: events }]) =>
      dispatch(initializeUserAndEvents({
        user: user || null,
        events
      })));
}
