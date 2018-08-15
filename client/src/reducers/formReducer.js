import { reducer as reduxFormReducer } from 'redux-form';
import { GET_ONE_DENTIST } from '../actions/types';

const formReducer = reduxFormReducer.plugin({
    editDentist: (state, action) => {
        switch (action.type) {
            case GET_ONE_DENTIST:
                if (!action.payload) return state;
                return {
                    ...state,
                    values: {
                        location: action.payload.location,
                        specialty: action.payload.specialty,
                        procedures: action.payload.procedures,
                    },
                };
            default:
                return state;
        }
    },
});

export default formReducer;
