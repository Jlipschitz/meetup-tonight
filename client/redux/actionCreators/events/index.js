import * as actionTypes from '../../actionTypes';

export function activeMeetupChange(meetup) {
  return {
    type: actionTypes.ACTIVE_MEETUP_HOVER,
    meetup
  };
}

export function editSearchInput(item) {
  return {
    type: actionTypes.SEARCH_INPUT_CHANGE,
    searchInput: item.searchInput
  };
}
