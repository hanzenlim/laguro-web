import { FETCH_REVIEWS, FETCH_ALL_REVIEWS } from '../actions/types';

export default function (state = {
    all: [],
    selected: [],
}, action) {
    switch (action.type) {
    case FETCH_REVIEWS:
        return Object.assign({}, state, {
            ...state,
            selected: action.payload,
        });
    case FETCH_ALL_REVIEWS:
        return Object.assign({}, state, {
            ...state,
            all: action.payload,
        });
    default:
        return state;
    }
}
