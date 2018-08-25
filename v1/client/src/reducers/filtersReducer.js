import { SET_FILTERS, UPDATE_FILTERS } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case SET_FILTERS:
            return action.payload;
        case UPDATE_FILTERS:
            return Object.assign({}, state, {
                ...state,
                ...action.payload,
            });
        default:
            return state;
    }
}
