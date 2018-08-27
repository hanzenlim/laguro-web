import cookies from 'browser-cookies';
import User from '../models/user';
import { FETCH_USER } from './types';
import { dispatchChildren } from '../util/dispatchUtil';

export const fetchUser = (...options) => async dispatch => {
    const userId = cookies.get('userId');
    let user;
    if (userId) {
        user = await User.get(userId, ...options);
        dispatch({ type: FETCH_USER, payload: user });
    } else {
        dispatch({ type: FETCH_USER, payload: null });
    }
    if (user) {
        dispatchChildren(user, options, dispatch);
    }
};

export const updateUserProfile = (userId, profile) => async dispatch => {
    const user = await User.updateProfile(userId, profile);
    dispatch({
        type: FETCH_USER,
        payload: user,
    });
};
