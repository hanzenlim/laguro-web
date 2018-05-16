import { GET_SELECTED_RESERVATIONS } from '../actions/types';

export default function(
    state = {
        all: [],
        selected: []
    },
    action
) {
    switch (action.type) {
    case GET_SELECTED_RESERVATIONS:
        return Object.assign({}, state, {
            ...state,
            selected: action.payload
        });
    default:
        return state;
    }
}
