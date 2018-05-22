import { CREATE_APPOINTMENT } from '../actions/types';

export default function(
    state = {
        all: []
    },
    action
) {
    switch (action.type) {
    case CREATE_APPOINTMENT:
        return Object.assign({}, state, {
            ...state,
            isFetching: false,
            all: state.all.concat(action.payload)
        });
    default:
        return state;
    }
}
