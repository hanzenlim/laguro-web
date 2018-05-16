import {
    FETCH_LISTINGS,
    GET_SELECTED_LISTINGS,
    REQUEST_LISTINGS
} from '../actions/types';

export default function(
    state = {
        all: [],
        selected: null,
        isFetching: false
    },
    action
) {
    switch (action.type) {
    case REQUEST_LISTINGS:
        return Object.assign({}, state, {
            ...state,
            isFetching: true
        });
    case FETCH_LISTINGS:
        return Object.assign({}, state, {
            ...state,
            isFetching: false,
            all: action.payload
        });
    case GET_SELECTED_LISTINGS:
        return Object.assign({}, state, {
            ...state,
            isFetching: false,
            selected: action.payload
        });
    default:
        return state;
    }
}
