import { FETCH_LISTINGS, GET_SELECTED_LISTINGS } from '../actions/types';

export default function(state = {
  all: [],
  selected: []
}, action) {
  switch (action.type) {
    case FETCH_LISTINGS:
      return Object.assign({}, state, {
        ...state,
        all: action.payload
      });
    case GET_SELECTED_LISTINGS:
      return Object.assign({}, state, {
        ...state,
        selected: action.payload
      })
    default:
      return state;
  }
}
