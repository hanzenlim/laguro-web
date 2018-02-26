import { FETCH_OFFICES } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_OFFICES:
      return action.payload;
    default:
      return state;
  }
}