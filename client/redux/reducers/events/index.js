import * as actionTypes from '../../actionTypes';

const initialState = [];


export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INITIALIZE_APP :
      return action.posts

    default:
      return state;
  }
}
