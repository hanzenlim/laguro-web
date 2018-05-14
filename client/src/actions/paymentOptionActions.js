import { SAVE_STRIPE_TOKEN } from './types';
import PaymentOption from '../models/paymentOption';
import history from '../history';

export const addPaymentOption = (userId, paymentToken) => async dispatch => {
    const result = await PaymentOption.create(userId, paymentToken);
    dispatch({
        type: SAVE_STRIPE_TOKEN,
        payload: result,
    });
    history.push('/profile');
};

export const removePaymentOption = (userId, paymentToken) => async dispatch => {
    const result = await PaymentOption.delete(userId, paymentToken);
    dispatch({
        type: SAVE_STRIPE_TOKEN,
        payload: result,
    });
};
