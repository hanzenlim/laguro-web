import { SET_FILTERS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case SET_FILTERS:
      return action.payload;
    default:
      return state;
  }
}
