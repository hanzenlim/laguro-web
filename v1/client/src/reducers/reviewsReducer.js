import { FETCH_REVIEWS, CREATE_REVIEW } from '../actions/types';

export default function(
    state = {
        all: [],
        selected: null,
    },
    action
) {
    switch (action.type) {
        case FETCH_REVIEWS:
            return Object.assign({}, state, {
                ...state,
                all: action.payload,
            });
        case CREATE_REVIEW:
            return Object.assign({}, state, {
                ...state,
                selected: action.payload,
                all: state.all.concat(action.payload),
            });
        default:
            return state;
    }
}
