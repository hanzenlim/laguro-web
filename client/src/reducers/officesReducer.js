import { FETCH_OFFICES, REQUEST_OFFICES, UPDATE_FILTERS } from '../actions/types';

export default function(state = {
  isFetching: false,
  invalid: false,
  offices: []
}, action) {
  switch (action.type) {
    case UPDATE_FILTERS:
      return Object.assign({}, state, {
        ...state,
        invalid: true
      })
    case FETCH_OFFICES:
      return Object.assign({}, state, {
        isFetching: false,
        offices: action.payload
      })
    case REQUEST_OFFICES:
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
        invalid: false
      })
    default:
      return state;
  }
}
