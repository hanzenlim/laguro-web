import { FETCH_DENTISTS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_DENTISTS:
      return action.payload;
    default:
      return state;
  }
}
