import {
    FETCH_PAYMENTS,
} from '../actions/types';

export default function(
    state = {
        isFetching: false,
        invalid: false,
        payments: []
    },
    action
) {
    switch (action.type) {
    case FETCH_PAYMENTS:
        return Object.assign({}, state, {
            ...state,
            isFetching: false,
            payments: action.payload
        });
    default:
        return state;
    }
}
