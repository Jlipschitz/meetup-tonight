import * as actionTypes from '../../actionTypes';


export function editSearchInput(item) {
  return {
    type: actionTypes.SEARCH_INPUT_CHANGE,
    searchInput: item.searchInput
  };
}
