import {
    FETCH_PATIENT_PROCEDURE_HISTORY,
    GET_SELECTED_PATIENT_PROCEDURES,
    REQUEST_PATIENT_PROCEDURE_HISTORY,
    UPDATE_PATIENT_PROCEDURES,
} from '../actions/types';

export default function(
    state = {
        isFetching: false,
        all: [],
        selectedProcedures: [],
    },
    action
) {
    switch (action.type) {
        case REQUEST_PATIENT_PROCEDURE_HISTORY:
            return Object.assign({}, state, {
                ...state,
                isFetching: true,
            });
        case GET_SELECTED_PATIENT_PROCEDURES:
            return Object.assign({}, state, {
                ...state,
                isFetching: false,
                selectedProcedures: action.payload,
            });
        case FETCH_PATIENT_PROCEDURE_HISTORY:
            return Object.assign({}, state, {
                ...state,
                isFetching: false,
                all: action.payload,
            });
        case UPDATE_PATIENT_PROCEDURES:
            return Object.assign({}, state, {
                ...state,
                selectedProcedures: action.payload,
            });

        default:
            return state;
    }
}
