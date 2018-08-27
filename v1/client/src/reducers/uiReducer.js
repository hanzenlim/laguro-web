import { TOGGLE_LOGIN_MODAL } from '../actions/types';

export default function(
    state = {
        isLoginModalVisible: false,
    },
    action
) {
    switch (action.type) {
        case TOGGLE_LOGIN_MODAL:
            return Object.assign({}, state, {
                ...state,
                isLoginModalVisible: !state.isLoginModalVisible,
            });
        default:
            return state;
    }
}
