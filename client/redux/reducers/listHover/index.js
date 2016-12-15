import * as actionTypes from '../../actionTypes';

const initialState = [];


export default function hoverReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ACTIVE_MEETUP_HOVER :
      return action.meetup

    default:
      return state;
  }
}
