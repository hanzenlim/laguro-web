import cookies from 'browser-cookies';
import User from '../models/user';
import { FETCH_USER } from './types';

export const fetchUser = (...options) => async dispatch => {
    const userId = cookies.get('userId');
    if (userId) {
        const user = await User.getByGoogleId(userId, ...options);
        dispatch({ type: FETCH_USER, payload: user });
    } else {
        dispatch({ type: FETCH_USER, payload: null });
    }
};

export const updateProfileImage = (userId, imageUrl) => async dispatch => {
    const user = await User.updateProfileImage(userId, imageUrl);
    dispatch({
        type: FETCH_USER,
        payload: user
    });
};