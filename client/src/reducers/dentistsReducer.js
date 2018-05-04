import { FETCH_DENTISTS, REQUEST_DENTISTS, UPDATE_FILTERS, GET_ONE_DENTIST } from '../actions/types';

export default function(state = {
  isFetching: false,
  invalid: false,
  dentists: [],
  selectedDentist: {}
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
    case GET_ONE_DENTIST:
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        selectedDentist: action.payload.data
      })
    default:
      return state;
  }
}
