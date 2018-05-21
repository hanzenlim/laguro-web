import { TOGGLE_LOGIN_MODAL } from './types';

/* eslint-disable */

export const toggleLoginModal = () => async (dispatch) => {
    dispatch({
        type: TOGGLE_LOGIN_MODAL,
    });
};
