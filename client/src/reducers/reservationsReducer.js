import { GET_SELECTED_RESERVATIONS, FETCH_RESERVATION } from '../actions/types';

export default function(
    state = {
        selected: [],
        all: [],
    },
    action
) {
    switch (action.type) {
        case GET_SELECTED_RESERVATIONS:
            return Object.assign({}, state, {
                ...state,
                all: action.payload,
            });
        case FETCH_RESERVATION:
            return Object.assign({}, state, {
                ...state,
                selected: action.payload,
            });
        default:
            return state;
    }
}
