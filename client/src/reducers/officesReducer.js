import { FETCH_OFFICES, FILTER_OFFICES } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_OFFICES:
      return action.payload;
    case FILTER_OFFICES:
      return action.payload;
    default:
      return state;
  }
}
