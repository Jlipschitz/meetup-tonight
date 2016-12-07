import * as actionTypes from '../../actionTypes';

const initialState = [];


export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SEARCH_INPUT_CHANGE :
      return action.searchInput

    default:
      return state;
  }
}
