import {
    CREATE_APPOINTMENT,
    GET_SELECTED_APPOINTMENTS
} from '../actions/types';

export default function(
    state = {
        all: [],
        selected: {},
        isFetching: false
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
    case GET_SELECTED_APPOINTMENTS:
        return Object.assign({}, state, {
            ...state,
            isFetching: false,
            selected: action.payload
        });
    default:
        return state;
    }
}
