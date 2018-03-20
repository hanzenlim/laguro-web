import { FETCH_DENTISTS, REQUEST_DENTISTS, UPDATE_FILTERS, CREATE_DENTIST } from '../actions/types';

export default function(state = {
  isFetching: false,
  invalid: false,
  dentists: []
}, action) {
  switch (action.type) {
    case UPDATE_FILTERS:
      return Object.assign({}, state, {
        ...state,
        invalid: true
      })
    case FETCH_DENTISTS:
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        dentists: action.payload
      })
    case REQUEST_DENTISTS:
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
        invalid: false
      })
    case CREATE_DENTIST:
      return Object.assign({}, state, {
        ...state,
        dentists: [...state.dentists, action.payload]
      })
    default:
      return state;
  }
}
